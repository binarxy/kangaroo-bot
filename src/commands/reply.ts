import { 
    CommandInteraction ,
    SlashCommandBuilder,

 } from "discord.js";


export default {
    data : new SlashCommandBuilder()
        .setName('reply-msg')
        .setDescription('reply your message.'),
    
    async execute(interaction : CommandInteraction) {
        await interaction.reply('Reply.. hello!')
    }
}