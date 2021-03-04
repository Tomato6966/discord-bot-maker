const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const radiomodule = require("../../modules/radiomodule");
const fs = require("fs")
module.exports = {
    name: "changeradio",
    category: "Voice",
    aliases: ["setradio"],
    cooldown: 2,
    usage: "changeradio <RadioStation>",
    description: "Changes the RadioStation Link, must be mp3 / stream / m3u / aac",
    run: async (client, message, args, user, text, prefix) => {
    try{
      if(message.author.id !== config.owner && !message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
            .setTitle(`❌ ERROR | You are not my OWNER! you are not allowed to run this Command`)
        );
      let botchannel = message.guild.me.voice.channel;
      if(!args[0])
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
              .setTitle(`❌ ERROR | Please include the RadioStation URL you wanna play!`)
          );
      if(!args[0].includes("http") && !args[0].includes("mp3") && !args[0].includes("stream") && !args[0].includes("aac") && !args[0].includes("m3u"))
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
              .setTitle(`❌ ERROR | The RadioStation URL must be an **mp3 / stream / aac / m3u** Radio stream!!`)
          );

      let oldconfig = config;
      oldconfig.radiostation = args[0];

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
          if(botchannel) {
            await botchannel.leave()
          }
          setTimeout(()=>{
            radiomodule(client)
          }, 500)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
            .setTitle(`✅ Success | Set the new Waitingroom channel to: \`${args[0]}\``)
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
