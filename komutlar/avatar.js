const Discord = require ('discord.js');

exports.run = (client, message, args) => {
  
  const embed = new Discord.RichEmbed()
  
  
  .setTitle('Kişi avatarı. <a:rblob:710053088907493396>')
  .setImage(message.author.avatarURL)
  
  message.channel.send(embed).catch()
  
  };
 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: [],
   permLevel: 0
 };
 exports.help = {
   name: 'avatar',
   description: 'Botun davet bağlantılarını gösterir',
   usage: 'avatar'
 };
//Lexar