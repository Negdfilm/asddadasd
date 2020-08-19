const Discord = require("discord.js");//Lexar
const client = new Discord.Client();//Lexar
const ayarlar = require("./ayarlar.json");//Lexar
const chalk = require("chalk");//Lexar
const moment = require("moment");//Lexar
var Jimp = require("jimp");//Lexar
const { Client, Util } = require("discord.js");//Lexar
const weather = require("weather-js");//Lexar
const fs = require("fs");//Lexar
const db = require("quick.db");//Lexar
const http = require("http");//Lexar
const express = require("express");//Lexar
require("./util/eventLoader.js")(client);//Lexar
const path = require("path");//Lexar
const request = require("request");//Lexar
const snekfetch = require("snekfetch");//Lexar
const queue = new Map();//Lexar
const YouTube = require("simple-youtube-api");//Lexar
const ytdl = require("ytdl-core");//Lexar

const app = express();//Lexar
app.get("/", (request, response) => {//Lexar
    console.log(Date.now() + "LeXaR Pro");//Lexar
  response.sendStatus(200);//Lexar
});//Lexar
app.listen(process.env.PORT);//Lexar
setInterval(() => {//Lexar
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);//Lexar
}, 90000);//Lexar
//Lexar
var prefix = ayarlar.prefix;//Lexar

const log = message => {//Lexar
  console.log(`${message}`);//Lexar
};

client.commands = new Discord.Collection();//Lexar
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });//Lexar
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }//Lexar
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);//Lexar
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {//Lexar
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }//Lexar
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {//Lexar
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {//Lexar
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);
/////

//---------------------------------KOMUTLAR---------------------------------\\
//Lexar
///otorol///
client.on("guildMemberAdd", async (member, guild, message) => {
  let role = db.fetch(`otorolisim_${member.guild.id}`);
  let otorol = db.fetch(`autoRole_${member.guild.id}`);//Lexar
  let i = db.fetch(`otorolKanal_${member.guild.id}`);
  if (!otorol || otorol.toLowerCase() === "yok") return;
  else {
    try {
      if (!i) return;
      if (!role) {
        member.addRole(member.guild.roles.get(otorol));
        var embed = new Discord.RichEmbed()
          .setDescription(
            "**Sunucuya Yeni Katılan** @" +
              member.user.tag +
              " **Kullanıcısına** <@&" +
              otorol +
              ">  **Rolü verildi:white_check_mark:**"
          )
          .setColor("0x36393E")
          .setFooter(`wonders Otorol Sistemi`);
        member.guild.channels.get(i).send(embed);
      } else if (role) {
        member.addRole(member.guild.roles.get(otorol));
        var embed = new Discord.RichEmbed()
          .setDescription(
            `**Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${role}\` **Rolü verildi. <a:blobjoining:696373472431177781>**`
          )
          .setColor("0x36393E")
          .setFooter(`Fays Otorol Sistemi`);
        member.guild.channels.get(i).send(embed);
      }
    } catch (e) {
      console.log(e);
    }
  }
});
 
///reklam///
client.on("message", async msg => {
  let antoxd = await db.fetch(`antoxd${msg.guild.id}`);
  if (antoxd === "acik") {//Lexar
    const reklam = ["discord.gg", "https://discordapp.com//"];
    if (reklam.some(word => msg.content.includes(word))) {
      msg.delete();
    }
  }
});
///sa-as///
client.on("message", msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Sa") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Sea") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "sea") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");//Lexar
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Selamın Aleyküm") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "selamın aleyküm") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Selamun Aleyküm") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "selamun aleyküm") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Youtube") {
    msg.reply("**__Youtube Link__** : ");//Lexar
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "youtube") {
    msg.reply("**__Youtube Link__** : ");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "YOUTUBE") {
    msg.reply("**__Youtube Link__** : ");
  }
});

///reklam-engelle///
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`reklamFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "discordapp",
      "discordgg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          msg.delete();
          let embed = new Discord.RichEmbed()
            .setColor(0xffa300)
            .setFooter(
              "Fays BOT  -|-  Reklam engellendi.",
              client.user.avatarURL
            )
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL
            )
            .setDescription(
              " Fays Reklam Sistemi, " +
                `**${msg.guild.name}**` +
                " Adlı Sunucuda Reklam Yakaladım."
            )
            .addField(
              "Reklamı yapan kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(`${msg.author.tag}, Reklam Yapmak Yasak!`)
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});
///davet-ayarla///
const invites = {};

const wait = require('util').promisify(setTimeout);

client.on('ready', () => {

  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {
  
  
 
  member.guild.fetchInvites().then(guildInvites => {
    
    if (db.has(`dKanal_${member.guild.id}`) === false) return
    const channel = db.fetch(`dKanal_${member.guild.id}`).replace("<#", "").replace(">", "")
    
    const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

    const davetçi = client.users.get(invite.inviter.id);
     db.add(`davet_${invite.inviter.id + member.guild.id}`,1)
let bal  = db.fetch(`davet_${invite.inviter.id + member.guild.id}`)
   member.guild.channels.get(channel).send(`<a:misik:710053226816208946> ** <@${member.id}> Sunucuya katıldı.**; Davet eden kişi > **${davetçi.tag}** (`+'**'+bal+'** invitesi var)')
  })

});
client.on("guildMemberRemove", async member => {
//Lexar
    member.guild.fetchInvites().then(guildInvites => {

      const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

       db.subtract(`davet_${invite.inviter.id + member.guild.id}`,1)
    })
})
///sunucukur///
client.on("message", async message => {
    const ms = require("ms");
    const prefix =
      (await require("quick.db").fetch(`prefix_${message.guild.id}`)) ||
      ayarlar.prefix;
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    let u = message.mentions.users.first() || message.author;
    if (command === "sunucu-kur") {
      if (
        message.guild.channels.find(channel => channel.name === "Bot Kullanımı")
      )
        return message.channel.send(" Bot Paneli Zaten Ayarlanmış.");
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(
          " Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir."
        );
      message.channel.send(
        `Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`
      );
      message.channel
        .awaitMessages(response => response.content === "evet", {
          max: 1,
          time: 10000,
          errors: ["time"]
        })
        .then(collected => {
          message.guild.createChannel("|▬▬|ÖNEMLİ KANALLAR|▬▬|", "category", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ]);

          message.guild
            .createChannel("「📃」kurallar", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])//Lexar
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「🚪」gelen-giden", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「✅」sayaç", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「💾」log-kanalı", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「📢」duyuru-odası", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])//Lexar
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
        })
        .then(collected => {
          message.guild.createChannel("|▬▬|GENEL KANALLAR|▬▬|", "category", [
            {
              id: message.guild.id
            }
          ]);

          message.guild
            .createChannel(`「💡」şikayet-ve-öneri`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「👥」pre-arama-odası`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「📷」görsel-içerik`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「🤖」bot-komutları`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「💬」sohbet`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(//Lexar
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );

          message.guild
            .createChannel(`🏆》Kurucu Odası`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
                )
              )
            )
            .then(c => {
              let role = message.guild.roles.find("name", "@everyone");
              let role2 = message.guild.roles.find("name", "Kurucu");

              c.overwritePermissions(role, {
                CONNECT: false
              });
              c.overwritePermissions(role2, {
                CONNECT: true
              });
            });

          message.guild.createChannel("|▬▬|SES KANALLARI|▬▬|", "category", [
            {
              id: message.guild.id
            }
          ]);

          message.guild
            .createChannel(`🏆》Yönetici Odası`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
                )
              )
            )
            .then(c => {
              let role = message.guild.roles.find("name", "@everyone");
              let role2 = message.guild.roles.find("name", "Kurucu");
              let role3 = message.guild.roles.find("name", "Yönetici");
              c.overwritePermissions(role, {
                CONNECT: false
              });
              c.overwritePermissions(role2, {
                CONNECT: true
              });
              c.overwritePermissions(role3, {
                CONNECT: true
              });
            });

          message.guild//Lexar
            .createChannel(`💬》Sohbet Odası`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
                )
              )
            )
            .then(c => {
              let role = message.guild.roles.find("name", "@everyone");
              c.overwritePermissions(role, {
                CONNECT: true
              });
            });

          message.guild.createChannel("|▬▬|OYUN ODALARI|▬▬|", "category", [
            {
              id: message.guild.id
            }
          ]);

          message.guild
            .createChannel(`🎮》LOL`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》ZULA`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》COUNTER STRİKE`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》PUBG`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )//Lexar
              )
            );
          message.guild
            .createChannel(`🎮》FORTNİTE`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》MİNECRAFT`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》ROBLOX`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》WOLFTEAM`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );

          message.guild.createRole({
            name: "Kurucu",
            color: "RED",
            permissions: ["ADMINISTRATOR"]
          });

          message.guild.createRole({
            name: "Yönetici",
            color: "BLUE",
            permissions: [
              "MANAGE_GUILD",
              "MANAGE_ROLES",
              "MUTE_MEMBERS",
              "DEAFEN_MEMBERS",
              "MANAGE_MESSAGES",
              "MANAGE_NICKNAMES",
              "KICK_MEMBERS"
            ]
          });
//Lexar
          message.guild.createRole({
            name: "Moderatör",
            color: "GREEN",
            permissions: [
              "MANAGE_GUILD",
              "MANAGE_ROLES",
              "MUTE_MEMBERS",
              "DEAFEN_MEMBERS",
              "MANAGE_MESSAGES",
              "MANAGE_NICKNAMES"
            ]
          });

          message.guild.createRole({
            name: "V.I.P",
            color: "00ffff"
          });

          message.guild.createRole({
            name: "Üye",
            color: "WHITE"
          });

          message.guild.createRole({
            name: "Bot",
            color: "ORANGE"
          });
//Lexar
          message.channel.send("Gerekli Odalar Kuruldu!");
        });
    }
  });
//Lexar



client.on("userUpdate", async (old, nev) => {
  let emingSunucu = "743150619891728475"; //Sunucu ID
  let emingKanal = "743533158288326687"; //BILGI KANAL ID
  let emingRol = "743151511781113937"; //ROL ID
  let emingTag = "✯"; //TAG
  if (old.username !== nev.username) {
    if (
      nev.username.includes(emingTag) &&
      !client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .roles.has(emingRol)
    ) {
      client.channels
        .get(emingKanal)
        .send(
          ` **${nev}, \`${emingTag}\` Tagını aldı ${emingRol} rolünü kazandı.**`
        );
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .addRole(emingRol);
    }
    if (
      !nev.username.includes(emingTag) &&
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .roles.has(emingRol)
    ) {
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .removeRole(emingRol);
      client.channels
        .get(emingKanal)
        .send(
          ` **${nev}, \`${emingTag}\` Tagını çıkarttı ${emingRol} rolünü kaybetti.**`
        );
    }
  }
});

client.on('guildMemberAdd', member => {
  let stark = client.channels.get(db.fetch(`darkkcode_${member.guild.id}`))
  const embed = new Discord.RichEmbed()
  .setTitle(client.users.get(member.id).username)
  .setDescription("Hoşgeldin, seninle birlikte "+member.guild.memberCount+" kişiyiz!")
  .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
  .setFooter("Dark Code",member.guild.iconURL)
  stark.send(embed)
})

client.on('guildMemberRemove', member => {
   let knl = client.channels.get(db.fetch(`Darkcode_${member.guild.id}`))
  const embed = new Discord.RichEmbed()
  .setTitle(client.users.get(member.id).username)
  .setDescription("Görüşürüz, sensiz "+member.guild.memberCount+" kişiyiz!")
  .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
  .setFooter("s",member.guild.iconURL)
  knl.send(embed)
})


client.on("guildMemberAdd", member => { 
//  const emoji = client.emojis.get('743537471912148993');
  const kanal = "743151549601153125";
  let user = client.users.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.RichEmbed()
 
  var kontrol;
if (kurulus < 1296000000) kontrol = '  **__Bu Hesap Güvenilir Değil__**  '
if (kurulus > 1296000000) kontrol = '   **__Bu Hesap Güvenilir Gözüküyor__**  '
  moment.locale("tr");
  let buse = client.channels.get(kanal);
buse.send(`
Hoşgeldin! ${member} Seninle Birlikte ${member.guild.memberCount} Kişiyiz.

Kayıt olmak için müsait zamanında ses teyit odalarına girip ses ve isim vermen yeterlidir.

<@&743151504948461719> Ları buraya çağırıyorum birazdan gelirler. <a:kisik:710053236404518972>

Hesabın Oluşturulma Tarihi: ${moment(member.user.createdAt).format("** YYYY __DD MMMM dddd (hh:mm:ss)__ <a:unlem:710053065952329750> **")}

${kontrol} <a:unlem:710053065952329750>

Tagımızı alarak bize destek olabilirsin. ✯ <a:tac:710053148852617286>`)
  
buse.send({
  file: "https://media.discordapp.net/attachments/608711476219478045/660404777523347470/harley.gif"
})

});

//BURAYI @ROLEİD GİBİ EDİTLEYEBİLİRİSİNİZ !

client.on("message" , async message => {
  const msg = message;
  if(message.content.startsWith(ayarlar.prefix+"afk")) return; 
  /*db.set(`afkSebep_${message.author.id}_${message.guild.id}`, "Sebep Girilmemiş")
  db.set(`afkKisi_${message.author.id}_${message.guild.id}`, message.author.id)              Bunlar Afk Komutndaki İsimler /// tmm bakalım
  db.set(`afkAd_${message.author.id}_${message.guild.id}`, message.author.username)*/
  
  /*      const embed = new Discord.RichEmbed()
      .setColor("#0080FF")
      .setAuthor("WoxeBot" , "https://cdn.discordapp.com/avatars/605781334438445057/495a33da25bc54f9c9dd1f5883da7409.png?size=2048")
      .setDescription(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`)
       message.channel.send(embed)
       */
  
  let afk = message.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`)
  
  const isim = db.fetch(`afkAd_${message.author.id}_${message.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${message.guild.id}`)
   if(message.content.includes(kisi3)){
     const embed = new Discord.RichEmbed()
      .setColor("#0080FF")
      .setAuthor("Lexar" , "avatar")
      .setDescription(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`)
       message.channel.send(embed)
   }
 }
  if(message.author.id === kisi){
    const embed = new Discord.RichEmbed()
      .setColor("#0080FF")
      .setAuthor("Lexar" , "Avatar")
      .setDescription(`Afk'lıktan Çıktınız`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`)
       message.channel.send(embed)
   db.delete(`afkSebep_${message.author.id}_${message.guild.id}`)
   db.delete(`afkid_${message.author.id}_${message.guild.id}`)
   db.delete(`afkAd_${message.author.id}_${message.guild.id}`)
    message.member.setNickname(isim)
    
  }
  
})



client.on("message", async msg => {
  const db = require('quick.db');
  
  if (msg.channel.type === "dm") return;
  if(msg.author.bot) return;  
  
  if (msg.content.length > 1) {
    
    db.add(`puancik_${msg.author.id + msg.guild.id}`, 2)//mesaj yazınca xp veriyor
    db.add(`xpsira_${msg.author.id + msg.guild.id}`, 2)//doğru bir sıralama sistemi için var

};

  if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 150) {//150 xp de 1 seviye veriyor
    
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1)//seviye verildi
    

    
    db.delete(`puancik_${msg.author.id + msg.guild.id}`)//xp silindi
    
  };
 
  if (db.has(`roll_${msg.guild.id}`) === true) {//rol 
  if (db.has(`rollss_${msg.guild.id}`) === true) {//rol seviye
    
 var r = db.fetch(`roll_${msg.guild.id}`)//rolü bul
 var s = db.fetch(`rollss_${msg.guild.id}`)//seviyeyi bul
  
  if (db.fetch(`seviye_${msg.author.id + msg.guild.id}`) == s) {
    if (msg.member.roles.has(msg.guild.roles.get(r).id) === false) {
    msg.channel.send(`**<@${msg.author.id}> başarıyla ${db.fetch(`seviye_${msg.author.id + msg.guild.id}`) - 1 || 0} seviyeyi geçtin!**`)
    msg.member.addRole(msg.guild.roles.get(r).id)
    }
  };

}};
  
});
  
///////////////
client.on('ready', () =>{
client.channels.get('743151560913191043').join()
})

///////////////////////BanLimit///////////////

client.on("guildBanAdd", async (guild, user) => {
  if (!db.has(`banlimit_${guild.id}`)) return;
  let logs = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'});
  if (logs.entries.first().executor.bot) return;
  const kisi = logs.entries.first().executor
  const member = guild.members.get(kisi.id)
  if (member.hasPermission('ADMINISTRATOR')) return;
  let banlimit = db.fetch(`banlimit_${guild.id}`)
  if (isNaN(banlimit)) return;
  banlimit = banlimit + 1
  if (!db.has(`bansayi_${member.id}_${guild.id}`)) {
    if (banlimit == 1) {
      var array = member.roles.filter(role => role.name !== "@everyone").array()
      for (const role of array) {
        member.removeRole(role.id)
      }
    }else{
      db.set(`bansayi_${member.id}_${guild.id}`, 1)
    }
  }else{
    const bansayisi = db.fetch(`bansayi_${member.id}_${guild.id}`) + 1
    if (bansayisi >= banlimit) {
      db.delete(`bansayi_${member.id}_${guild.id}`)
      var array = member.roles.filter(role => role.name !== "@everyone").array()
      for (const role of array) {
        member.removeRole(role.id)
      }
    }else{
      db.add(`bansayi_${member.id}_${guild.id}`, 1)
    }
  }
})


