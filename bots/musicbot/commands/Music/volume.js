const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "volume",
    category: "Music",
    aliases: ["vol"],
    cooldown: 4,
    useage: "volume <0-150>",
    description: "Changes volume of the BOT!",
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
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | You didn't provided a Loop method`)
          .setDescription(`Current Volume: \`${client.distube.getQueue(message).volume}%\`\nUsage: \`${prefix}volume <0-150>\``)
        );

      if(!(0 <= Number(args[0]) && Number(args[0]) <= 500))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | Volume out of Range`)
          .setDescription(`Usage: \`${prefix}volume <0-150>\``)
        );

        client.distube.setVolume(message, Number(args[0]));
        return message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
          .setTitle(`🔊 Changed the Volume to: \`${args[0]}%\``)
        );
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
