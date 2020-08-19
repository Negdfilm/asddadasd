const Discord = require('discord.js');
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setTitle("⍻ Luminous \n")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .addField('**1.** Nsfwye yönelik olmamalıdır')
  .addField('**2.** En Az 100 Kişi Olmalıdır')
  .addField('**3.** En Az 1 Yetkili Sunucumuzda Olmalıdır')
  .addField('**YUKARDAKI KURALLARA UYULMADIGI TAKDIRDE PARTNERLIK IPTAL OLUR!!!**',)
  .setFooter("♥ 2020 ♥ ⍻ Luminous ♥", " ")
  /*
   * Takes a Date object, defaults to current date.
   */

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'şart',
  description: 'Botun pingini gösterir.',
  usage: 'şart'
};