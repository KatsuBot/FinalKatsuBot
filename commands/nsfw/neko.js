const superagent = require("snekfetch");
const Discord = require('discord.js')

module.exports = {
  name: "neko",
  category: "nsfw",
description: "",
run: async (client, message, args, level) => {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/lewd')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Neko")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: neko`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};