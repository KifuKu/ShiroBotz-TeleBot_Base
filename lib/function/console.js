// Script ori YuukiModz
// Base by Lol-Human

const chalk = require("chalk")

exports.console = (Ror, body, isGroup, isCmd, user, groupName) => {
	var isImage = Ror.message.hasOwnProperty('photo');
	var isVideo = Ror.message.hasOwnProperty('video');
	var isAudio = Ror.message.hasOwnProperty('audio');
	var isSticker = Ror.message.hasOwnProperty('sticker');
	var isContact = Ror.message.hasOwnProperty('contact');
	var isLocation = Ror.message.hasOwnProperty('location');
	var isDocument = Ror.message.hasOwnProperty('document');
	var isAnimation = Ror.message.hasOwnProperty('animation');
	var isMedia = isImage || isVideo || isAudio || isSticker || isContact || isLocation || isDocument || isAnimation
	
	var quotedMessage = Ror.message.reply_to_message || {};
	var isQuotedImage = quotedMessage.hasOwnProperty('photo');
	var isQuotedVideo = quotedMessage.hasOwnProperty('video');
	var isQuotedAudio = quotedMessage.hasOwnProperty('audio');
	var isQuotedSticker = quotedMessage.hasOwnProperty('sticker');
	var isQuotedContact = quotedMessage.hasOwnProperty('contact');
	var isQuotedLocation = quotedMessage.hasOwnProperty('location');
	var isQuotedDocument = quotedMessage.hasOwnProperty('document');
	var isQuotedAnimation = quotedMessage.hasOwnProperty('animation');
	var isQuoted = Ror.message.hasOwnProperty('reply_to_message');
	
	var typeMessage = body.substr(0, 50).replace(/\n/g, '');
	if (isImage) typeMessage = 'Image';
	else if (isVideo) typeMessage = 'Video';
	else if (isAudio) typeMessage = 'Audio';
	else if (isSticker) typeMessage = 'Sticker';
	else if (isContact) typeMessage = 'Contact';
	else if (isLocation) typeMessage = 'Location';
	else if (isDocument) typeMessage = 'Document';
	else if (isAnimation) typeMessage = 'Animation';
	
	// For Console Cuy :')
	if (!isGroup && !isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ PRIVATE ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name))
	
	if (!isGroup && isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ COMMAND ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name))
	
	if (isGroup && isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ COMMAND ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name), chalk.greenBright('in'), chalk.whiteBright(groupName))

}

exports.callback_query = async(Bot, Func, _help) => {
	Bot.on('callback_query', async (Ror) => {
		cb_data = Ror.callbackQuery.data.split('-');
		user_id = Number(cb_data[1]);
		if (Ror.callbackQuery.from.id != user_id) return Ror.answerCbQuery('Sorry, You do not have the right to access this button.', { show_alert: true })
		callback_data = cb_data[0];
		user = Func.getUser(Ror.callbackQuery.from);
		var isGroup = Ror.chat.type.includes('group')
		var groupName = isGroup ? Ror.chat.title : '';
		
		// For Console Mybe :')
		if (!isGroup) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ ACTIONS ]'), chalk.whiteBright(callback_data), chalk.greenBright('from'), chalk.whiteBright(user.full_name))
		
		if (isGroup) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ ACTIONS ]'), chalk.whiteBright(callback_data), chalk.greenBright('from'), chalk.whiteBright(user.full_name), chalk.greenBright('in'), chalk.whiteBright(groupName))
		
		if (callback_data == 'help') return _help.menu(Ror)
		await _help.menu(Ror)
	})
}
