import { 
    CommandInteraction,
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ComponentType
 } from "discord.js";

 export default {
    data : new SlashCommandBuilder()
        .setName('choose')
        .setDescription('reply with choice, and choose yes or no.'),
    async execute(interaction : CommandInteraction) {
        
        const firstButton = new ButtonBuilder()
            .setLabel('Yes')
            .setStyle(ButtonStyle.Success)
            .setCustomId('answer-yes')

        const secondButton = new ButtonBuilder()
            .setLabel('No')
            .setStyle(ButtonStyle.Danger)
            .setCustomId('answer-no')
    
        const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(firstButton,secondButton)

        const reply = await interaction.reply({ content : 'choose this choice dude.', components : [buttonRow] })

        const collection = await reply.createMessageComponentCollector({
            componentType : ComponentType.Button,
            filter : (i) => i.user.id === interaction.user.id,
            time : 15_000
        })

        collection.on('collect',async (interaction)=>{
            if(interaction.customId === 'answer-yes'){
                firstButton.setDisabled(true) 
                secondButton.setDisabled(true) 
                
                reply.edit({
                    content : "you cant's choose again.!",
                    components : [buttonRow]
                })                

                await interaction.reply('Yes dude, lets gooooooo.')
                return
            }
            if(interaction.customId === 'answer-no'){
                firstButton.setDisabled(true)
                secondButton.setDisabled(true)
                
                reply.edit({
                    content : "you cant's choose again.!",
                    components : [buttonRow]
                })

                await interaction.reply("why dude.🖐️😲🤚")
                return
            }
        })

        collection.on('end',async ()=>{
            await reply.delete()
        })

    }
 }