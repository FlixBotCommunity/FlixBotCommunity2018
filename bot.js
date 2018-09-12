const Discord = require('discord.js');
const flix = new Discord.Client();
const fs = require('fs');
const ms = require('ms');
const moment = require('moment');
const prefix = '$';

flix.on('ready', () => {
	console.log('')
	console.log('')
	console.log('╔[═════════════════════════════════════════════════════════════════]╗')
	console.log(` [Start] ${new Date()}`)
	console.log('╔[═════════════════════════════════════════════════════════════════]╗')
	console.log('')
	console.log('╔[═════════════════════════════════════════════════════════════════]╗')
	console.log('')
	console.log('╔[═════════════════]╗')
	console.log(`${flix.user.username} Is Online.`)
	console.log('╔[═════════════════]╗')
	console.log('')
	console.log(`╔[ Logged in as * [ " ${flix.user.username} " ] ]╗`);
	console.log('')
	console.log('=[ Informations :]╗')
	console.log('')
	console.log(`╔[ Servers [ " ${flix.guilds.size} " ]╗`);
	console.log(`╔[ Users [ " ${flix.users.size} " ]╗`);
	console.log(`╔[ Channels [ " ${flix.channels.size} " ]╗`);
	console.log(`╔[ Bot ID [ " #${flix.user.id} " ]╗`);
	console.log(`╔[ Bot Tag [ " #${flix.user.discriminator} " ]╗`);
	console.log('╔[═════════════════════════════════════════════════════════════════]╗')
	console.log('')
	console.log('')
	console.log('╔[═════════════════════════════╗ Log ╔═════════════════════════════]╗')

    var Words = ['www.Flix-Host.com', 'FlixCommunity', `${prefix}sug`, 'More Soon.'];
    var Alpha1 = -1;
    var Alpha2 = 0;

    setInterval(function () {
		if(Alpha1 == -1) {
			Alpha2 = 1;
		}
		if(Alpha1 == (Words.length)-1) {
			Alpha2 = -1;
		}
		Alpha1 = Alpha1 + Alpha2;
		flix.user.setActivity(Words[Alpha1]);
	}, 150000);
});

flix.on('message', async function(message) {
	
	if(message.author.bot) return;
	if(message.channel.type === 'dm') return;
	
	var command = message.content.toLowerCase().split(" ")[0];
	var args = message.content.toLowerCase().split(' ');
	
	if(command == prefix + 'sug') {
		var sugChannel = message.guild.channels.find(c => c.id === '485880203827085322');
		
		if(!args) return message.channel.send(`**➥ Useage:** ${prefix}sug <SUG>`);
		if(args.lenght > 1500) return message.channel.send(`:no_entry: | اقتراحك **${args.length}** حرف! جرب بأقل من **1500** حرف`);
		
		var sugS = new Discord.RichEmbed()
		.setTitle('الاقتراح:')
		.setColor('RED')
		.setDescription(`**${args}**`)
		.setFooter(':no_entry: اذا كان الاقتراح طلب لحساب او لعب بالامر سوف تحاسب من قبل الادارة', message.author.avatarURL)
		
		message.channel.send(sugS).then(msgSu2 => {
			message.channel.send('__هل أنت متأكد أنك تريد ارسال اقتراحك الى روم الاقتراحات؟__').then(msgSu => {
				msgSu.react('✅').then(() => msgSu.react('❎'))
				
				let yes = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
				let no = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
				
				let yesSend = msgSu.createReactionCollector(yes);
				let dontSend = msgSu.createReactionCollector(no);
				
				yesSend.on('collect', r => {
					var sugD = new Discord.RichEmbed()
					.setColor('GREEN')
					.setDescription(`**تم ارسال اقتراحك بنجاح!**`)
					
					message.channel.send(sugD).then(msg => msg.delete(5000));
					
					msgSu.delete();
					msgSu2.delete();
					
					var newSug = new Discord.RichEmbed()
					.setTitle(`**:bell: اقــــــتـــراح جـــــديــــــد :bell:**`)
					.setThumbnail(message.author.avatarURL)
					.setColor('GREEN')
					.setDescription(`**➥ From:**\n<@${message.author.id}>\n\n**➥ Suggestion:**\n${args}`)
					.setTimestamp()
					.setFooter(message.author.tag, message.author.avatarURL)
					
					sugChannel.send(newSug).then(msg => {
						msg.react('👍').then(() => msg.react('👎'));
					})
				});
				dontSend.on('collect', r => {
					message.reply(`:no_entry: | <@${message.author.id}> تم الغاء اقتراحك بنجاح`).then(msg => msg.delete(5000));
					msgSu.delete();
					msgSu2.delete();
				})
			})
		})
	}
});


flix.on('guildMemberAdd', member => {
	if(datediff(parseDate(moment(member.user.createdTimestamp).format('l')), parseDate(moment().format('l'))) < 1) {
		member.guild.member(member).ban({ reason: 'The Account Was Created Less Then 1 Day' });
	};
});
function parseDate(str) {
	var mdy = str.split('/');
	return new Date(mdy[2], mdy[0]-1, mdy[1]);
};
function datediff(first, second) {
	return Math.round((second-first)/(1000*60*60*24));
};

flix.login(process.env.BOT_TOKEN);
