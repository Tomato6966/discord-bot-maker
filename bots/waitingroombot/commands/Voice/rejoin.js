const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const radiomodule = require("../../modules/radiomodule");
const fs = require("fs")
module.exports = {
    name: "rejoin",
    category: "Voice",
    aliases: ["reconnect"],
    cooldown: 2,
    usage: "rejoin",
    description: "Rejoins the Setupped Channel",
    run: async (client, message, args, user, text, prefix) => {
      try{
        let botchannel = message.guild.me.voice.channel;

            if(!botchannel) {
              message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
                .setTitle(`Rejoining...: \`${config.channel}\``)
              )
              return radiomodule(client);
            }
            message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
              .setTitle(`Rejoining...: \`${botchannel.name}\``)
            )
            await botchannel.leave()
            setTimeout(()=>{
              radiomodule(client)
            }, 500)
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
