// Script ori by YuukiModz
// Base ori by Lol-Human

require("../config.js")

const Func = require("../lib/function/function")
const cons = require("../lib/function/console")
const _help = require("./menu")
const Tele = require("telegraf")
const chalk = require("chalk")
const util = require("util")
const os = require("os")
const fs = require("fs")

if (bot.token == '') {
	return console.log("=== BOT TOKEN CANNOT BE EMPTY ===")
}
const Bot = new Tele.Telegraf(bot.token)

Bot.on('message', async (Ror) => {
	try {
		var body = Ror.message.text || Ror.message.caption || ''
		comm = body.trim().split(' ').shift().toLowerCase()
		cmd = false;
		var prefix = bot.prefix;
		if (prefix != '' && body.startsWith(prefix)) {
			cmd = true;
			comm = body.slice(1).trim().split(' ').shift().toLowerCase()
		}
		var args = body.trim().split(/ +/).slice(1) 
		var user = Func.getUser(Ror.message.from)
		var m = Ror.message.message_id;
		var groupName = Ror.message.chat.title;
		
		// For Options
		var isGroup = Ror.chat.type.includes("group")
		var isPrivate = Ror.chat.type.includes("private")
		var isOwner = Ror.from.username.includes(info.ownerUsername) ? true : false
		var isCmd = body.startsWith(prefix)
		
		var command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
		
		// Numpang Dikit :v
		cons.console(Ror, body, isGroup, cmd, user, groupName);
		cons.callback_query(Bot, Func, _help);
		Func.starting(Bot, Func, _help);
		Func.helping(Bot, Func, _help);

		// For Message
		const shiro = async (text, quoted, extra) => {
			return Ror.sendMessage(text, { reply_to_message_id: quoted, ...extra })
		} 
		switch(command) { // Isi fitur di sini aja ngab
		// ====== Main Menu ====== //
			case "test": {
				ror("Bot Berjalan Dengan Baik...")
			}
			break;
			case "start": {
				await _help.start(Ror, user.first_name);
			}
			break;
			case "menu": {
				await shiro('Loading, Please wait...', m)
				await _help.menu(Ror)
			}
			break;
			// ====== Download Menu ====== //
			case "tiktokdl": {
				//return Ror("Maintenance...")
				if (!args[0]) return ror("Linknya mana cuy?", m)
				await shiro("Loading, Please wait...", m)
				api = await (await fetch(`https://api.botcahx.eu.org/api/download/tiktokslide?url=${args}&apikey=${Key.cahx}`)).json();
				res = api.result.data;
				capt = `乂  Downloader From Tiktok

   • Author : ${res.author.nickname}
   • Play Count : ${res.play_count}
   • Duratiion : ${res.duration}
   • Comment Count : ${res.comment_count}
   • Download Count : ${res.download_count}
   • Share Count : ${res.share_count}
   • Description : ${res.title}

${bot.name}`
				await Ror.replyWithVideo({ url: res.play }, { caption: capt, reply_to_message_id: m })
			}
			break;
			case "ig": case "igdl": {
				await shiro("Maintenance...", m)
			}
			break;
			
			case ">": {
				if (!isOwner) return;
				var evalCmd = '';
				try {
					evalCmd = /await/i.test(body.slice(2)) ? await eval("(async() => { " + body.slice(2) + " })()") : eval(body.slice(2));
				} catch (e) {
					evalCmd = e;
				}
				try {
					let result = await new Promise((resolve) => resolve(evalCmd));
					Ror(util.format(result));
				} catch (err) {
					Ror(util.format(err));
				}
			}
			break;

		} // Jangan di hapus ataupun di ubah posisinya
		// Kalo gamau error maybe 
	} catch (err) {
		Ror.reply(util.format(err), { reply_to_message_id: m })
	}
})

// Gausah di Apa - Apain
// Kalo Gamau Error Tod !!!
Bot.launch({ dropPendingUpdates: true })
Bot.telegram.getMe().then((getme) => {
	itsPrefix = bot.prefix != '' ? bot.prefix : 'No Prefix'
	console.log(chalk.greenBright(' ===================================================='))
	console.log(chalk.greenBright(' │ + Owner    : ' + info.ownerUsername || ''))
	console.log(chalk.greenBright(' │ + Bot Name : ' + getme.first_name || ''))
	console.log(chalk.greenBright(' │ + Version  : ' + info.version || ''))
	console.log(chalk.greenBright(' │ + Host     : ' + os.hostname() || ''))
	console.log(chalk.greenBright(' │ + Platfrom : ' + os.platform() || ''))
	console.log(chalk.greenBright(' │ + Prefix   : ' + itsPrefix))
	console.log(chalk.greenBright(' ===================================================='))
	console.log(chalk.whiteBright('╭─── [ LOG ]'))
})
process.on("unhandledRejection", (err) => console.error(err))
process.once('SIGINT', () => Bot.stop('SIGINT'))
process.once('SIGTERM', () => Bot.stop('SIGTERM'))

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
