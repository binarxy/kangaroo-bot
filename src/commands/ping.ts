import { CommandInteraction , SlashCommandBuilder } from "discord.js";

import { client } from '../index'

export default {
    data : new SlashCommandBuilder()
        .setName('ping')
        .setDescription('testing ping command.'),
    async execute(interaction : CommandInteraction,) {
        await interaction.reply({ content : `!${client.ws.ping}ms`})
    }
}