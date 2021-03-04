const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "pause",
    category: "Music",
    aliases: [""],
    cooldown: 4,
    useage: "pause",
    description: "Pauses the Music",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
      if(!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Please join a Channel first`)
        );
      if(!client.distube.getQueue(message))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | I am not playing Something`)
          .setDescription(`The Queue is empty`)
        );
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Please join **my** Channel first`)
          .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
        );
      if(client.distube.isPaused(message))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Cannot pause the Song`)
          .setDescription(`It's already paused, so I cant!`)
        );
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(client.user.username + " | powered by: milrato.eu",client.user.displayAvatarURL())
        .setTitle("⏸ Paused the Song")
      ).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))

      client.distube.pause(message);
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
