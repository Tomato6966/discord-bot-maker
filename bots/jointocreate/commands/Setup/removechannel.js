const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const fs = require("fs")
module.exports = {
    name: "removechannel",
    category: "Setup",
    aliases: ["removech"],
    cooldown: 2,
    usage: "removechannel <ID>",
    description: "Removes a Channel, which should be not used as an Setup anymore | Source for Join to Creates!",
    run: async (client, message, args, user, text, prefix) => {
    try{
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Please add a Channel ID!`)
        );
      let channel = message.guild.channels.cache.get(args[0])
      if(!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Cannot find your Channel by ID!`)
        );
      if(channel.type !== "voice")
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Your granted Channel is not a Voice Channel`)
        );
      if(config.guild.length === 18 && config.guild !== message.guild.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | You are not allowed to add a Channel cause you are not in the right guild!`)
        );

      let oldconfig = config;
      oldconfig.guild = message.guild.id;
      const index = oldconfig.channels.indexOf(channel.id);
      if (index > -1) {
        oldconfig.channels.splice(index, 1);
      }
      else {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Your granted ID is not saved so I can't remove it!`)
        );
      }

      fs.writeFile("./botconfig/config.json", JSON.stringify(oldconfig, null, 3), async (e) => {
          if (e) {
            console.log(String(e.stack).red);
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext,ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle("❌ ERROR Writing the File")
              .setDescription(`\`\`\`${e.stack}\`\`\``)
            )
          }
          return message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
            .setTitle(`✅ Success | Removed: \`${channel.name}\` from the Join to Create Channels!`)
          )
        });
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
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
