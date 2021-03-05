const config = require("../botconfig/config");
const jointocreatemap = new Map();
module.exports = function (client) {
  //SECURITY LOOP
  new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
        try{
          const guild = client.guilds.cache.get(config.guild);
          const channels = guild.channels.cache.map(ch => ch.id)
          for (let i = 0; i < channels.length; i++) {
            const key = `tempvoicechannel_${guild.id}_${channels[i]}`;
            if (jointocreatemap.get(key)) {
              var vc = guild.channels.cache.get(jointocreatemap.get(key));
              if (vc.members.size < 1) {
                jointocreatemap.delete(key);
                return vc.delete();
              } else {}
            }
          }
      }catch{}
    }, 5000)
  })
  //voice state update event to check joining/leaving channels
  client.on("voiceStateUpdate", (oldState, newState) => {
    // JOINED V12
    if (!oldState.channelID && newState.channelID) {
      if (!config.channels.includes(newState.channelID)) return; //if its not the jointocreatechannel skip
      jointocreatechannel(newState); //load the function
    }
    // LEFT V12
    if (oldState.channelID && !newState.channelID) {
      //get the jointocreatechannel id from the map
      if (jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`)) {
        //fetch it from the guild
        var vc = oldState.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`));
        //if the channel size is below one
        if (vc.members.size < 1) {
          //delete it from the map
          jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`);
          //delete the voice channel
          return vc.delete();
        } else {}
      }
    }
    // Switch v12
    if (oldState.channelID && newState.channelID) {

      if (oldState.channelID !== newState.channelID) {
        //if its the join to create channel
        if (config.channels.includes(newState.channelID)) jointocreatechannel(newState);
        //BUT if its also a channel ín the map (temp voice channel)
        if (jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`)) {
          //fetch the channel
          var vc = oldState.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`));
          //if the size is under 1
          if (vc.members.size < 1) {
            //delete it from the map
            jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`);
            //delete the room
            vc.delete();
          } else {}
        }
      }
    }
  })
  async function jointocreatechannel(user) {
    if (jointocreatemap.get(`tempvoicechannel_${user.guild.id}_${user.channelID}`)) {
      //fetch the channel
      var vc = user.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${user.guild.id}_${user.channelID}`));
      //if the size is under 1
      if (vc.members.size < 1) {
        //delete it from the map
        jointocreatemap.delete(`tempvoicechannel_${user.guild.id}_${user.channelID}`);
        //delete the room
        vc.delete();
      } else {}

    }
    //user.member.user.send("This can be used to message the member that a new room was created")
    await user.guild.channels.create(`${user.member.user.username}'s Lounge`.substr(0, 32), {
      type: 'voice',
      parent: user.channel.parent ? user.channel.parent.id : "",
    }).then(async vc => {
      //set the new channel to the map
      jointocreatemap.set(`tempvoicechannel_${vc.guild.id}_${vc.id}`, vc.id);
      //move user to the new channel
      user.setChannel(vc);

      //change the permissions of the channel
      await vc.overwritePermissions([{
          id: user.id,
          allow: ['MANAGE_CHANNELS'],
        },
        {
          id: user.guild.id,
          allow: ['VIEW_CHANNEL'],
        },
      ]);
    })
  }
}

//Coded by Tomato#6966!
