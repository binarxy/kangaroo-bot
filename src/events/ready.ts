mport { Client } from 'discord.js';

export default {
    name : 'ready',
    once : true,
    execute(client : Client) {
        console.log(`${client.user?.tag} is ready now as ping : ${client.ws.ping}ms.👍🦘`);
    }
}
