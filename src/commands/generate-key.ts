import { 
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder
 } from "discord.js";

import { PrismaClient } from "@prisma/client";
import { generateKey } from "../lib/randomKey";

const prisma = new PrismaClient()

export default {
    data : new SlashCommandBuilder()
        .setName('generate-key')
        .setDescription('run to generate key'),
    async execute(interaction : CommandInteraction){
        try {

            const newKey = await prisma.keys.create({
                data : {
                    key : generateKey(16)
                }
            })   
            
            const generateEmbed = new EmbedBuilder()
                .setColor(0xFFFFFF)
                .setTitle('Key generated.🔑')
                .setDescription('a key has generate with random text, you can use it to redeem, or something else')
                .addFields({
                    name : '🔐🗝️Key Code.',
                    value : '```' + newKey.key + '```'
                })
                .setTimestamp()

            await interaction.reply({ 
                embeds : [generateEmbed],
                ephemeral : true
            })

        } catch (err) {
            console.log(err)
            return
        } 
        finally {
            await prisma.$disconnect()
        }


    }
}