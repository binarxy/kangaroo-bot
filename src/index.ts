import { Client , GatewayIntentBits } from 'discord.js';
import Bot from './lib/Bot';

const client = new Client({
        intents : [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent
        ]
    })

const bot = new Bot(client)

export { bot , client }

