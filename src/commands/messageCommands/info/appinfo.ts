import { EmbedBuilder, Message } from 'discord.js'
import { EMOJIS } from '../../../constants/botConst'
import { MessageCommand } from '../../../interfaces/Command'
import { version, description, author } from '../../../../package.json'
import { BOT } from '../../../configs/metadata'

const appInfo: MessageCommand = {
  name: 'appinfo',
  description: 'Displays information about the app.',
  async executeMessage(message: Message, args: string[]) {
    const appEmbed = new EmbedBuilder()
      //.setColor(COLORS.blue)
      .setTitle('App Information')
      .setDescription(
        `${EMOJIS.apps} App Name: ${BOT.NAME}\nApp Version: ${version}\nApp Description: ${description}\n${EMOJIS.creators} Developer: ${author}\n${EMOJIS.devlopers} Developed by using: ${EMOJIS.ts} & ${EMOJIS.js} with Discord.js v14\n${EMOJIS.sparkles} Features: Supports both ${EMOJIS.message} message and ${EMOJIS.slash} slash commands
      `,
      )
      .addFields({
        name: `${EMOJIS.leaf} Resources`,
        value:
          '[Docs](https://nsgpriyanshu.github.io/nscore/)\n[Community Server](https://discord.gg/4szUHfvZ4g)',
        inline: true,
      })
      .addFields({
        name: `${EMOJIS.link} Links`,
        value:
          '[Invite](https://discord.com/oauth2/authorize?client_id=943458326644150323)\n[TOS](https://nsgpriyanshu.github.io/nscore/tos/)\n[Privacy Policy](https://nsgpriyanshu.github.io/nscore/policy/)',
        inline: true,
      })
      .addFields({
        name: `${EMOJIS.github} Github`,
        value: `${EMOJIS.vscode} [Source Code](https://github.com/nsgpriyanshu/nscore)\n${EMOJIS.bugs} [Bugs](https://github.com/nsgpriyanshu/nscore/issues)`,
        inline: true,
      })

    await message.channel.send({ embeds: [appEmbed] })
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default appInfo