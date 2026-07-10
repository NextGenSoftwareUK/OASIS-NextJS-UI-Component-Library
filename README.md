# @oasisomniverse/nextjs — OASIS Next.js UI Component Library

The Next.js UI component library for the [OASIS Platform](https://oasisomniverse.one). 126 components covering avatar SSO, karma, NFTs, quests, map, seeds, messaging, OApps, providers and more — built for Next.js App Router and Pages Router, with full SSR/SSG support.

[![npm](https://img.shields.io/npm/v/@oasisomniverse/nextjs)](https://www.npmjs.com/package/@oasisomniverse/nextjs)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://oportal.oasisomniverse.one)

## Install

```bash
npm install @oasisomniverse/nextjs
```

## Basic Usage

Components are client components and must be used with `'use client'` in App Router:

```tsx
'use client';

import { Login, AvatarConnect, KarmaToast } from '@oasisomniverse/nextjs';

const config = { apiUrl: 'https://api.web4.oasisomniverse.one' };

export default function Page() {
  return (
    <>
      <AvatarConnect config={config} onLogin={(s) => console.log(s)} />
      <Login config={config} onSuccess={(s) => console.log(s)} />
      <KarmaToast message="Quest completed" amount={150} />
    </>
  );
}
```

For Pages Router, import directly without `'use client'`.

All components accept a `config` prop `{ apiUrl: string }`. Omit it to use the default API endpoint.

---

## Component Reference

### Auth & Identity

#### `<Login>`

Avatar login popup/form.

```tsx
<Login
  config={config}
  onSuccess={(session) => console.log(session)}
  onClose={() => {}}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `config` | `{ apiUrl: string }` | default endpoint | OASIS API configuration |
| `onSuccess` | `(session) => void` | — | Called with session object on successful login |
| `onClose` | `() => void` | — | Called when the popup is dismissed |

---

#### `<Signup>`

New avatar registration form.

```tsx
<Signup config={config} onSuccess={(data) => console.log(data)} onClose={() => {}} />
```

| Prop | Type | Description |
|---|---|---|
| `onSuccess` | `(data) => void` | Called with new avatar data on registration |
| `onClose` | `() => void` | Called when dismissed |

---

#### `<AvatarConnect>`

Login/logout toggle chip — manages session state automatically.

```tsx
<AvatarConnect
  config={config}
  sessionKey="oasis_session"
  onLogin={(session) => console.log(session)}
  onLogout={() => {}}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `config` | `{ apiUrl: string }` | default endpoint | OASIS API configuration |
| `sessionKey` | `string` | `'oasis_session'` | sessionStorage key for login state persistence |
| `onLogin` | `(session) => void` | — | Called with session object after login |
| `onLogout` | `() => void` | — | Called after logout |

---

#### `<ForgotPassword>`

```tsx
<ForgotPassword config={config} onClose={() => {}} />
```

---

#### `<ResetPassword>`

Password reset form — use with the token from the reset email link.

```tsx
<ResetPassword config={config} token={tokenFromSearchParams} onSuccess={() => {}} />
```

| Prop | Type | Description |
|---|---|---|
| `token` | `string` | **Required.** Reset token from the email link |

---

#### `<VerifyEmail>`

```tsx
<VerifyEmail config={config} token={tokenFromSearchParams} onSuccess={() => {}} />
```

---

#### `<SearchAvatars>`

```tsx
<SearchAvatars config={config} onSelect={(avatar) => console.log(avatar)} />
```

| Prop | Type | Description |
|---|---|---|
| `onSelect` | `(avatar) => void` | Called when the user picks an avatar |

---

#### `<SendInvite>` / `<AcceptInvite>`

```tsx
<SendInvite config={config} onSuccess={() => {}} />
<AcceptInvite config={config} inviteCode={code} onSuccess={() => {}} />
```

---

### Avatar

#### `<AvatarProfile>`

```tsx
<AvatarProfile config={config} avatarId="abc123" onClose={() => {}} />
```

| Prop | Type | Description |
|---|---|---|
| `avatarId` | `string` | Avatar to display — defaults to logged-in user |

---

#### `<ViewAvatar>`

```tsx
<ViewAvatar config={config} avatarId="abc123" />
```

---

#### `<EditAvatar>`

```tsx
<EditAvatar config={config} onSuccess={() => {}} onClose={() => {}} />
```

---

#### `<ViewAvatarKarma>`

```tsx
<ViewAvatarKarma config={config} avatarId="abc123" />
```

---

### Karma

#### `<KarmaToast>`

Floating karma notification.

```tsx
<KarmaToast message="Quest completed" amount={150} />
```

| Prop | Type | Description |
|---|---|---|
| `message` | `string` | Reason text shown below the karma amount |
| `amount` | `number` | Karma delta — positive shown in cyan, negative in red |

---

#### `<KarmaPanel>`

```tsx
<KarmaPanel config={config} onClose={() => {}} />
```

---

### Map

```tsx
<Map config={config} onClose={() => {}} />
```

---

### NFT

```tsx
<NFT config={config} nftId="nft-001" onClose={() => {}} />
<PurchaseNFT config={config} nftId="nft-001" onSuccess={() => {}} onClose={() => {}} />
```

---

### OApp

```tsx
<CreateOApp config={config} onSuccess={(oapp) => console.log(oapp)} onClose={() => {}} />
<LaunchOApp config={config} oappId="my-oapp" onClose={() => {}} />
```

---

### Seeds

```tsx
<Seeds config={config} onClose={() => {}} />
<PayWithSeeds config={config} amount={50} recipientId="abc123" onSuccess={() => {}} onClose={() => {}} />
```

---

### Common UI

#### `<OasisModal>`

```tsx
<OasisModal title="My Modal" accentColor="#00c8ff" onClose={() => {}}>
  <p>Modal content goes here.</p>
</OasisModal>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `''` | Modal header title |
| `accentColor` | `string` | `'#00c8ff'` | Header accent colour |
| `onClose` | `() => void` | — | Called when dismissed |
| `children` | `ReactNode` | — | Modal body content |

---

#### `<NavBar>`

```tsx
<NavBar config={config} links={[{ label: 'Map', href: '/map' }]} />
```

---

#### `<Settings>` / `<Wallet>` / `<StarField>` / `<ComingSoon>`

```tsx
<Settings config={config} onClose={() => {}} />
<Wallet config={config} onClose={() => {}} />
<StarField />
<ComingSoon label="Quests" />
```

---

## Font Setup

Add the Dark Space design system fonts in your `layout.tsx`:

```tsx
import { Orbitron, Rajdhani } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-rajdhani' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## Full Component List

| Group | Components |
|---|---|
| **Auth & Identity** | AcceptInvite, AvatarConnect, ForgotPassword, Login, ResetPassword, SearchAvatar, SearchAvatars, SendInvite, Signup, VerifyEmail |
| **Avatar** | AvatarProfile, AvatarWallet, EditAvatar, SearchProfiles, ViewAchievements, ViewAvatar, ViewAvatarKarma, ViewLeagues, ViewOrganizations, ViewTournaments |
| **Data Screen** | ActivityPub, AddData, EOSIO, Ethereum, Holochain, IPFS, LoadData, ManageData, MongoDB, Neo4j, OffChainManagement, SearchData, Solana, Solid, SQLite, ThreeFold |
| **Eggs** | Eggs, ManageEggs, SearchEggs, ViewEggs |
| **Game** | Game |
| **Karma** | KarmaPanel, KarmaToast, SearchKarma, ViewKarma, VoteKarma |
| **Map** | Add2DObjectToMap, Add3DObjectToMap, AddQuestToMap, DownloadMap, ManageMap, Map, PlotRouteOnMap, SearchMap, ViewGlobal3DMap, ViewHalonsOnMap, ViewOAppOnMap, ViewQuestOnMap |
| **Messages** | MenuMessage, Message, MessageContacts, Messaging |
| **Mission** | ManageMission, Mission, SearchMission, ViewMission |
| **NFT** | ContactPopupNFT, ManageNFT, NFT, PurchaseNFT, PurchaseVirtualLandNFT, SearchNFT, ViewNFT |
| **OApp** | CreateOApp, DeployOApp, DownloadOApp, EditOApp, InstallOApp, LaunchOApp, ManageOApp, OApp, SearchOApp |
| **Providers** | CompareProviderSpeeds, CrossChainManagement, ManageAutoFailover, ManageAutoReplication, ManageLoadBalancing, ManageProviders, ProviderDropdown, Providers, SearchProviders, SeedsProvider, ViewProviderStats, ViewProviders |
| **Quest** | ManageQuest, Quest, SearchQuest, ViewQuest |
| **Seeds** | DonateSeeds, ManageSeeds, PayWithSeeds, RewardSeeds, SearchSeeds, Seeds, ViewSeeds |
| **Common UI** | ComingSoon, Confirmation, Contact, HyperDrive, NavBar, ONET, ONODE, OasisModal, Settings, SideNav, StarField, Wallet |

---

## Dark Space Design System

The OASIS component library ships with the **Dark Space** design system:

- **Background**: near-black (`#0a0d14`) with subtle nebula gradients
- **Primary accent**: electric cyan (`#00c8ff`)
- **Typography**: [Orbitron](https://fonts.google.com/specimen/Orbitron) for headings, [Rajdhani](https://fonts.google.com/specimen/Rajdhani) for body text
- **Text**: always bright (`#e0f0ff` / `#fff`) — never dim or faded
- **Borders**: translucent cyan (`rgba(0,200,255,0.2)`)
- **Cards**: glassy dark panels with `backdrop-filter: blur`

Override CSS custom properties to theme components for your own OAPP:

```css
:root {
  --oasis-bg: #0a0d14;
  --oasis-accent: #00c8ff;
  --oasis-text: #e0f0ff;
  --oasis-border: rgba(0, 200, 255, 0.2);
}
```

---

## Live Demo

See the full component matrix at **[oportal.oasisomniverse.one](https://oportal.oasisomniverse.one)**.

## Links

- [GitHub](https://github.com/NextGenSoftwareUK/OASIS-NextJS-UI-Component-Library)
- [npm](https://www.npmjs.com/package/@oasisomniverse/nextjs)
- [OASIS API Docs](https://oasis-web4.gitbook.io/oasis-web4-docs/)
- [Developer Portal](https://oportal.oasisomniverse.one)
- [OASIS Platform](https://oasisomniverse.one)
