// Script ori by YuukiModz
// Base ori by Lol-Human
// Thanks to Lol-Human and YuukiModz

const fs = require("fs")
const chalk = require("chalk")

global.bot = { // For Settingan Bot
	token: '',
	name: "ShiroBotz - MD",
	prefix: "/"
}

global.info = {
	ownerName: "YuukiModz",
	ownerUsername: "Fake_Smileys_886",
	ownerLink: "https://t.me/Fake_Smileys_886",
	botName: "ShiroBotz - MD",
	version: JSON.parse(fs.readFileSync("./package.json")).version
}

global.Key = {
	alyachan: "", // Apikey Webshite alyachan.pro
	cahx: "" // Apikey webshite botcahx
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})

