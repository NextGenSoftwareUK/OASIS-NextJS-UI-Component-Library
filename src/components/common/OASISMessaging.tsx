'use client';
import React, { useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import {
  messagingFromClient, createMessagingView,
  type MessagingController, type MessagingState, type MessagingViewOptions
} from '@oasisomniverse/web4-api/messaging';

/** Structural view of a signed-in `OASISClient` from `@oasisomniverse/web4-api`. */
export interface OASISClientLike {
  http: { baseUrl: string };
  tokenStore: { getToken(): string | null };
  auth?: { getSession?: () => { avatarId?: string } | null | undefined };
}

type Controller = MessagingController & { dispose(): void };

function resolveAvatarId(client?: OASISClientLike | null, avatarId?: string): string | undefined {
  return avatarId || client?.auth?.getSession?.()?.avatarId;
}

/**
 * Creates, starts and disposes an offline-first messaging controller for the signed-in avatar
 * (OASIS SSO / HerzID). Share the result between <OASISMessaging> and <OASISChatWidget>.
 */
export function useOASISMessaging({ client, avatarId }: { client?: OASISClientLike | null; avatarId?: string }): Controller | null {
  const id = resolveAvatarId(client, avatarId);
  const controller = useMemo(() => (client && id ? (messagingFromClient(client, id) as Controller) : null), [client, id]);
  useEffect(() => {
    if (!controller) return undefined;
    void controller.start();
    return () => controller.dispose();
  }, [controller]);
  return controller;
}

const EMPTY_STATE: MessagingState = { connection: 'offline', conversations: [], messages: {}, typing: {}, pendingCount: 0 };

/** Live messaging state (conversations, messages, connection, pending count) for custom UIs. */
export function useOASISMessagingState(controller: MessagingController | null): MessagingState {
  return useSyncExternalStore(
    (cb) => (controller ? controller.subscribe(() => cb()) : () => undefined),
    () => (controller ? controller.getState() : EMPTY_STATE),
    () => EMPTY_STATE
  );
}

export interface OASISMessagingProps extends MessagingViewOptions {
  /** A signed-in OASISClient. Omit when passing a shared `controller`. */
  client?: OASISClientLike | null;
  controller?: MessagingController | null;
  avatarId?: string;
  style?: React.CSSProperties;
}

/** Complete chat: conversations, groups, receipts, typing, offline banner. Saved locally, sent when back online. */
export function OASISMessaging({ client, avatarId, controller: shared, theme = 'oasis', resolveName, initialConversationId, allowNewConversations, placeholder, style }: OASISMessagingProps) {
  const own = useOASISMessaging({ client: shared ? null : client, avatarId });
  const controller = shared || own;
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current || !controller) return undefined;
    const view = createMessagingView(host.current, controller, { theme, resolveName, initialConversationId, allowNewConversations, placeholder });
    return () => view.destroy();
  }, [controller, theme, resolveName, initialConversationId, allowNewConversations, placeholder]);
  return <div ref={host} style={{ height: '100%', minHeight: 360, ...style }} />;
}

export default OASISMessaging;
