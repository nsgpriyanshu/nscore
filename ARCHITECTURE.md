# nsCore Architecture

## Overview

nsCore is a TypeScript Discord.js application with two command surfaces: message
commands and slash commands. The runtime entry point is `src/index.ts`, which
creates the Discord client, loads commands, registers event handlers, and
attaches process-level error reporting.

The docs app in `docs/` is intentionally separate from the bot runtime. Root
scripts, tests, and build output apply to the bot package unless a command uses
the `docs/` package directly.

## Runtime Flow

1. `src/index.ts` creates an `ExtendedClient` with the required gateway intents.
2. `src/handlers/commandHandler.ts` recursively discovers command modules under
   `src/commands/slashCommands` and `src/commands/messageCommands`.
3. `src/events/eventIndex.ts` registers Discord event listeners.
4. `src/events/client/interactionCreate.ts` validates slash command permissions,
   developer-only access, and bot permissions before execution.
5. `src/events/client/messageCreate.ts` parses the configured prefix, resolves
   the message command, validates access, then executes it.
6. `src/handlers/errorHandler.ts` reports unhandled runtime failures to the
   configured Discord channel when one is available.

## Source Layout

- `src/commands/` contains user-facing command modules grouped by command style
  and feature category.
- `src/configs/` reads environment-backed runtime configuration and static bot
  metadata.
- `src/constants/` stores shared embed colors, emoji identifiers, and asset URLs.
- `src/events/` contains event registration and event-specific handlers.
- `src/handlers/` contains app-level orchestration such as command loading and
  process error handling.
- `src/interfaces/` defines the typed command and client contracts.
- `src/services/` contains reusable API and embed-building logic shared by slash
  and message commands.
- `src/utils/` contains infrastructure helpers such as logging, slash command
  deployment, and command discovery.
- `tests/` contains Vitest coverage for command discovery, command metadata, and
  shared services.

## Command Contract

Slash commands must export a `SlashCommand` with:

- `name`
- `description`
- `data` from `SlashCommandBuilder`
- `executeSlash(interaction, client)`

Message commands must export a `MessageCommand` with:

- `name`
- optional `aliases` for message-command shortforms
- `description`
- `executeMessage(message, args, client)`

Both command styles may define `userPermissions`, `botPermissions`, and
`devOnly`. Runtime permission checks live in the event handlers, so commands can
focus on their feature behavior.

Message command aliases are registered by `src/handlers/commandHandler.ts`.
Aliases are resolved to the same command object as the canonical command name,
so permissions, developer-only checks, logging, and execution behavior stay
consistent. Aliases must be lowercase and unique across all message commands.

## Shared Services

Shared command behavior belongs in `src/services/`. This keeps message and slash
commands consistent and avoids duplicating API formatting logic. Current shared
services include:

- `newsService.ts` for News API fetching and embed description formatting.
- `weatherService.ts` for OpenWeather fetching, unit conversion, weather assets,
  and weather embed/button builders.

## Deployment

`src/utils/deployCommands.ts` loads all slash commands recursively and deploys
their `data.toJSON()` payloads with Discord REST. Dev-only commands are still
deployed, but runtime access remains gated by `devOnly` checks.

Required environment values include:

- `AUTH_TOKEN`
- `CLIENT_ID`
- `SERVER_ID`
- `DEVELOPER_IDS`
- `ERROR_CHANNEL_ID`
- `NEWS_API`
- `WEATHER_API`

## Testing And Quality

The root package uses Vitest, TypeScript, ESLint, and Prettier.

Recommended production check:

```sh
npm run build
npm run lint
npm run test
```

The test runner uses `--pool=threads` because process forking is restricted in
some Windows and sandboxed environments.

## Design And Style

Discord responses should use the shared `COLORS` and `EMOJIS` constants for
visual consistency. User-facing error responses should be short, actionable, and
sent through embeds when the command already uses embeds.

For new features:

- Prefer one shared service for behavior used by both slash and message commands.
- Keep command modules thin: parse inputs, call services, reply.
- Add tests for shared logic and command metadata.
- Avoid live network calls in tests; mock or test formatting logic directly.
