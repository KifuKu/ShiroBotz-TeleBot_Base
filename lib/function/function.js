// Sc ori by YuukiModz
// Base by Lol-Human

exports.getArgs = (ctc) => {
	try {
		args = ctx.message.text;
		args = args.split(' ');
		args.shift;
		return args;
	} catch {
		return []
	}
}

exports.getUser = (ctx) => {
	try {
		user = ctx;
		last_name = user["last_name"] || '';
		full_name = user.first_name + ' ' + last_name;
		user["full_name"] = full_name.trim();
		return user;
	} catch (e) {
		throw e
	}
}

exports.starting = (Bot, Func, _help) => {
	Bot.command('start', async(ror) => {
		user = Func.getUser(ror.message.from);
		await _help.menu(ror);
		await ror.deleteMessage();
	})
}

exports.helping = (Bot, Func, _help) => {
	Bot.command('help', async (ror) => {
		user = Func.getUser(ror.message.from);
		await _help.menu(ror)
	})
}
