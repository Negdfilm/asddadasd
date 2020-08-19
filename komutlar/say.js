const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;

  for (const [id, voiceChannel] of voiceChannels)count += voiceChannel.members.size;
  
var tagdakiler = 0;
  let tag = "✯"; //TAGINIZ
  message.guild.members.forEach(member => {
    if(member.user.username.includes(tag)) {
      tagdakiler = tagdakiler+1
    } 
  })

  const embed = new Discord.RichEmbed()
    .setColor("#000000")
    .setDescription(`** Sunucuda \`${message.guild.memberCount}\` Kişi Bulunmaktadır! <a:mbise:710053237562015846> \n Ses Kanallarında \`${count}\` Kişi Bulunmaktadır! <a:siren:710053143823515728> \n Tagda \`${tagdakiler}\` Kişi Bulunmaktadır! <a:siren:710053143823515728> \n Tagımız: ${tag}** <a:misik:710053226816208946> `)
    .setTitle("")

    .setTimestamp();
message.channel.send(embed)
message.react('') 
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["total", "toplamüye", "toplamkişi", "say"],
  permLevel: 0
};

exports.help = {
  name: "say",
  description: "Sunucudaki ve Ses Kanallarındaki Kişi Sayısını Gösterir! Tagdakileri Sayar! ",
  usage: "say"
  
};
