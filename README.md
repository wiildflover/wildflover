<p align="center">
  <img src="public/assets/icons/wildflower_256x256.png" alt="Wildflover Logo" width="128" height="128">
</p>

<h1 align="center">Wildflover</h1>

<p align="center">
  <strong>Modern League of Legends Skin Manager</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-C94B7C?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/Platform-Windows-0078D6?style=flat-square" alt="Platform">
  <img src="https://img.shields.io/badge/Framework-Tauri-FFC131?style=flat-square" alt="Framework">
  <img src="https://img.shields.io/badge/Frontend-React%20+%20TypeScript-61DAFB?style=flat-square" alt="Frontend">
  <img src="https://img.shields.io/badge/Backend-Rust-DEA584?style=flat-square" alt="Backend">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Author-Wildflover-C94B7C?style=flat-square" alt="Author">
</p>

---

## Overview

Wildflover is a modern, feature-rich League of Legends skin management application built with Tauri framework. It provides a seamless experience for managing custom skins, chromas, and mods with an elegant dark-themed interface.

---

## Features

| Feature | Description |
|---------|-------------|
| **Champions Library** | Browse all League of Legends champions with their available skins |
| **Skin Selection** | Select and manage multiple skins with chroma support |
| **Custom Mods** | Import and manage custom .fantome mod files |
| **Marketplace** | Community-driven mod marketplace with upload/download functionality |
| **Discord Integration** | OAuth2 authentication with guild verification |
| **Discord RPC** | Rich Presence showing current activity |
| **Multi-language** | Support for EN, TR, AR, ZH, JA, KO, DE |
| **System Tray** | Minimize to tray with quick access menu |

---

## Screenshots

<details>
<summary><strong>Click to expand screenshots</strong></summary>

### Home Screen
![Home Screen](public/assets/learning/home_preview.png)

### Champions Library
![Champions Library](public/assets/learning/championslibrary_preview.png)

### Skin Selection with Chromas
![Skin Page](public/assets/learning/skinpage_preview.png)
![Chroma Selection](public/assets/learning/chroma_preview.png)

### Selected Skins Panel
![Selected Skins](public/assets/learning/selectedskins_preview.png)

### Marketplace
![Marketplace](public/assets/learning/marketplace_preview.png)
![Marketplace Filters](public/assets/learning/marketplace_filtre_preview.png)

### Custom Mods
![Custom Mods](public/assets/learning/customs_preview.png)

### Download History
![Download History](public/assets/learning/downloadhistory_preview.png)

### Settings
![Settings](public/assets/learning/settings_preview.png)

</details>

---

## Technology Stack

### Frontend
- **React 18** - UI Framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **i18next** - Internationalization
- **CSS3** - Modern styling with animations

### Backend
- **Tauri** - Desktop application framework
- **Rust** - System-level operations
- **reqwest** - HTTP client for API calls
- **tokio** - Async runtime

### External Services
- **Discord OAuth2** - User authentication
- **Discord RPC** - Rich Presence
- **GitHub API** - Marketplace storage
- **Riot CDN** - Champion and skin assets

---

## Project Structure

```
wildflover/
├── src/                          # React Frontend
│   ├── components/               # UI Components
│   │   ├── activation-progress/  # Mod activation UI
│   │   ├── customs/              # Custom mod components
│   │   ├── marketplace/          # Marketplace components
│   │   ├── selected-skins/       # Selection panel
│   │   ├── settings/             # Settings components
│   │   └── skin-selector/        # Skin selection UI
│   ├── config/                   # App configuration
│   ├── i18n/                     # Translations
│   │   └── locales/              # Language files
│   ├── screens/                  # Main screens
│   ├── services/                 # Business logic
│   │   ├── api/                  # Riot API services
│   │   ├── cache/                # LRU Cache
│   │   └── discord/              # Discord services
│   ├── types/                    # TypeScript types
│   └── utils/                    # Utility functions
├── src-tauri/                    # Rust Backend
│   ├── src/                      # Rust source files
│   ├── icons/                    # App icons
│   └── capabilities/             # Tauri permissions
├── public/                       # Static assets
│   └── assets/
│       ├── backgrounds/          # Background images
│       ├── icons/                # App icons
│       └── learning/             # Tutorial images
└── tools/                        # Development tools
    └── promo-generator/          # Promotional assets
```

---

## Installation

### Prerequisites

- **Node.js** >= 18.0.0
- **Rust** >= 1.70.0
- **pnpm** or **npm**

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/wildflover.git
cd wildflover

# Install dependencies
npm install

# Run development server
npm run tauri dev
```

### Production Build

```bash
# Build for production
npm run tauri build
```

---

## Configuration

### Discord OAuth2 Setup

1. Create a Discord Application at [Discord Developer Portal](https://discord.com/developers/applications)
2. Copy your **Client ID** and **Client Secret**
3. Add redirect URIs:
   - `http://localhost:1420` (development)
   - `http://tauri.localhost` (production)
4. Update configuration files:

**Frontend** (`src/services/discord/config.ts`):
```typescript
export const DISCORD_CONFIG = {
  CLIENT_ID: 'YOUR_DISCORD_CLIENT_ID',
  REQUIRED_GUILD_ID: 'YOUR_DISCORD_GUILD_ID', // Optional
  REQUIRED_ROLE_ID: '', // Optional
  // ...
};
```

**Backend** (`src-tauri/src/discord.rs`):
```rust
const DISCORD_CLIENT_ID: &str = "YOUR_DISCORD_CLIENT_ID";
const DISCORD_CLIENT_SECRET: &str = "YOUR_DISCORD_CLIENT_SECRET";
```

### Webhook Configuration (Optional)

For login notifications, update `src-tauri/src/webhook.rs`:
```rust
const LOGIN_WEBHOOK_URL: &str = "YOUR_DISCORD_WEBHOOK_URL";
```

---

## Usage

### Basic Workflow

1. **Login** - Authenticate with Discord
2. **Browse Champions** - Select a champion from the library
3. **Select Skins** - Choose skins and chromas
4. **Activate** - Apply selected skins to the game
5. **Play** - Launch League of Legends

### Custom Mods

1. Navigate to **Customs** tab
2. Click **Import** or drag-drop `.fantome` files
3. Enable desired mods
4. Activate with other skins

### Marketplace

1. Browse community mods
2. Download with one click
3. Like and share favorites
4. Upload your own creations (admin only)

---

## Localization

Supported languages:
- English (en)
- Turkish (tr)
- Arabic (ar)
- Chinese (zh)
- Japanese (ja)
- Korean (ko)
- German (de)

Language files are located in `src/i18n/locales/`

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Security

- Discord Client Secret is stored in compiled Rust binary
- OAuth2 tokens are stored locally with encryption
- No sensitive data is transmitted to third parties
- Guild verification ensures authorized access only

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Tauri](https://tauri.app/) - Desktop framework
- [React](https://react.dev/) - UI library
- [Riot Games](https://www.riotgames.com/) - League of Legends assets

---

## Disclaimer

Wildflover is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc.

---

<p align="center">
  <strong>Wildflover</strong> | Modern Skin Management
</p>

<p align="center">
  Made with ♥ by <a href="https://github.com/wiildflover">Wildflover</a>
</p>


