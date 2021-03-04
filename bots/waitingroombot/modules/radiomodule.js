const config = require("../botconfig/config.json");
module.exports = function (client) {
  try{
    setTimeout(() => {
      radioexecuteadmin();
    }, 1000); //delay

    setInterval(() => {
        check();
    }, 15000); //delay

    //log if someone joins a channel
    client.on('voiceStateUpdate',async (oldState, newState) => {
      try {
        if(newState.channel.id === config.channel && newState.guild.id === config.guild) {
          if(newState.member.id === client.user.id) return; //if its the bot return
          if (newState.guild.me.speaking) return; //if the bot is already speaking return
          if(newState.member.user.bot) return; //if its a bot return
          radioexecuteadmin();
        }
      }catch (e){
      }
    });

    //checke alle 30 sekunden ob connected für radio
    async function check(){
      try{
        let guild = client.guilds.cache.get(config.guild); //get the guild
        if(!guild.me.voice.channel) {
          radioexecuteadmin();
        }
      }catch (e){
      }
    }

    //PLAY THE RADIO
    async function radioexecuteadmin() {
      try{
        //get the voice channel
        const channel = await client.channels.fetch(config.channel);
        if(channel) console.log(`Connecting to: ${channel.name}`)
        //join the channel
        await channel.leave();
        await new Promise(resolve=>{
           setTimeout(()=>{
            resolve(2);
          },500)
        })
        await channel.join()
          .then(cnc => {
            cnc.voice.setSelfDeaf(true); //set self deaf
            cnc.voice.setDeaf(true);     //set server self deaf
            cnc.play(config.radiostation ? config.radiostation : "https://stream-mz.planetradio.co.uk/net2national.mp3") //play the stream
            .setVolumeLogarithmic(45 / 100) //change volume to 30%
          });
        }catch (e){
        }
    }
  }catch (e){
  }
}
