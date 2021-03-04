const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "loop",
    category: "Music",
    aliases: ["repeat"],
    cooldown: 4,
    useage: "loop <0/1/2>",
    description: "Changes loop from off/song/queue !",
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
          .setDescription(`Usage: \`${prefix}loop <0/1/2>\``)
        );
      let loopstate = args[0].toString();
      if (loopstate.toLowerCase() === "song") loopstate = "1";
      if (loopstate.toLowerCase() === "queue") loopstate = "2";
      if (loopstate.toLowerCase() === "off") loopstate = "0";
      if (loopstate.toLowerCase() === "track") loopstate = "1";
      if (loopstate.toLowerCase() === "q") loopstate = "2";
      if (loopstate.toLowerCase() === "qu") loopstate = "2";
      if (loopstate.toLowerCase() === "disable") loopstate = "0";
      
      loopstate = Number(loopstate);
      loopstates = {
        "0": "off",
        "1" : "song",
        "2": "queue"
      }
      if( 0 <= loopstate && loopstate <= 2){
        client.distube.setRepeatMode(message, parseInt(loopstate));
        message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(client.user.username + " | powered by: milrato.eu",client.user.displayAvatarURL())
          .setTitle(`🔁 Changed Repeat mode to: \`${loopstates[loopstate]}\``)
        ).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
      }
      else{
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username + " | powered by: milrato.eu", client.user.displayAvatarURL())
          .setTitle(`❌ ERROR | You didn't provided a Loop method`)
          .setDescription(`Usage: \`${prefix}loop <0/1/2>\``)
        );
      }


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
