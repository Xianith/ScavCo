import React, { Component } from 'react';
import { render } from 'react-dom';

const Discord = require("discord.js")
const Bot = new Discord.Client()
var prefix = "!"

const Webhook = require("webhook-discord")
const Hook = new Webhook("https://discordapp.com/api/webhooks/418874488638275584/5jk20FCbzs42GXX_UoDj_LMxuCj4kG_6o9wKt0MP5L26WpmOHsoMKOKu8ezmgMJpfue7")

Bot.on("ready", () => {
  Hook.success(Bot.user.username,"Bot is online and ready in "+Bot.guilds.size+" servers")
})

Bot.on("message", (msg) => {

  if(msg.content.startsWith(prefix + "ping")){
  Hook.info(Bot.user.username, msg.author.username + " executed "+msg.cleanContent+" in "+msg.guild.name)
}

})

Bot.on("error",(e) => {
Hook.error(Bot.user.username, e)
})

Bot.on("warn",(w) => {
  Hook.warn(Bot.user.username,"Warning: `"+w+"`")
})

Bot.login("token").then(() => {
  Hook.info("Bot Daemon","Logged in")
})
