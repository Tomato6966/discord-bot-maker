const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "help",
    category: "🔰 Info",
    aliases: ["h", "commandinfo", "cmds", "cmd"],
    cooldown: 4,
    usage: "help [Command]",
    description: "Returns all Commmands, or one specific command",
    run: async (client, message, args, user, text, prefix) => {
      try{
        if (args[0]) {
          const embed = new MessageEmbed();
          const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
          if (!cmd) {
              return message.channel.send(embed.setColor(ee.wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`));
          }
          if (cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``);
          if (cmd.name) embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
          if (cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);
          if (cmd.commands) embed.addField("**Commands**", `${cmd.commands.map(cmd => `\`${cmd}\``)}`);
          if (cmd.aliases) embed.addField("**Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
          if (cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} Seconds\``);
          else embed.addField("**Cooldown**", `\`1 Second\``);
          if (cmd.usage) {
              embed.addField("**Usage**", `\`${config.prefix}${cmd.usage}\``);
              embed.setFooter("Syntax: <> = required, [] = optional");
          }
          if (cmd.useage) {
              embed.addField("**Useage**", `\`${config.prefix}${cmd.useage}\``);
              embed.setFooter("Syntax: <> = required, [] = optional");
          }
          return message.channel.send(embed.setColor(ee.color));
        } else {
          const embed = new MessageEmbed()
              .setColor(ee.color)
              .setThumbnail(client.user.displayAvatarURL())
              .setTitle("HELP MENU 🔰 Commands")
              .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          const embed2 = new MessageEmbed()
              .setColor(ee.color)
              .setThumbnail(client.user.displayAvatarURL())
          const commands = (category) => {
              return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          };
          try {
            let botcreation_cat, botcreation_cmds;
            for (let i = 0; i < client.categories.length; i += 1) {
              const current = client.categories[i];
              const items = commands(current);
              //if it's from a Bot Creation continue so it doesnt show up in the FIRST EMBED and will show up in teh SECOND embed
              if(current.toLowerCase().includes("bot")){
                botcreation_cat = current;
                botcreation_cmds = items;
                continue;
              }
              const n = 3;
              const result = [[], [], []];
              const wordsPerLine = Math.ceil(items.length / 3);
              for (let line = 0; line < n; line++) {
                  for (let i = 0; i < wordsPerLine; i++) {
                      const value = items[i + line * wordsPerLine];
                      if (!value) continue;
                      result[line].push(value);
                  }
              }
              embed.addField(`**${current.toUpperCase()} [${items.length}]**`, `> ${result[0].join("\n> ")}`, true);
              embed.addField(`\u200b`, `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`, true);
              embed.addField(`\u200b`, `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`, true);
            }

            embed2.setTitle(`HELP MENU \`⚙️ BOT CREATION\` | [${botcreation_cmds.length}] Commands`)
            embed2.setDescription("These are the Commands, which creates you a Bot!\n***All Commands in a Nutshell:*** \n> " + botcreation_cmds.join(", "))
            embed2.setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
            for(let item of botcreation_cmds){
              const cmd = client.commands.get(String(item.split("`").join("")).toLowerCase())
              embed2.addField(`**❯ ${String(item.split("`").join("")).toUpperCase()}**`, `*${cmd.description}*\n${trimArray(cmd.commands)}`);
            }
          } catch (e) {
              console.log(String(e.stack).red);
          }
          message.channel.send(embed);
          message.channel.send(embed2);
      }
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
        );
    }
  }
}
function trimArray(arr, maxLen = 6) {
 if (arr.length > maxLen) {
   const len = arr.length - maxLen;
   arr = arr.slice(0, maxLen);
   arr.push(`${len} more...`);
 }
 return arr.map(item=>`\`${item}\``);
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
