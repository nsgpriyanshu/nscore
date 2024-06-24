# Change Log

All notable changes to this project will be documented in this file.

## [Unreleased]

- Initial release of the package

## [1.1.27] - 2024-06-24

### Added

- weather command
- weather command docs

### Changed

- env: added weather api key
- help command: fix the docs links
- the colors of version badge

### Fixed

- Some bugs

## [1.1.26] - 2024-06-23

### Added

- guild member add event
- guild member remove event
- greetify npm package for welcome cards

### Changed

- env: added welcome channel ids

### Fixed

- Some bugs

## [1.1.25] - 2024-06-22

### Added

- news api key
- news command
- docs for news command

### Changed

- help command: Fixed the emoji issue

### Fixed

- Some bugs

## [1.1.24] - 2024-06-20

### Added

- traillingSlash: in doocs/next.config.js
- release script
- mannual trigger option in release.yml

### Changed

- release.yml
- release.config.js
- updated the full workflow folder

### Fixed

- Some bugs

## [1.1.23] - 2024-06-19

### Added

- Badges in README.md

### Changed

- error.ts: Added enhanced version
- appinfo (message and slash): Added and fixed the links
- dependabot.yml

### Fixed

- Some bugs

## [1.1.22] - 2024-06-18

### Added

- boostinfo and inviteinfo commands
- docs: documentation about boostinfo and inviteinfo commands

### Changed

- app_bug_report, bug_report, command-request, docs_bug_report, feature_request: Added labels
- fixed labels in workflows
- dependabot.yml

### Fixed

- Some bugs

## [1.1.21] - 2024-06-17

### Added

- SECURITY.md
- release.yml
- release.config.js
- docs: Added links and fix some errors

### Changed

- ISSUE_TEMPLATE for github
- PULL_REQUEST_TEMPLATE for github
- docs-deployment.yml
- Updated the link of the repo
- theme.config.tsx

### Fixed

- Some bugs

## [1.1.20] - 2024-06-16

### Added

- removed developer folders from docs and shifted to a seperate repo
- commitlintrc for commint messgaes
- ISSUE_TEMPLATE for github
- PULL_REQUEST_TEMPLATE for github
- workflows for github
- CODEOWNERS for github

### Changed

- none

### Fixed

- Some bugs

## [1.1.19] - 2024-06-14

### Added

- ai commands
- removed some packages

### Changed

- none

### Fixed

- Some bugs

## [1.1.18] - 2024-06-12

### Added

- prodia api key

### Changed

- all the codes inside docs folder

### Fixed

- Some bugs

## [1.1.17] - 2024-06-11

### Added

- none

### Changed

- developers/

### Fixed

- Some bugs

## [1.1.16] - 2024-06-10

### Added

- none

### Changed

- developers/

### Fixed

- Some bugs

## [1.1.15] - 2024-06-09

### Added

- none

### Changed

- developers/

### Fixed

- Some bugs

## [1.1.14] - 2024-06-08

### Added

- developers/

### Changed

- none

### Fixed

- Some bugs

## [1.1.13] - 2024-06-07

### Added

- developers/

### Changed

- docs/index
- docs/commands/

### Fixed

- Some bugs

## [1.1.12] - 2024-06-06

### Added

- code of conduct
- contributing md
- Callouts

### Changed

- docs/README.md
- docs/index
- docs/commands/

### Fixed

- Some bugs

## [1.1.11] - 2024-06-05

### Added

- public folder inside docs dir
- added favicon.ico

### Changed

- docs/README.md
- pages dir structure

### Fixed

- Some bugs

## [1.1.10] - 2024-06-04

### Added

- initialised docs by nextra

### Changed

- docs/README.md

### Fixed

- Some bugs

## [1.1.9] - 2024-06-03

### Added

- createchannel and deletechannel command
- devhelp command

### Changed

- servericon command

### Fixed

- Some bugs

## [1.1.8] - 2024-06-02

### Added

- moderation commands in help
- addrole command
- removerole command
- createrole command
- updateemoji command
- deleteemoji command

### Changed

- servericon command

### Fixed

- Some bugs

## [1.1.7] - 2024-06-01

### Added

- announce command
- servericon command
- usericon command

### Changed

- None

### Fixed

- Some bugs

## [1.1.6] - 2024-05-31

### Added

- None

### Changed

- help command
- serverlog command

### Fixed

- Some bugs

## [1.1.5] - 2024-05-30

### Added

- brand logo
- reomove dev command
- serverlog command
- help command

### Changed

- env and config file
- guild create and delete events
- README.md

### Fixed

- Some bugs

## [1.1.4] - 2024-05-29

### Added

- README.md
- Icon
- guild create and delete events

### Changed

- env and config file

### Fixed

- Some bugs

## [1.1.3] - 2024-05-28

### Added

- some emojis

### Changed

- slash commands
- interaction create file
- message create file
- index
- commands interface
- extended client

### Fixed

- Some bugs

## [1.1.2] - 2024-05-27

### Added

- some logging emojis
- emojis and some parameters

### Changed

- all info commands

### Fixed

- Some minor bugs

## [1.1.1] - 2024-05-26

### Added

- appinfo command
- channelinfo command
- info command
- roleinfo command

### Changed

- Removed unwanted comments
- deleted jest tests

### Fixed

- Some minor bugs

## [1.1.0] - 2024-05-25

### Added

- Rewrote the entire bot in TypeScript.
- Integrated Jest for testing.
- Included declaration and mapping files for improved debugging and maintenance.
- Adopted GitHub for version control.
- Implemented Prettier for code formatting.
- Introduced a utilities system for better authority and isolated functions.

### Changed

- Updated file naming convention from uppercase to lowercase.
- Migrated the main programming language from JavaScript to TypeScript.
- Converted bot-related data into constants and moved necessary environmental variables to config, now importing via config.

### Fixed

- Resolved all bugs that occurred after the first preview version.
- Simplified code structure from the previous preview version to a more streamlined version.
- Fixed issues related to path configurations.
