const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { duration } = require("../../handlers/functions")
module.exports = {
    name: "stats",
    category: "🔰 Info",
    aliases: [""],
    cooldown: 10,
    usage: "stats",
    description: "Shows Bot Stats",
    run: async (client, message, args, user, text, prefix) => {
    try{
      let botssize = 0;
      let waitingroombots = 0;
      let jointocreatebots = 0;
      let discordjshandlers = 0;
      let musicbots = 0;
      for(const gid of client.guilds.cache.map(g => g.id)){
        try{
          client.stats.ensure(gid, {
            commands: 0,
            Bots: 0,
            messages: 0,
            waitingroombot: 0,
            jointocreatebot: 0,
            discordjshandler: 0,
            musicbot: 0
          })
          botssize += Math.ceil(client.stats.get(gid, "Bots"));
          waitingroombots += Math.ceil(client.stats.get(gid, "waitingroombot"));
          jointocreatebots += Math.ceil(client.stats.get(gid, "jointocreatebot"));
          discordjshandlers += Math.ceil(client.stats.get(gid, "discordjshandler"));
          musicbots += Math.ceil(client.stats.get(gid, "musicbot"));
        }catch{}
      }
      let global = client.stats.get("global");
      let guild = client.stats.get(message.guild.id);
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .addField("⚙️ GLOBAL Commands used:", `>>> \`${global.commands} Commands\` used\nin **all** Servers`,true)
        .addField("📰 GLOBAL Setups created:", `>>> \`${botssize} Bots\` created in\n**all** Servers`,true)
        .addField("📰 Each Bot Setup Count:", `>>> \`${waitingroombots} Waitingroom Bots\`\n\`${jointocreatebots} Join to Create Bots\`\n\`${discordjshandlers} Discord js Handler Bots\`\n\`${musicbots} Music Bots\``)
        .addField("\u200b", "\u200b")
        .addField("⚙️ SERVER Commands used:", `>>> \`${guild.commands} Commands\` used in\n**this** Server`,true)
        .addField("📰 SERVER Setups created:", `>>> \`${client.stats.get(message.guild.id, "Bots")} Bots\` created in\n**this** Servers`,true)
        .addField("\u200b", "\u200b")
        .setTitle(`💿 The Stats of ${client.user.username}`)
      );
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
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
