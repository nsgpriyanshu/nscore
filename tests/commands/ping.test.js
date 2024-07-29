const { Client, GatewayIntentBits } = require('discord.js');
const ping = require('../../src/commands/messageCommands/general/ping').default; // Ensure you are importing the default export

jest.mock('discord.js', () => {
  const actualDiscord = jest.requireActual('discord.js');
  return {
    ...actualDiscord,
    Client: jest.fn().mockImplementation(() => {
      return {
        user: { username: 'TestBot' },
        on: jest.fn(),
        once: jest.fn(),
        login: jest.fn(),
      };
    }),
    Message: jest.fn().mockImplementation(() => {
      return {
        channel: {
          send: jest.fn(),
        },
      };
    }),
    GatewayIntentBits: {
      Guilds: 1,
      GuildMessages: 1 << 9,
      MessageContent: 1 << 15,
    },
  };
});

describe('ping command', () => {
  let client;
  let message;

  beforeEach(() => {
    client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    message = new (require('discord.js').Message)();
  });

  it('should reply with Ping!', async () => {
    await ping.executeMessage(message);
    expect(message.channel.send).toHaveBeenCalledWith({
      embeds: [
        expect.any(Object), // Match any object here
      ],
    });
  });
});





