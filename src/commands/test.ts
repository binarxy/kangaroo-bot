import { CommandInteraction , SlashCommandBuilder } from "discord.js";

export default {
    data : new SlashCommandBuilder()
        .setName('test')
        .setDescription('reply with message.'),
    async execute(interaction : CommandInteraction) {
        await interaction.reply('testing message.')
    }
}

