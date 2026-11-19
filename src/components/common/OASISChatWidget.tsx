'use client';
import React, { useState } from 'react';
import type { MessagingViewOptions } from '@oasisomniverse/web4-api/messaging';
import { OASISMessaging, useOASISMessaging, useOASISMessagingState, type OASISClientLike } from './OASISMessaging';

export interface OASISChatWidgetProps extends Pick<MessagingViewOptions, 'theme' | 'resolveName'> {
  client?: OASISClientLike | null;
  avatarId?: string;
  position?: 'bottom-right' | 'bottom-left';
  defaultOpen?: boolean;
  style?: React.CSSProperties;
}

/** Floating chat button with an unread badge that opens <OASISMessaging>. */
export function OASISChatWidget({ client, avatarId, position = 'bottom-right', defaultOpen = false, theme = 'oasis', resolveName, style }: OASISChatWidgetProps) {
  const [open, setOpen] = useState(defaultOpen);
  const controller = useOASISMessaging({ client, avatarId });
  const unread = useOASISMessagingState(controller).conversations.reduce((n, c) => n + c.unreadCount, 0);
  if (!controller) return null;
  const side = position === 'bottom-left' ? { left: 16 } : { right: 16 };
  return (
    <div style={{ position: 'fixed', bottom: 16, zIndex: 1000, ...side, ...style }}>
      {open && (
        <div style={{ width: 'min(380px, calc(100vw - 32px))', height: 'min(520px, 70vh)', marginBottom: 8 }}>
          <OASISMessaging controller={controller} theme={theme} resolveName={resolveName} />
        </div>
      )}
      <button
        type="button"
        aria-label={open ? 'Close chat' : `Open chat${unread ? `, ${unread} unread` : ''}`}
        onClick={() => setOpen((o) => !o)}
        style={{ width: 52, height: 52, borderRadius: 26, border: 0, background: '#00c8ff', color: '#04121f', fontSize: 22, cursor: 'pointer', position: 'relative' }}
      >
        💬
        {unread > 0 && !open && (
          <span style={{ position: 'absolute', top: -4, right: -4, background: '#ff4d6d', color: '#fff', borderRadius: 10, fontSize: 12, padding: '0 6px' }}>{unread}</span>
        )}
      </button>
    </div>
  );
}

export default OASISChatWidget;
