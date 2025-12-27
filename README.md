<div align="center">

# nsCore

<img src="docs/public/logo.png" alt="nsCore" width="56" height="56"/>

A modern, scalable Discord app core built for **Creator’s World** —
designed to be forked, extended, and shipped.

![Version](https://img.shields.io/github/package-json/v/nsgpriyanshu/nscore?color=ff3b30)
[![Discord](https://img.shields.io/discord/855781247480496130.svg?color=5865F2\&logo=discord\&logoColor=white)](https://discord.gg/7SAcEv7MDd)
[![GitHub contributors](https://img.shields.io/github/contributors/nsgpriyanshu/nscore.svg?color=crimson)](https://github.com/nsgpriyanshu/nscore/graphs/contributors)
![Last Commit](https://img.shields.io/github/last-commit/nsgpriyanshu/nscore.svg)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/nsgpriyanshu/nscore)
[![CodeQL](https://github.com/nsgpriyanshu/nscore/actions/workflows/codeql.yml/badge.svg)](https://github.com/nsgpriyanshu/nscore/actions/workflows/codeql.yml)

</div>

---

## About

**nsCore** is the official Discord app core of **Creator’s World**.
It serves as a **production-ready base architecture** for building modern Discord bots using TypeScript and Discord.js.

This repository is open-source and intended for developers who want a **clean, structured, and extensible** Discord bot foundation.

---

## Invite

> [!NOTE]
> nsCore itself is private and not available for public invitation.
>
> If you want to experience nsCore in action, try **Power Op** —
> a public Discord app built on top of nsCore with the same core architecture.
>
> **[Invite Power Op](https://discord.com/oauth2/authorize?client_id=943458326644150323)**

---

## Features

* Message commands **and** slash commands
* Strongly-typed command & event architecture
* Centralized command, event, and error handlers
* Built-in permission & developer-only command support
* Scalable folder structure for large bots
* Production-ready logging & error reporting
* Jest testing support

---

## Using nsCore (Developers)

### 1. Clone the repository

```sh
git clone https://github.com/nsgpriyanshu/nscore.git
cd nscore
```

### 2. Configure environment variables

Create a `.env` file:

```env
AUTH_TOKEN=YOUR_DISCORD_BOT_TOKEN
CLIENT_ID=YOUR_DISCORD_CLIENT_ID
DEVELOPER_IDS=YOUR_DISCORD_USER_ID
SERVER_ID=YOUR_DEV_SERVER_ID
ERROR_CHANNEL_ID=YOUR_ERROR_CHANNEL_ID
```

### 3. Install dependencies

```sh
npm install
```

### 4. Start the bot

```sh
npm run start
```

### 5. Deploy slash commands

```sh
npm run deploy
```

---

## Documentation

* **nsCore Docs (Developer Guide)**
  [Docs for Developers](https://nsdocs.vercel.app/docs/nscore)

* **User-facing Docs**
  [Docs for End Users](https://nscore.vercel.app)

---

## Tech Stack

* **TypeScript** — strict typing, safer refactors
* **Discord.js** — powerful Discord API wrapper
* **Node.js** — fast and scalable runtime
* **Jest** — testing support
* **Custom utilities** — logging, constants, helpers

---

## References

* [Discord.js Guide](https://discordjs.guide)
* [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

## Support

Need help or want to discuss architecture?

Join the **Creator’s World** Discord server:
[Join Now](https://discord.gg/vRXgWaar2G)

---

## Author

[![nsgpriyanshu](https://img.shields.io/badge/Developer-nsgpriyanshu-author.svg?color=f10a0a)](https://nsgpriyanshu.github.io)

