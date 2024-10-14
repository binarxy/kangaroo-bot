import { 
    CommandInteraction,
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
 } from "discord.js";

export default {
    data : new SlashCommandBuilder()
        .setName('redeem')
        .setDescription('for redeem keys.'),
    async execute(interaction : CommandInteraction) {

        const modal = new ModalBuilder({
            custom_id : `Modal-redeem-#${interaction.user.id}`,
            title : 'Key Redeem'
        })

        const keyInput = new TextInputBuilder({
            label : 'enter key to redeem.',
            custom_id : 'keyInput',
            style : TextInputStyle.Short,
            placeholder : 'XXXXXXXXXXXX',
            min_length : 9,
            max_length : 16,
            required : true
        })

        const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(keyInput)
        modal.addComponents(actionRow)

        await interaction.showModal(modal)

    }
}