const Discord = require('discord.js');

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR"))
 if(!message.member.roles.has("743151504948461719")) return message.channel.send(`**<@&743151504948461719> Rolüne Sahip Olmadığın İçin Bu Komutu Kullanamazsın!**`).then(msg => msg.delete(5000));
  let user = message.mentions.members.first()
  let kayityetkili = '743151504948461719' //KAYIT YETKİLİSİ ID
  const isim = args[1]
  const yas = args[2]
  if (!user) return message.channel.send('**Bir üye etiketlemelisin. <a:unlem:710053065952329750> **')
  if (!isim) return message.channel.send('**Bir isim yazmalısın. <a:unlem:710053065952329750> **')
  user.setNickname("✯ " + isim + " | " + yas)////
var embed1 = new Discord.RichEmbed()// log kanalı yoksa burayı silin
  .setDescription(`**<@${message.author.id}> Tarafından ${user.user} Adlı kullanıcının ismi \`✯ ${isim}\` Olarak değiştirilip <@&743151517493887087> rolü verilmiştir. <a:ytik:710053175801151529>**`)
  .setFooter("Kayıt Sistemi")
  .setImage ("https://helendipity.files.wordpress.com/2013/09/welcome-animated51.gif")

       client.channels.get('743151549601153125').send(embed1)
  user.addRole('743151517493887087')
  user.removeRole('743151518911299593')
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['e', 'bay'],
  permLevel: 0
}
exports.help = {
  name: 'erkek',
  description: "Birinin nickini değiştirir.",
  usage: 'isim'
}

// LEXAR