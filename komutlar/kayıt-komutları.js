const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '.'
let yardım = new Discord.RichEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor('RANDOM')
.addField('Marvina Discord Bot Yardım Menüsü',`
**${prefix}erkek @Etiket isim yaş** : Erkek olarak kayıt eder..
**${prefix}kız @Etiket isim yaş** : Kız olarak kayıt eder..
`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.addField('Marvina Discord:',`https://discord.gg/FvBtr5M`)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: true, 
  aliases: ["help"], 
  permLevel: 0
};
exports.help = {
  name: 'kayıt-komutları'
};