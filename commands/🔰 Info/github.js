const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
		name: "github",
		category: "🔰 Info",
		aliases: ["git", "source"],
		cooldown: 2,
		usage: "github",
		description: "Shows you the Github and Source Code Information about this Bot",
	  run: async (client, message, args, user, text, prefix) => {
		try{
        message.channel.send(new MessageEmbed()
        .setTitle(`This Bot is made by \`Tomato#6966\` and **this** is the Source Code link to this Bot`)
        .setURL("https://github.com/Tomato6966/discord-bot-maker/tree/main")
        .addField("Discord.js: ", "[\`v12.5.1\`](https://discord.js.org)", true)
        .addField("Node.js: ", "[\`v15.3.4\`](https://nodejs.org/en/)", true)
      	.addField("file_system of nodejs: ", "To Create the BOTS", true)
        .addField("Source Code. ", "Don't just use the source for yourself,... please [invite](https://discord.com/api/oauth2/authorize?client_id=816963140054679562&permissions=51200&scope=bot) me too![\`Click here\`](https://github.com/Tomato6966/discord-bot-maker/tree/main)")
        .setColor(ee.color)
				.setFooter(ee.footertext, ee.footericon)
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
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
