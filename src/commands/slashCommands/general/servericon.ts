import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { SlashCommand } from '../../../interfaces/Command'

const serverIcon: SlashCommand = {
  name: 'servericon',
  description: 'Displays the icon and banner of the server.',

  data: new SlashCommandBuilder()
    .setName('servericon')
    .setDescription('Displays the icon and banner of the server.'),

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const guild = interaction.guild

    if (!guild) {
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Oops!')
        .setDescription(`${EMOJIS.failed} This command can only be used in a server.`)
        .setTimestamp()

      await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
      return
    }

    const iconURL = guild.iconURL({ size: 1024 }) ?? 'Not available'
    const bannerURL = guild.bannerURL({ size: 1024 })

    const serverIconEmbed = new EmbedBuilder()
      .setTitle(`${EMOJIS.seo} ${guild.name}'s Icon & Banner`)
      .setTimestamp()

    if (iconURL && iconURL !== 'Not available') {
      serverIconEmbed
        .setImage(iconURL)
        .addFields({ name: 'Icon', value: `[View](${iconURL})`, inline: true })
    }

    if (bannerURL) {
      serverIconEmbed.addFields({
        name: 'Banner',
        value: `[View](${bannerURL})`,
        inline: true,
      })
    }

    if (!iconURL && !bannerURL) {
      serverIconEmbed.setDescription(
        `${EMOJIS.failed} This server does not have an icon or banner.`,
      )
    }

    await interaction.reply({ embeds: [serverIconEmbed] })
  },

  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default serverIcon
