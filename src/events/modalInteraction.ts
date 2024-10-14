import { Client , Interaction , Role , EmbedBuilder} from 'discord.js';
// import { bot } from '../index';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default {
    name : 'interactionCreate',
    once : false,
    async execute(interaction : Interaction){
        if(interaction.isModalSubmit()) {
            if(interaction.customId === `Modal-username-#${interaction.user.id}`){
                await interaction.reply({ content : `Hello user!, ${interaction.fields.getTextInputValue('userNameInput')}`,ephemeral : true})
                return
            }
            // console.log(interaction.customId)
            if(interaction.customId === `Modal-redeem-#${interaction.user.id}`){
                
                const key = interaction.fields.getTextInputValue('keyInput')

                try {

                    const findKey = await prisma.keys.findUnique({
                        where : {
                            key
                        }
                    })

                    if(!findKey) {
                         
                        const invaildEmbed = new EmbedBuilder()
                            .setColor(0xE30000)
                            .setFields({
                                name : '❌Invaild This Key.❌',
                                value : '```invaid key, please try again.```'
                            })
                            .setTimestamp()

                         return interaction.reply({ embeds : [invaildEmbed],ephemeral : true})
                        }
                    
                    const member = await interaction.guild?.members.fetch(interaction.user.id)
                    const role = interaction.guild?.roles.cache.get('1058790958495436912')
                    
                    if(!member || !role) return interaction.reply("member doesn't exit")
                    
                    await member.roles.add(role as Role)

                    await prisma.keys.delete({
                        where : {
                            id : findKey.id,
                            key
                        }
                    })

                    const replyEmbed = new EmbedBuilder()
                        .setColor(0x43DD06)
                        .setTitle('Redeem Success👍')
                        .addFields(
                            {
                                name : '[📜Log]',
                                value : '```🚀key has been redeemed.```'
                            }
                        )
                        .setTimestamp()
                    
                    await interaction.reply({
                        embeds : [replyEmbed],
                        ephemeral : true
                    })

                } catch (err) {
                    console.log(err)
                    // throw new Error('faild to get keys')
                }

                return
            }

        }
    }
}