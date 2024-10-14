import { Client, Collection } from 'discord.js';
import { join } from 'path';
import fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import 'dotenv/config'

export default class Bot {
  public commands = new Collection<string, any>();
  private commandsArray: any[] = [];

  constructor(public readonly client: Client) {
    this.client.login(process.env.TOKEN);

    this.client.on('warn', (info) => console.log(info));
    this.client.on('error', console.error);

    this.importEvents();
    this.importSlashCommands();
    this.registerCommand();
  }

  private async importEvents() {
    const eventFiles = fs
      .readdirSync(join(__dirname, '../events'))
      .filter((file) => !file.endsWith('.map'));

    for (const file of eventFiles) {
      const filePath = join(join(__dirname, '../events'), file);
      const event = await import(filePath);

      const currentEvent = event.default;

      if (currentEvent.once) {
        this.client.once(currentEvent.name, (...args) =>
          currentEvent.execute(...args)
        );
      } else {
        this.client.on(currentEvent.name, (...args) =>
          currentEvent.execute(...args)
        );
      }
    }
  }

  private async importSlashCommands() {
    const commandFiles = fs
      .readdirSync(join(__dirname, '../commands')) 
      .filter((file) => !file.endsWith('.map'));

    for (const file of commandFiles) {
      const filePath = join(join(__dirname, '../commands'), file); 
      const command = await import(filePath);
      const currentCommand = command.default;

      this.commands.set(currentCommand.data.name, currentCommand);
      console.log(`[Log✅] Loaded command ${currentCommand.data.name}`);

      const commandData = currentCommand.data.toJSON();
      this.commandsArray.push(commandData);
    }
  }

  private async registerCommand() {
    setTimeout(() => {
      const rest = new REST({ version: '9' }).setToken(process.env.TOKEN as string);
      rest
        .put(
          Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string),
          { body: this.commandsArray }
        )
        .then(() =>
          console.log('[Log✅] Successfully registered application commands!.')
        )
        .catch(console.error);
    }, 2500);
  }
}