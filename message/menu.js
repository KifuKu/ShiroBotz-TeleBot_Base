// Script ori by YuukiModz
// Base ori by Lol-Human

require("../config.js")

const fs = require("fs")
const chalk = require("chalk")
const p = bot.prefix;

exports.start = async(Ror, name) => {
	text =`👋 Hello ${name},
Im a multifunction Bot build with ❤️ By My Master YuukiModz.`
	await Ror.replyWithMarkdown(text, { disable_web_page_preview: true })
}

exports.menu = (Ror) => {
	m = Ror.message.message_id;
	text = `Hi, Saya adalah bot Telegram yang di buat oleh Author Saya (YuukiModz), Jika terdapat error pada bot ini, Silahkan contact owner saya ${info.ownerLink}
	
Bot ini sedang dalam masa percobaan, jika terjadi error, harap jangan spam botnya agar tidak terjadi pelanggaran terhadap Bot.

乂 Menu Downloader

 • ${p}tiktokdl
 • ${p}igdl
 
${bot.name}`

	var replyMarkup = {
		reply_markup: {
			inline_keyboard: [
				[{ text: "Dashboard", callback_data: 'uraa' }],
				[{ text: "Creator Bot", callback_data: "uraa" }],
				[{ text: "Rules", callback_data: "uraa" }]
				]
			}
		}
	return Ror.replyWithPhoto({ url: "https://telegra.ph/file/c55fc50bbb263d435c011.jpg" }, { caption: text, reply_to_message_id: m, ...replyMarkup })
}


let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})