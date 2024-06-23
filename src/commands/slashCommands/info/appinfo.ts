import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { EMOJIS } from '../../../constants/botConst'
import { SlashCommand } from '../../../interfaces/Command'
import { version, description, author } from '../../../../package.json'
import { BOT } from '../../../configs/metadata'

const appInfo: SlashCommand = {
  name: 'appinfo',
  description: 'Displays information about the app.',
  data: new SlashCommandBuilder()
    .setName('appinfo')
    .setDescription('Displays information about the app.'),
  async executeSlash(interaction: ChatInputCommandInteraction) {
    const appEmbed = new EmbedBuilder()
      //.setColor(COLORS.blue)
      .setTitle('App Information')
      .setDescription(
        `${EMOJIS.apps} App Name: \`${BOT.NAME}\`\nApp Version: \`${version}\`\nApp Description: \`${description}\`\n${EMOJIS.creators} Developer: \`${author}\`\n${EMOJIS.devlopers} Developed by using: ${EMOJIS.ts} & ${EMOJIS.js} with Discord.js v14\n${EMOJIS.sparkles} Features: Supports both ${EMOJIS.message} message and ${EMOJIS.slash} slash commands`,
      )
      .addFields({
        name: `${EMOJIS.leaf} Resources`,
        value:
          '[Docs](https://github.com/nsgpriyanshu/nscore/docs)\n[Community Server](https://discord.gg/VUMVuArkst)',
        inline: true,
      })
      .addFields({
        name: `${EMOJIS.link} Links`,
        value:
          '[Invite](https://discord.com/oauth2/authorize?client_id=943458326644150323)\n[TOS](https://nsgpriyanshu.github.io/nscore/docs/tos)\n[Privacy Policy](https://nsgpriyanshu.github.io/nscore/docs/policy)',
        inline: true,
      })
      .addFields({
        name: `${EMOJIS.github} Github`,
        value: `${EMOJIS.vscode} [Source Code](https://github.com/nsgpriyanshu/nscore)\n${EMOJIS.bugs} [Bugs](https://github.com/nsgpriyanshu/nscore/issues)`,
        inline: true,
      })

    await interaction.reply({ embeds: [appEmbed] })
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default appInfo
