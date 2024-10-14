import { 
    CommandInteraction,
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    
} from "discord.js";

export default {
    data : new SlashCommandBuilder()
        .setName("hello")
        .setDescription('reply with your input name.!'),

    async execute(interaction : CommandInteraction){

        const modal = new ModalBuilder({
            custom_id : `Modal-username-#${interaction.user.id}`,
            title : 'Name Modal',
        })

        const userNameInput = new TextInputBuilder({
            custom_id : 'userNameInput',
            label : "What's your name?",
            style : TextInputStyle.Short,
            placeholder : 'Example : JoheDoe'
        })

        const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(userNameInput)
        modal.addComponents(firstActionRow)

        await interaction.showModal(modal)
        
        // const filter =  (interaction : ModalSubmitInteraction) => interaction.customId === `Model-#${interaction.user.id}`

        // interaction
        //     .awaitModalSubmit({ filter, time : 30_000})
        //     .then((modalInteraction)=>{
        //         console.log(modalInteraction);
        //         modalInteraction.reply('testing')
        //     })

    }
}