const { EmbedBuilder } = require('discord.js');
const { version, description, author } = require('../../package.json');
const { EMOJIS } = require('../../src/constants/botConst');
const { BOT } = require('../../src/configs/metadata');
const appInfo = require('../../src/commands/messageCommands/info/appinfo').default;

// Mock the necessary parts
jest.mock('discord.js', () => {
  const actualDiscord = jest.requireActual('discord.js');
  return {
    ...actualDiscord,
    EmbedBuilder: jest.fn().mockImplementation(() => {
      return {
        setTitle: jest.fn().mockReturnThis(),
        setDescription: jest.fn().mockReturnThis(),
        addFields: jest.fn().mockReturnThis(),
      };
    }),
  };
});

describe('appinfo command', () => {
  let message;

  beforeEach(() => {
    message = {
      channel: {
        send: jest.fn(),
      },
    };
  });

  it('should send an embed with app information', async () => {
    await appInfo.executeMessage(message, []);

    const expectedEmbed = new EmbedBuilder()
      .setTitle('App Information')
      .setDescription(
        `${EMOJIS.apps} App Name: ${BOT.NAME}\nApp Version: ${version}\nApp Description: ${description}\n${EMOJIS.creators} Developer: ${author}\n${EMOJIS.devlopers} Developed by using: ${EMOJIS.ts} & ${EMOJIS.js} with Discord.js v14\n${EMOJIS.sparkles} Features: Supports both ${EMOJIS.message} message and ${EMOJIS.slash} slash commands
      `,
      )
      .addFields(
        {
          name: `${EMOJIS.leaf} Resources`,
          value:
            '[Docs](https://nsgpriyanshu.github.io/nscore/)\n[Community Server](https://discord.gg/4szUHfvZ4g)',
          inline: true,
        },
        {
          name: `${EMOJIS.link} Links`,
          value:
            '[Invite](https://discord.com/oauth2/authorize?client_id=943458326644150323)\n[TOS](https://nsgpriyanshu.github.io/nscore/tos/)\n[Privacy Policy](https://nsgpriyanshu.github.io/nscore/policy/)',
          inline: true,
        },
        {
          name: `${EMOJIS.github} Github`,
          value: `${EMOJIS.vscode} [Source Code](https://github.com/nsgpriyanshu/nscore)\n${EMOJIS.bugs} [Bugs](https://github.com/nsgpriyanshu/nscore/issues)`,
          inline: true,
        },
      );

    expect(message.channel.send).toHaveBeenCalledWith({ embeds: [expectedEmbed] });
  });
});