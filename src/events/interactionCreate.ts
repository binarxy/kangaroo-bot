import { Client , Interaction , CommandInteraction } from 'discord.js';
import { bot } from '../index';

export default {
    name : 'interactionCreate',
    once : false,
    execute(interaction : Interaction){
        if(interaction.isCommand()) {
            bot.commands.get(interaction?.commandName)?.execute(interaction as CommandInteraction)
            return
        }
    }
}