const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")
const utils = require('../../utils');

const Discord = require('discord.js');
const booru = require('booru');
const errors = require('../../json/errors');

module.exports = {
    name: "r34",
    category: "nsfw",
  description: "Searches rule34",
  run: async (bot, message, args, level) => {
  //command
  var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
  if (!message.channel.nsfw) {
      message.react('💢');
      return message.channel.send(errMessage);
  }

  if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('That kind of stuff is not allowed! Not even in NSFW channels!');

  var query = message.content.split(/\s+/g).slice(1).join(" ");
  booru.search('rb', [query], {nsfw: true, limit: 1, random: true })
      .then(booru.commonfy)
      .then(images => {
          for (let image of images) {
              const embed = new Discord.MessageEmbed()
              .setTitle("3D:")
              .setImage(image.common.file_url)
              .setColor('#000000')
              .setFooter(`Tags: 3D ${query}`)
              .setURL(image.common.file_url);
          return message.channel.send({ embed });
          }

      }).catch(err => {
          if (err.name === 'booruError') {
              return message.channel.send(`No results found for **${query}**!`);
          } else {
              return message.channel.send(`No results found for **${query}**!`);
          }
})
  }
  };