const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const radiomodule = require("../../modules/radiomodule");
const fs = require("fs")
module.exports = {
    name: "leave",
    category: "Voice",
    aliases: [""],
    cooldown: 2,
    usage: "leave",
    description: "Leaves the Setupped Channel",
    run: async (client, message, args, user, text, prefix) => {
      try{
        let botchannel = message.guild.me.voice.channel;

            if(!botchannel) {
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
                .setTitle(`:x: Not Connected to: \`${config.channel}\``)
              )
            }
            message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
              .setTitle(`Leaving...: \`${botchannel.name}\``)
            )
            botchannel.leave();
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
