const Discord = require('discord.js');

exports.run = async(client, message, args) => {
  if (!message.member.voiceChannel || !message.member.hasPermission("Administrator") || message.member.voiceChannel.members.size === 1) return;
  let mesaj = await message.channel.send('<a:load:710053113410748446> Çekiliş yapılıyor, lütfen bekleyin.');
  setTimeout(() => {
    mesaj.edit(new Discord.RichEmbed().setDescription(`**<a:mbise:710053237562015846> Çekiliş sonuçlandı! Kazanan kişi >** ${message.member.voiceChannel.members.filter(a => a.id !== message.author.id).random()}`));
  }, 5000);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'sescekilis', 
  description: 'Ses çekilişi.',
  usage: 'ses-çekiliş',
  kategori: 'kullanıcı'
};