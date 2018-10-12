const Discord = require('discord.js');
const flix = new Discord.Client();
const fs = require('fs');
const ms = require('ms');
const moment = require('moment');
const prefix = '$';
const devs = ['346629187504832513'];

var cds = new Set();
var cdv = new Set();

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
	console.log(`╔[ Bot ID [ " ${flix.user.id} " ]╗`);
	console.log(`╔[ Bot Tag [ " #${flix.user.discriminator} " ]╗`);
	console.log('╔[═════════════════════════════════════════════════════════════════]╗')
	console.log('')
	console.log('')
	console.log('╔[═════════════════════════════╗ Log ╔═════════════════════════════]╗')

    var Words = ['www.Flix-Host.com', 'FlixCommunity'];
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
	setInterval(() => {
		flix.guilds.find(g => g.id === '428690920246870016').members.filter(m => m.user.username.startsWith('!- Flix |') && m.roles.has(flix.guilds.find(g => g.id === '428690920246870016').roles.find(r => r.name === '• FlixCommunity').id)).forEach(m => {
			m.addRole(flix.guilds.find(g => g.id === '428690920246870016').roles.find(r => r.name === '• Flix').id);
		});
		flix.guilds.find(g => g.id === '428690920246870016').members.filter(m => !m.user.username.startsWith('!- Flix |') && m.roles.has(flix.guilds.find(g => g.id === '428690920246870016').roles.find(r => r.name === '• Flix').id)).forEach(m => {
			m.removeRole(flix.guilds.find(g => g.id === '428690920246870016').roles.find(r => r.name === '• Flix').id);
		});
	}, 15000);
});

flix.on('message', async function(message) {
	if(message.author.bot) return;
	if(message.channel.type === 'dm') return;
	
	var command = message.content.toLowerCase().split(" ")[0];
	var args = message.content.toLowerCase().split(' ');
	var args1 = args.slice(1).join(' ');
	var userM = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.id === args[1]));
	
	
	if(command == prefix + 'verify') {
		var flixRole = message.guild.roles.find(r => r.name == '• FlixCommunity');
		var numbers = ['4857', '5363', '8249', '5367', '1317', '5386', '4536', '0683', '3353', '2467', '2462', '5424', '6284', '8274', '4688', '8278', '2874', '8927', '1356', '8927', '2764', '7653', '5842', '4483', '2579', '6326', '2562', '4762', '1794', '0984', '2874', '8234', '7265', '7644', '7442', '0145', '2758', '2785', '8725', '8258', '8975', '8624', '2785', '2775', '9835'];
		var numbers2 = ['4857', '5363', '8249', '5367', '1317', '5386', '4536', '0683', '3353', '2467', '2462', '5424', '6284', '8274', '4688', '8278', '2874', '8927', '1356', '8927', '2764', '7653', '5842', '4483', '2579', '6326', '2562', '4762', '1794', '0984', '2874', '8234', '7265', '7644', '7442', '0145', '2758', '2785', '8725', '8258', '8975', '8624', '2785', '2775', '9835'];
		
		if(message.channel.id !== '495499134669684746') return;
		if(message.member.roles.has(flixRole.id)) return message.delete();
		if(cdv.has(message.author.id)) return message.delete();
		
		var x = Math.floor(Math.random() * numbers.length);
		
		cdv.add(message.author.id);
		message.delete();
		message.channel.send(`:robot: | <@${message.author.id}> الرجاء قم بكتابة الرقم التالي **${numbers[x]}** معك 10 ثواني قبل الالغاء`).then(msg => {
			var filter = message.channel.awaitMessages(msgs => msgs.author.id === message.author.id && msgs.content == numbers2[x], { max: 1, time: 10000, errors: ['time'] });
			filter.catch(err => {
				cdv.delete(message.author.id);
				msg.delete();
				message.channel.send(`:x: | <@${message.author.id}> لم تكتب الرقم بالوقت المناسب`).then(msge => msge.delete(5000));
			});
			filter.then(msg2 => {
				cdv.delete(message.author.id);
				msg.delete();
				message.guild.member(message.author).addRole(flixRole.id);
				message.author.send(':white_check_mark: | Successfully verifed your account.');
			});
		});
	}
	
	
	if(message.channel.id === '495499134669684746') {
		if(!message.content.startsWith(prefix + 'verify')) {
			message.delete();
		}
	}
	
	
	if(command == prefix + 'sug') {
		if(!message.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
		var sugChannel = message.guild.channels.find(c => c.id === '485880203827085322');
		
		if(!sugChannel) return message.channel.send(':no_entry: | لا يوجد روم للاقتراحات');
		if(cds.has(message.author.id)) return message.channel.send(`:no_entry: | <@${message.author.id}> يجب عليك الانتظار 5 دقائق`);
		if(!args1) return message.channel.send(`**➥ Useage:** ${prefix}sug <SUG>`);
		if(args1.length > 1000) return message.channel.send(`:no_entry: | اقتراحك **${args1.length}** حرف! جرب بأقل من **1000** حرف`).then(msg => message.delete());
		
		message.delete();
		
		var sugS = new Discord.RichEmbed()
		.setTitle('الاقتراح:')
		.setColor('RED')
		.setDescription(`**${args1}**`)
		.setFooter('NOTE: اذا كان الاقتراح طلب لحساب او لعب بالامر سوف تحاسب من قبل الادارة', message.author.avatarURL)
		
		message.channel.send(sugS).then(msgSu2 => {
			message.channel.send('__هل أنت متأكد أنك تريد ارسال اقتراحك الى روم الاقتراحات؟__').then(msgSu => {
				msgSu.react('✅').then(() => msgSu.react('❎'))
				
				let yes = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
				let no = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
				
				let yesSend = msgSu.createReactionCollector(yes);
				let dontSend = msgSu.createReactionCollector(no);
				
				yesSend.on('collect', r => {
					cds.add(message.author.id);
					
					var sugD = new Discord.RichEmbed()
					.setColor('GREEN')
					.setDescription(`:white_check_mark: | <@${message.author.id}> **تم ارسال اقتراحك بنجاح!**`)
					
					message.channel.send(sugD).then(msg => msg.delete(5000));
					
					msgSu.delete();
					msgSu2.delete();
					
					var newSug = new Discord.RichEmbed()
					.setTitle(`**:bell: اقــــــتـــراح جـــــديــــــد :bell:**`)
					.setThumbnail(message.author.avatarURL)
					.setColor('GREEN')
					.setDescription(`**➥ From:**\n<@${message.author.id}>\n\n**➥ Suggestion:**\n${args1}`)
					.setTimestamp()
					.setFooter(message.author.tag, message.author.avatarURL)
					
					sugChannel.send(newSug);
				});
				dontSend.on('collect', r => {
					message.channel.send(`:no_entry: | <@${message.author.id}> تم الغاء اقتراحك بنجاح`).then(msg => msg.delete(5000));
					msgSu.delete();
					msgSu2.delete();
				})
			})
		})
		setTimeout(() => {
			cds.delete(message.author.id);
		}, 300000);
	}
	
	
	if(command == prefix + 'server') {
		if(!message.guild.member(flix.user).hasPermission('ADMINISTRATOR')) return;
		
		var botCount = message.guild.members.filter(m => m.user.bot).size;
		var memberCount = message.guild.memberCount - botCount;
		var memberOnline = message.guild.members.filter(m=>m.presence.status == 'online').size + message.guild.members.filter(m=>m.presence.status == 'idle').size + message.guild.members.filter(m=>m.presence.status == 'dnd').size;

		if(!message.guild.member(flix.user).hasPermission('EMBED_LINKS')) return message.channel.send(':no_entry: | I dont have **EMBED_LINKS** Permission!');
		if(!message.guild.member(flix.user).hasPermission('VIEW_AUDIT_LOG')) return message.channel.send(':no_entry: | I dont have **VIEW_AUDIT_LOG** Permission!');
		message.guild.fetchBans().then(bans => {
			var bansSize = bans.size;

			if(message.guild.verificationLevel === 0) {
				var vLvl = 'Very Easy';
			}else if(message.guild.verificationLevel === 1) {
				var vLvl = 'Easy';
			}else if(message.guild.verificationLevel === 2) {
				var vLvl = 'Medium';
			}else if(message.guild.verificationLevel === 3) {
				var vLvl = 'Hard';
			}else if(message.guild.verificationLevel === 4) {
				var vLvl = 'Very Hard';
			}

			var serverInfo = new Discord.RichEmbed()
			.setColor('AQUA')
			.setThumbnail(message.guild.iconURL)
			.setDescription(`**INFORMATION SERVER:**\n\n:chart_with_upwards_trend: Server Name: \`\`${message.guild.name}, ${message.guild.id}\`\`\n:crown: Server Owner: \`\`${message.guild.owner.user.tag}, ${message.guild.owner.user.id}\`\`\n:satellite: Server Type: \`\`${message.guild.region}\`\`\n:date: Server Created At: \`\`${Days(message.guild.createdAt)}\`\`\n:shield: Verification Level: \`\`${vLvl}\`\`\n\n**OTHER INFORMATIONS:**\n\n:busts_in_silhouette: Members: \`\`${memberCount} Members.\`\`\n:robot: Bots: \`\`${botCount} Bots.\`\`\n:green_heart: Online: \`\`${memberOnline} Members.\`\`\n:black_heart: Offline: \`\`${message.guild.members.filter(m => m.presence.status == 'offline').size} Members.\`\`\n:bust_in_silhouette: Last Member: \`\`${Array.from(message.channel.guild.members.values()).sort((a, b) => b.joinedAt - a.joinedAt).map(m => `${m.user.tag}, ${m.id}`).splice(0, 1)}\`\`\n:bar_chart: Channels: \`\`Total ${message.guild.channels.size}\`\` **|** \`\`${message.guild.channels.filter(c => c.type === 'category').size} Categores\`\` **|**  \`\`${message.guild.channels.filter(c => c.type === 'voice').size} Voice\`\` **|** \`\`${message.guild.channels.filter(c => c.type === 'text').size} Text\`\`\n:first_place: Roles: \`\`${message.guild.roles.size} Roles.\`\`\n:name_badge: Bans: \`\`${bansSize} Bans.\`\``)
			.setTimestamp()
			.setFooter(message.author.tag, message.author.avatarURL)

			message.channel.send(serverInfo);
		})
	}
	
	
	if(command == prefix + 'bot') {
		if(!message.guild.member(flix.user).hasPermission('EMBED_LINKS')) return message.channel.send(':no_entry: | I dont have **EMBED_LINKS** Permission!');
		
		var botInfo = new Discord.RichEmbed()
		.setTitle(`:books: Informations about **${flix.user.tag}**`)
		.setThumbnail(flix.user.avatarURL)
		.setColor('AQUA')
		.setDescription(`__\n__**INFORMATIONS BOT:**\n\n**Bot ID:** \`\`${flix.user.id}\`\`\n**Bot Tag:** \`\`#${flix.user.discriminator}\`\`\n**Bot Ping:** \`\`${flix.pings[0]}ms\`\`\n**Bot Prefix:** \`\`${prefix}\`\`\n**Bot Created at:** \`\`${Days(flix.user.createdAt)}\`\`\n\n**INFORMATIONS GUILDS BOT:**\n\n**Guilds:** \`\`${flix.guilds.size} Guild.\`\`\n**Channels:** \`\`${flix.channels.size} Total\`\` **|** \`\`${flix.channels.filter(c => c.type === 'category').size} Categores\`\` **|** \`\`${flix.channels.filter(c => c.type === 'voice').size} Voice\`\` **|** \`\`${flix.channels.filter(c => c.type === 'text').size} Text\`\`\n**Users:** \`\`${flix.users.size} Total\`\` **|** \`\`${flix.users.filter(m => m.presence.status === 'online').size + flix.users.filter(m => m.presence.status === 'idle').size + flix.users.filter(m => m.presence.status === 'dnd').size} Online\`\` **|** \`\`${flix.users.filter(m => m.presence.status === 'offline').size} Offline\`\``)
		.setTimestamp()
		.setFooter(message.author.tag, message.author.avatarURL)
		
		message.channel.send(botInfo);
	}
	
	
	if(command == prefix + 'uptime') {
		let uptime = flix.uptime;

		let days = 0;
		let hrs = 0;
		let min = 0;
		let sec = 0;
		let nc = true;

		while(nc) {
			if(uptime >= 8.64e+7) {
				days++;
				uptime -= 8.64e+7;
				}else if(uptime >= 3.6e+6) {
					hrs++;
					uptime -= 3.6e+6;
					}else if(uptime >= 60000) {
						min++;
						uptime -= 60000;
						}else if(uptime >= 1000) {
							sec++;
							uptime -= 1000;
						}
						if(uptime < 1000)  nc = false;
		}
		message.channel.send(`\`\`${days} days, ${hrs} hrs, ${min} min, ${sec} sec\`\``);
	}
	
	
	if(command == prefix + 'ping') {
		if(!message.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
		
		let pingEmbed = new Discord.RichEmbed()
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setColor('RANDOM')
		.addField('**Time Taken:**', `${Date.now() - message.createdTimestamp}ms :signal_strength:`)
		.addField('**WebSocket:**', `${flix.pings[0]}ms :signal_strength:`)

		message.channel.send('Pong ..').then(msg => msg.edit(pingEmbed));
	}
	
	
	if(command == prefix + 'setname') {
		if(!devs.includes(message.author.id)) return;
		if(!args1) return message.channel.send(`**➥ Useage:** ${prefix}setname \`\`Bot Name\`\``);
		if(args1 === flix.user.username) return message.channel.send(':no_entry: | This name is already used for the bot');
		if(args1.length > 15) return message.channel.send(':no_entry: | The name must less then 15 characters');

		flix.user.setUsername(args1).catch(err => {
			if(err) {
				message.channel.send(':no_entry: | **ERROR:** You can change the name of the bot twice every hour');
			}
		})
		message.channel.send(`:white_check_mark: | Successfully \`\`CHANGE\`\` The name of the bot to **${args1}**`);
	}
	
	
	if(command == prefix + 'discrim') {
		if(!message.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
		
		if(args[1]) {
			var Tag = args[1];
		}else if(!args[1]) {
			var Tag = message.author.discriminator;
		}
		var membersTag = flix.users.filter(m => m.discriminator == Tag);
		if(args[1] && isNaN(args[1])) return message.channel.send(`:no_entry: | The tag must be a number. Please type like this: \`\`${prefix}discrim 0001\`\``);
		if(args[1] && args[1].length !== 4) return message.channel.send(`:no_entry: | I cant find this tag. Please type like this: \`\`${prefix}discrim 0001\`\``);
		if(membersTag.size < 1) return message.channel.send(`:no_entry: | I cant find any user have this tag \`\`${Tag}\`\``);
		
		var number = 1;
		
		let discrim = new Discord.RichEmbed()
		.setTitle(`:white_check_mark: **${membersTag.size}** Members have this tag **${Tag}**`)
		.setColor('GREEN')
		.setDescription('__\n__' + membersTag.map(m => `**${number++}.** \`\`${m.tag}\`\``).slice(0, 10).join('\n'))
		.setTimestamp()
		.setFooter(message.author.tag, message.author.avatarURL)
		
		message.channel.send(discrim);
	}
	
	
	if(command == prefix + 'bc') {
		if(!message.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
		if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':no_entry: | You dont have **ADMINISTRATOR** Permission!');
		
		if(!message.guild.member(flix.user).hasPermission('EMBED_LINKS')) return message.channel.send(':no_entry: | I dont have **EMBED_LINKS** Permission!');
		
		let bcCommand = new Discord.RichEmbed()
		.setTitle(':white_check_mark: **BroadCast Command.**')
		.setColor('GREEN')
		.setDescription(`**\n${prefix}bc <MESSAGE>**\n➥ \`\`Send for all members the message.\`\`\n\n**${prefix}bc <ROLE> <MESSAGE>**\n➥ \`\`Send the message to members have the role selected.\`\`\n\n**${prefix}bc admins <MESSAGE>**\n➥ \`\`Send the message to members have ADMINISTRATOR permission.\`\`\n\n**${prefix}bc members <MESSAGE>**\n➥ \`\`Send the message to members not have ADMINISTRATOR permission.\`\``)
		.setTimestamp()
		.setFooter(message.author.tag, message.author.avatarURL)
		
		if(!args[1]) return message.channel.send(bcCommand);
		
		var getRole = message.mentions.roles.first() || message.guild.roles.find(r => r.id === args[1]) || message.guild.roles.find(r => r.name.toLowerCase().includes(args[1]));
		
		if(args[1] === 'admins' || args[1] === 'members' || getRole) {
			var argsM = message.content.split(' ').slice(2).join(' ');
		}else if(args[1] !== 'admins' || args[1] !== 'members' || !getRole) {
			var argsM = message.content.split(' ').slice(1).join(' ');
		}
		
		if(args[1] === 'admins' || args[1] === 'members') {
			if(args[1] === 'admins') {
				var admin = message.guild.members.filter(m => m.hasPermission('ADMINISTRATOR') && !m.user.bot);
				if(admin.size <= 1) return message.channel.send(':no_entry: | No admins in this server!');
				
				let notArgsM = new Discord.RichEmbed()
				.setTitle(':white_check_mark: **BroadCast Command.** (ADMINISTRATOR)')
				.setColor('GREEN')
				.setDescription(`**\n${prefix}bc admins <MESSAGE>**\n➥ \`\`Send the message to members have ADMINISTRATOR permission.\`\``)
				.setTimestamp()
				.setFooter(message.author.tag, message.author.avatarURL)
				
				if(!argsM) return message.channel.send(notArgsM);
				
				let adminMsg = new Discord.RichEmbed()
				.setTitle(':white_check_mark: **BroadCast Command.** (ADMINISTRATOR)')
				.setColor('GREEN')
				.setDescription(`**\n**:red_circle: Are you sure to send the message to **${admin.size}** Admins?\n\n**➥ Message:**\n${argsM}`)
				.setTimestamp()
				.setFooter(message.author.tag, message.author.avatarURL)
				
				message.channel.send(adminMsg).then(msgB => {
					msgB.react('✅').then(() => msgB.react('❎'))
					
					let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
					let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
					let send = msgB.createReactionCollector(sendR);
					let dontSend = msgB.createReactionCollector(dontSendR);
					
					send.on('collect', r => {
						msgB.delete();
						message.channel.send(`:timer: | Wait some time to send the message to **${admin.size}** Admins ...`).then(msg => {
							admin.forEach(async a => {
								let bcMessage = new Discord.RichEmbed()
								.setTitle(`:loudspeaker: ${a.user.username}`)
								.setColor('GREEN')
								.addField(':pencil: **Sender:**', message.author.username, true)
								.addField(':globe_with_meridians: **Server:**', message.guild.name, true)
								.addField(':scroll: **Message:**', argsM.replace('[user]', a))
								.setTimestamp()
								.setFooter(message.author.tag, message.author.avatarURL)
								
								a.send(bcMessage)
								await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${admin.size}** Admins!`);
							})
						})
					})
					dontSend.on('collect', r => {
						msgB.delete();
						message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
					})
				})
			}else if(args[1] === 'members') {
				var member = message.guild.members.filter(m => !m.hasPermission('ADMINISTRATOR') && !m.user.bot);
				if(member.size === 0) return message.channel.send(':no_entry: | No members in this server!');
				
				let notArgsM = new Discord.RichEmbed()
				.setTitle(':white_check_mark: **BroadCast Command.** (MEMBER)')
				.setColor('GREEN')
				.setDescription(`**\n${prefix}bc members <MESSAGE>**\n➥ \`\`Send the message to members not have ADMINISTRATOR permission.\`\``)
				.setTimestamp()
				.setFooter(message.author.tag, message.author.avatarURL)
				
				if(!argsM) return message.channel.send(notArgsM);
				
				let memberMsg = new Discord.RichEmbed()
				.setTitle(':white_check_mark: **BroadCast Command.** (MEMBER)')
				.setColor('GREEN')
				.setDescription(`**\n**:red_circle: Are you sure to send the message to **${member.size}** Members?\n\n**➥ Message:**\n${argsM}`)
				.setTimestamp()
				.setFooter(message.author.tag, message.author.avatarURL)
				
				message.channel.send(memberMsg).then(msgB => {
					msgB.react('✅').then(() => msgB.react('❎'))
					
					let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
					let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
					let send = msgB.createReactionCollector(sendR);
					let dontSend = msgB.createReactionCollector(dontSendR);
					
					send.on('collect', r => {
						msgB.delete();
						message.channel.send(`:timer: | Wait some time to send the message to **${member.size}** Members ...`).then(msg => {
							member.forEach(async m => {
								let bcMessage = new Discord.RichEmbed()
								.setTitle(`:loudspeaker: ${m.user.username}`)
								.setColor('GREEN')
								.addField(':pencil: **Sender:**', message.author.username, true)
								.addField(':globe_with_meridians: **Server:**', message.guild.name, true)
								.addField(':scroll: **Message:**', argsM.replace('[user]', m))
								.setTimestamp()
								.setFooter(message.author.tag, message.author.avatarURL)
								
								m.send(bcMessage)
								await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${member.size}** Members!`);
							})
						})
					})
					dontSend.on('collect', r => {
						msgB.delete();
						message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
					})
				})
			}
		}else if(getRole) {
			var membersRole = message.guild.members.filter(m => m.roles.has(getRole.id) && !m.user.bot);
			if(membersRole.size === 0) return message.channel.send(`:no_entry: | No members have **${getRole.name}** Role!`);
			
			let notArgsM = new Discord.RichEmbed()
			.setTitle(`:white_check_mark: **BroadCast Command.** (${getRole.name})`)
			.setColor('GREEN')
			.setDescription(`**\n${prefix}bc <ROLE> <MESSAGE>**\n➥ \`\`Send the message to members have the role selected.\`\``)
			.setTimestamp()
			.setFooter(message.author.tag, message.author.avatarURL)
			
			if(!argsM) return message.channel.send(notArgsM);
			
			let membersRoleMsg = new Discord.RichEmbed()
			.setTitle(`:white_check_mark: **BroadCast Command.** (${getRole.name})`)
			.setColor('GREEN')
			.setDescription(`**\n**:red_circle: Are you sure to send the message to **${membersRole.size}** Members?\n\n**➥ Message:**\n${argsM}`)
			.setTimestamp()
			.setFooter(message.author.tag, message.author.avatarURL)
			
			message.channel.send(membersRoleMsg).then(msgB => {
				msgB.react('✅').then(() => msgB.react('❎'))
				
				let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
				let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
				let send = msgB.createReactionCollector(sendR);
				let dontSend = msgB.createReactionCollector(dontSendR);
				
				send.on('collect', r => {
					msgB.delete();
					message.channel.send(`:timer: | Wait some time to send the message to **${membersRole.size}** Members ...`).then(msg => {
						membersRole.forEach(async mR => {
							let bcMessage = new Discord.RichEmbed()
							.setTitle(`:loudspeaker: ${mR.user.username}`)
							.setColor('GREEN')
							.addField(':pencil: **Sender:**', message.author.username, true)
							.addField(':globe_with_meridians: **Server:**', message.guild.name, true)
							.addField(':scroll: **Message:**', argsM.replace('[user]', mR))
							.setTimestamp()
							.setFooter(message.author.tag, message.author.avatarURL)
							
							mR.send(bcMessage)
							await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${membersRole.size}** Members!`);
						})
					})
				})
				dontSend.on('collect', r => {
					msgB.delete();
					message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
				})
			})
		}else if(args[1] !== 'admins' && args[1] !== 'members' && !getRole) {
			var allB = message.guild.members.filter(m => !m.user.bot);
			if(allB.size === 1) return message.channel.send(`:no_entry: | No members in this server!`);
			
			let allMsg = new Discord.RichEmbed()
			.setTitle(`:white_check_mark: **BroadCast Command.** (ALL)`)
			.setColor('GREEN')
			.setDescription(`**\n**:red_circle: Are you sure to send the message to **${allB.size}** Members?\n\n**➥ Message:**\n${argsM}`)
			.setTimestamp()
			.setFooter(message.author.tag, message.author.avatarURL)
			
			message.channel.send(allMsg).then(msgB => {
				msgB.react('✅').then(() => msgB.react('❎'))
				
				let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
				let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
				let send = msgB.createReactionCollector(sendR);
				let dontSend = msgB.createReactionCollector(dontSendR);
				
				send.on('collect', r => {
					msgB.delete();
					message.channel.send(`:timer: | Wait some time to send the message to **${allB.size}** Members ...`).then(msg => {
						membersRole.forEach(async m => {
							let bcMessage = new Discord.RichEmbed()
							.setTitle(`:loudspeaker: ${m.user.username}`)
							.setColor('GREEN')
							.addField(':pencil: **Sender:**', message.author.username, true)
							.addField(':globe_with_meridians: **Server:**', message.guild.name, true)
							.addField(':scroll: **Message:**', argsM.replace('[user]', m))
							.setTimestamp()
							.setFooter(message.author.tag, message.author.avatarURL)
							
							m.send(bcMessage)
							await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${allB.size}** Members!`);
						})
					})
				})
				dontSend.on('collect', r => {
					msgB.delete();
					message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
				})
			})
		}
	}
	
	
	if(command == prefix + 'role') {
		if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':no_entry: | You dont have **MANAGE_ROLES** Permission!');
		
		if(!message.guild.member(flix.user).hasPermission('MANAGE_ROLES')) return message.channel.send(':no_entry: | I dont have **MANAGE_ROLES** Permission!');
		if(!message.guild.member(flix.user).hasPermission('EMBED_LINKS')) return message.channel.send(':no_entry: | I dont have **EMBED_LINKS** Permission!');
		
		let roleCommand = new Discord.RichEmbed()
		.setTitle(':white_check_mark: Role Command.')
		.setColor('GREEN')
		.setDescription(`**\n${prefix}role <SOMEONE> <ROLE>**\n➥ \`\`For give or delete from some one the role.\`\`\n\n**${prefix}role humans add <ROLE>**\n➥ \`\`For give the humans role.\`\`\n\n**${prefix}role humans remove <ROLE>**\n➥ \`\`For delete from the humans role.\`\`\n\n**${prefix}role bots add <ROLE>**\n➥ \`\`For give the bots role.\`\`\n\n**${prefix}role bots remove <ROLE>**\n➥ \`\`For delete from the bots role.\`\`\n\n**${prefix}role all add <ROLE>**\n➥ \`\`For give all role.\`\`\n\n**${prefix}role all remove <ROLE>**\n➥ \`\`For remove from all role.\`\``)
		.setTimestamp()
		.setFooter(message.author.tag, message.author.avatarURL)

		if(!args[1]) return message.channel.send(roleCommand);
		if(!userM && args[1] !== 'humans' && args[1] !== 'bots' && args[1] !== 'all') return message.channel.send(roleCommand);

		if(userM) {
			var argsRole = args.slice(2).join(' ');
		}else if(!userM || args[1] === 'humans' || args[1] === 'bots' || args[1] === 'all') {
			var argsRole = args.slice(3).join(' ');
		}

		var getRole = message.mentions.roles.first() || message.guild.roles.find(r => r.id === argsRole) || message.guild.roles.find(r => r.name.toLowerCase().includes(argsRole));

		if(userM) {
			if(!getRole) return message.channel.send(':no_entry: | I couldn\'t find the role!');
			if(getRole.name === '@everyone') return message.channel.send(':no_entry: | I couldn\'t find the role!');
			if(getRole.position >= message.guild.member(flix.user).highestRole.position) return message.channel.send(`:no_entry: | I can\'t \`\`GIVE\`\` Or \`\`DELETE\`\` Any user have or not have **${getRole.name}** role beacuse this role highest from my role!`);
			
			if(!message.guild.member(userM.user).roles.has(getRole.id)) {
				message.guild.member(userM.user).addRole(getRole.id);
				message.channel.send(`:white_check_mark: | Successfully \`\`GIVE\`\` The role **${getRole.name}** To user **${userM.user.tag}**`);
			}else if(message.guild.member(userM.user).roles.has(getRole.id)) {
				message.guild.member(userM.user).removeRole(getRole.id);
				message.channel.send(`:white_check_mark: | Successfully \`\`DELETE\`\` The role **${getRole.name}** From user **${userM.user.tag}**`);
			}
		}else if(args[1] === 'humans') {
			let notArgs = new Discord.RichEmbed()
			.setTitle(':white_check_mark: Role Command.')
			.setColor('GREEN')
			.setDescription(`**\n${prefix}role humans add <ROLE>**\n➥ \`\`For give the humans the role.\`\`\n\n**${prefix}role humans remove <ROLE>**\n➥ \`\`For delete the role from all humans.\`\``)
			.setTimestamp()
			.setFooter(message.author.tag, message.author.avatarURL)
			
			if(!args[2]) return message.channel.send(notArgs);
			if(!args[3]) return message.channel.send(notArgs);
			if(!getRole) return message.channel.send(':no_entry: | I couldn\'t find the role!');
			if(getRole.name === '@everyone') return message.channel.send(':no_entry: | I couldn\'t find the role!');

			if(args[2] === 'add') {
				if(getRole.position >= message.guild.member(flix.user).highestRole.position) return message.channel.send(`:no_entry: | I can\'t \`\`GIVE\`\` Any User the role with name **${getRole.name}** beacuse the role highest then my role!`);
				if(message.guild.members.filter(m => !message.guild.member(m).roles.has(getRole.id) && !m.user.bot).size == 0) return message.channel.send(`:no_entry: | I can\'t find any user not have **${getRole.name}** role!`);

				let humansSure = new Discord.RichEmbed()
				.setTitle(`:red_circle: Are you sure to give **${message.guild.members.filter(m => !message.guild.member(m).roles.has(getRole.id) && !m.user.bot).size}** Humans the role **${getRole.name}**`)
				.setColor('RED')
				.setDescription('**\nYou have 1 min to choose reaction you want.**\n\n✅ = Sure, give him the role.\n\n❎ = No no, cancel.')
				.setTimestamp()
				.setFooter(message.author.tag, message.author.avatarURL)

				message.channel.send(humansSure).then(msg => {
					msg.react('✅').then(() => msg.react('❎'))

					let giveHim = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
					let dontGiveHim = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
					let give = msg.createReactionCollector(giveHim, { time: 60000 });
					let dontGive = msg.createReactionCollector(dontGiveHim, { time: 60000 });

					give.on('collect', r => {
						msg.delete();
						message.channel.send(`:timer: | Now you must wait some time to give **${message.guild.members.filter(m => !message.guild.member(m).roles.has(getRole.id) && !m.user.bot).size}** Humans the role **${getRole.name}** ...`).then(message1 => {
							message.guild.members.filter(m => !message.guild.member(m).roles.has(getRole.id) && !m.user.bot).forEach(async m => {
								message.guild.member(m).addRole(getRole.id)
								await message1.edit(`:white_check_mark: | <@${message.author.id}> Successfully give all **Humans** The role **${getRole.name}** .`);
							});
						});
					});
					dontGive.on('collect', r => {
						msg.delete();
						message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
					});
				})
			}else if(args[2] === 'remove') {
				if(getRole.position >= message.guild.member(flix.user).highestRole.position) return message.channel.send(`:no_entry: | I can\'t \`\`REMOVE\`\` The role with name **${getRole.name}** From any User beacuse the role highest then my role!`);
				if(message.guild.members.filter(m => message.guild.member(m).roles.has(getRole.id) && !m.user.bot).size == 0) return message.channel.send(`:no_entry: | I can\'t find any user have **${getRole.name}** role!`);

				let humansSure = new Discord.RichEmbed()
				.setTitle(`:red_circle: Are you sure to remove **${getRole.name}** from **${message.guild.members.filter(m => message.guild.member(m).roles.has(getRole.id) && !m.user.bot).size}** Humans?`)
				.setColor('RED')
				.setDescription('**\nYou have 1 min to choose reaction you want.**\n\n✅ = Sure, remove the role from him.\n\n❎ = No no, cancel.')
				.setTimestamp()
				.setFooter(message.author.tag, message.author.avatarURL)

				message.channel.send(humansSure).then(msg => {
					msg.react('✅').then(() => msg.react('❎'))

					let removeRole = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
					let dontRemoveRole = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
					let remove = msg.createReactionCollector(removeRole, { time: 60000 });
					let dontRemove = msg.createReactionCollector(dontRemoveRole, { time: 60000 });

					remove.on('collect', r => {
						msg.delete();
						message.channel.send(`:timer: | Now you must wait some time to delete from **${message.guild.members.filter(m => message.guild.member(m).roles.has(getRole.id) && !m.user.bot).size}** Humans the role **${getRole.name}** ...`).then(message1 => {
							message.guild.members.filter(m => message.guild.member(m).roles.has(getRole.id) && !m.user.bot).forEach(async m => {
								message.guild.member(m).removeRole(getRole.id)
								await message1.edit(`:white_check_mark: | <@${message.author.id}> Successfully remove the role **${getRole.name}** From all **Humans** .`);
							});
						});
					});
					dontRemove.on('collect', r => {
						msg.delete();
						message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
					});
				})
			}
		}else if(args[1] === 'bots') {
		let notArgs = new Discord.RichEmbed()
			.setTitle(':white_check_mark: Role Command.')
			.setColor('GREEN')
			.setDescription(`**\n${prefix}role bots add <ROLE>**\n➥ \`\`For give the bots the role.\`\`\n\n**${prefix}role bots remove <ROLE>**\n➥ \`\`For delete the role from all bots.\`\``)
			.setTimestamp()
			.setFooter(message.author.tag, message.author.avatarURL)
			
			if(!args[2]) return message.channel.send(notArgs);
			if(!args[3]) return message.channel.send(notArgs);
			if(!getRole) return message.channel.send(':no_entry: | I couldn\'t find the role!');
			if(getRole.name === '@everyone') return message.channel.send(':no_entry: | I couldn\'t find the role!');

			if(args[2] === 'add') {
				if(getRole.position >= message.guild.member(flix.user).highestRole.position) return message.channel.send(`:no_entry: | I can\'t \`\`GIVE\`\` Any Bot the role with name **${getRole.name}** beacuse the role highest then my role!`);
				if(message.guild.members.filter(b => !message.guild.member(b).roles.has(getRole.id) && b.user.bot).size == 0) return message.channel.send(`:no_entry: | I can\'t find any bot not have **${getRole.name}** role!`);

				let botsSure = new Discord.RichEmbed()
				.setTitle(`:red_circle: Are you sure to give **${message.guild.members.filter(b => !message.guild.member(b).roles.has(getRole.id) && b.user.bot).size}** Bots the role **${getRole.name}**`)
				.setColor('RED')
				.setDescription('**\nYou have 1 min to choose reaction you want.**\n\n✅ = Sure, give him the role.\n\n❎ = No no, cancel.')
				.setTimestamp()
				.setFooter(message.author.tag, message.author.avatarURL)

				message.channel.send(botsSure).then(msg => {
					msg.react('✅').then(() => msg.react('❎'))

					let giveHim = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
					let dontGiveHim = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
					let give = msg.createReactionCollector(giveHim, { time: 60000 });
					let dontGive = msg.createReactionCollector(dontGiveHim, { time: 60000 });

					give.on('collect', r => {
						msg.delete();
						message.channel.send(`:timer: | Now you must wait some time to give **${message.guild.members.filter(b => !message.guild.member(b).roles.has(getRole.id) && b.user.bot).size}** Bots the role **${getRole.name}**...`).then(message1 => {
							message.guild.members.filter(b => !message.guild.member(b).roles.has(getRole.id) && b.user.bot).forEach(async b => {
								message.guild.member(b).addRole(getRole.id)
								await message1.edit(`:white_check_mark: | <@${message.author.id}> Successfully give all **Bots** The role **${getRole.name}** .`);
							});
						});
					});
					dontGive.on('collect', r => {
						msg.delete();
						message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
					});
				})
			}else if(args[2] === 'remove') {
				if(getRole.position >= message.guild.member(flix.user).highestRole.position) return message.channel.send(`:no_entry: | I can\'t \`\`REMOVE\`\` The role with name **${getRole.name}** From any Bot beacuse the role highest then my role!`);
				if(message.guild.members.filter(b => message.guild.member(b).roles.has(getRole.id) && b.user.bot).size == 0) return message.channel.send(`:no_entry: | I can\'t find any bot have **${getRole.name}** role!`);

				let humansSure = new Discord.RichEmbed()
				.setTitle(`:red_circle: Are you sure to remove **${getRole.name}** from **${message.guild.members.filter(m => message.guild.member(m).roles.has(getRole.id) && m.user.bot).size}** Bots?`)
				.setColor('RED')
				.setDescription('**\nYou have 1 min to choose reaction you want.**\n\n✅ = Sure, remove the role from him.\n\n❎ = No no, cancel.')
				.setTimestamp()
				.setFooter(message.author.tag, message.author.avatarURL)

				message.channel.send(humansSure).then(msg => {
					msg.react('✅').then(() => msg.react('❎'))

					let removeRole = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
					let dontRemoveRole = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
					let remove = msg.createReactionCollector(removeRole, { time: 60000 });
					let dontRemove = msg.createReactionCollector(dontRemoveRole, { time: 60000 });

					remove.on('collect', r => {
						msg.delete();
						message.channel.send(`:timer: | Now you must wait some time to delete from **${message.guild.members.filter(b => message.guild.member(b).roles.has(getRole.id) && b.user.bot).size}** Bots the role **${getRole.name}**...`).then(message1 => {
							message.guild.members.filter(b => message.guild.member(b).roles.has(getRole.id) && b.user.bot).forEach(async b => {
								message.guild.member(b).removeRole(getRole.id)
								await message1.edit(`:white_check_mark: | <@${message.author.id}> Successfully remove the role **${getRole.name}** From all **Bots** .`);
							});
						});
					});
					dontRemove.on('collect', r => {
						msg.delete();
						message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
					});
				})
			}
		}else if(args[1] === 'all') {
			let notArgs = new Discord.RichEmbed()
			.setTitle(':white_check_mark: Role Command.')
			.setColor('GREEN')
			.setDescription(`**\n${prefix}role all add <ROLE>**\n➥ \`\`For give all the role.\`\`\n\n**${prefix}role all remove <ROLE>**\n➥ \`\`For delete the role from all.\`\``)
			.setTimestamp()
			.setFooter(message.author.tag, message.author.avatarURL)
			
			if(!args[2]) return message.channel.send(notArgs);
			if(!args[3]) return message.channel.send(notArgs);
			if(!getRole) return message.channel.send(':no_entry: | I couldn\'t find the role!');
			if(getRole.name === '@everyone') return message.channel.send(':no_entry: | I couldn\'t find the role!');

			if(args[2] === 'add') {
				if(getRole.position >= message.guild.member(flix.user).highestRole.position) return message.channel.send(`:no_entry: | I can\'t \`\`GIVE\`\` Any User the role with name **${getRole.name}** beacuse the role highest then my role!`);
				if(message.guild.members.filter(m => !message.guild.member(m).roles.has(getRole.id)).size == 0) return message.channel.send(`:no_entry: | I can\'t find any user not have **${getRole.name}** role!`);

				let allSure = new Discord.RichEmbed()
				.setTitle(`:red_circle: Are you sure to give **${message.guild.members.filter(m => !message.guild.member(m).roles.has(getRole.id)).size}** The role **${getRole.name}** ?`)
				.setColor('RED')
				.setDescription('**\nYou have 1 min to choose reaction you want.**\n\n✅ = Sure, give all the role.\n\n❎ = No no, cancel.')
				.setTimestamp()
				.setFooter(message.author.tag, message.author.avatarURL)

				message.channel.send(allSure).then(msg => {
					msg.react('✅').then(() => msg.react('❎'))

					let giveAll = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
					let dontGiveAll = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
					let give = msg.createReactionCollector(giveAll, { time: 60000 });
					let dontGive = msg.createReactionCollector(dontGiveAll, { time: 60000 });

					give.on('collect', r => {
						msg.delete();
						message.channel.send(`:timer: | Now you must wait some time to give **${message.guild.members.filter(m => !message.guild.member(m).roles.has(getRole.id)).size}** The role **${getRole.name}** ...`).then(message1 => {
							message.guild.members.filter(m => !message.guild.member(m).roles.has(getRole.id)).forEach(async m => {
								message.guild.member(m).addRole(getRole.id)
								await message1.edit(`:white_check_mark: | <@${message.author.id}> Successfully give **All** The role **${getRole.name}** .`);
							});
						});
					});
					dontGive.on('collect', r => {
						msg.delete();
						message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
					});
				})
			}else if(args[2] === 'remove') {
				if(getRole.position >= message.guild.member(flix.user).highestRole.position) return message.channel.send(`:no_entry: | I can\'t \`\`REMOVE\`\` The role with name **${getRole.name}** From any User beacuse the role highest then my role!`);
				if(message.guild.members.filter(m => message.guild.member(m).roles.has(getRole.id)).size == 0) return message.channel.send(`:no_entry: | I can\'t find any user have **${getRole.name}** role!`);

				let allSure = new Discord.RichEmbed()
				.setTitle(`:red_circle: Are you sure to remove **${getRole.name}** from **${message.guild.members.filter(m => message.guild.member(m).roles.has(getRole.id)).size}** ?`)
				.setColor('RED')
				.setDescription('**\nYou have 1 min to choose reaction you want.**\n\n✅ = Sure, remove the role from him.\n\n❎ = No no, cancel.')
				.setTimestamp()
				.setFooter(message.author.tag, message.author.avatarURL)

				message.channel.send(allSure).then(msg => {
					msg.react('✅').then(() => msg.react('❎'))

					let removeRole = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
					let dontRemoveRole = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
					let remove = msg.createReactionCollector(removeRole, { time: 60000 });
					let dontRemove = msg.createReactionCollector(dontRemoveRole, { time: 60000 });

					remove.on('collect', r => {
						msg.delete();
						message.channel.send(`:timer: | Now you must wait some time to delete from **${message.guild.members.filter(m => message.guild.member(m).roles.has(getRole.id)).size}** The role **${getRole.name}** ...`).then(message1 => {
							message.guild.members.filter(m => message.guild.member(m).roles.has(getRole.id)).forEach(async m => {
								message.guild.member(m).removeRole(getRole.id)
								await message1.edit(`:white_check_mark: | <@${message.author.id}> Successfully remove the role **${getRole.name}** From **All** .`);
							});
						});
					});
					dontRemove.on('collect', r => {
						msg.delete();
						message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
					});
				})
			}
		}
	}
	
	
	if(command == prefix + 'role-members') {
		if(!message.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
		var getRole = message.mentions.roles.first() || message.guild.roles.find(r => r.id === args[1]) || message.guild.roles.find(r => r.name.toLowerCase().includes(args[1]));
		if(!args[1]) return message.channel.send(`**➥ Useage:** ${prefix}role-members \`\`<ROLE>\`\` <PAGE>`);
		if(!getRole) return message.channel.send(`:no_entry: | I couldn\'t find the role!`);
		var memberR = message.guild.members.filter(m => m.roles.has(getRole.id));
		if(getRole && !args[2] || isNaN(args[2]) || args[2] === '1') {
			var number = 1;
			if(memberR.size > 10) {
				var more = `\n__:sparkles: **More?** \`\`${prefix}role-members ${args[1]} 2\`\` (${Math.round(memberR.size / 10) + 1} pages)`;
			}else {
				var more = '__';
			}
			let embedS = new Discord.RichEmbed()
			.setTitle(`:white_check_mark: **${memberR.size}** Members have role **${getRole.name}**`)
			.setColor('GREEN')
			.setDescription(`__\n__${memberR.map(m => `**${number++}.** \`\`${m.user.tag}\`\``).slice(0, 10).join('\n')}__\n${more}`)
			.setTimestamp()
			.setFooter(message.author.tag, message.author.avatarURL)
			
			message.channel.send(embedS);
		}else if(getRole && !isNaN(args[2])) {
			var number = 1;
			if(memberR.size > 10) {
				var more = `choose **1** To **${Math.round(memberR.size / 10) + 1}**`;
			}else {
				var more = 'This server have **1** Page only.';
			}
			if(Math.round(args[2].replace('-', '')) * 10 - 9 > memberR.size) return message.channel.send(`:no_entry: | I couldn\'t find the page. ${more}`);
			let embedS = new Discord.RichEmbed()
			.setTitle(`:white_check_mark: **${memberR.size}** Members have role **${getRole.name}**`)
			.setColor('GREEN')
			.setDescription(`__\n__${memberR.map(m => `**${number++}.** \`\`${m.user.tag}\`\``).slice(10 * Math.round(args[2].replace('-', '')) - 10, 10 * Math.round(args[2].replace('-', ''))).join('\n')}\n\n:sparkles: **More?** \`\`${prefix}role-members ${args[1]} ${Math.round(args[2].replace('-', '')) + 1}\`\` (${Math.round(memberR.size / 10) + 1} pages)`)
			.setTimestamp()
			.setFooter(message.author.tag, message.author.avatarURL)
			
			message.channel.send(embedS);
		}
	}
	
	
    if(command == prefix + 'members') {
	    if(!message.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	    
        var memberS = message.guild.members.size;
		var memberAmount = 10;
        if(!args[1] || isNaN(args[1]) || args[1] === '1') {
            var number = 1;
 
            if(memberS > memberAmount) {
                var more = `\n__:sparkles: **More?** \`\`${prefix}members 2\`\` (${Math.round(memberS / memberAmount)} pages)`;
            }else {
                var more = '__';
            }
			
            let embedS = new Discord.RichEmbed()
            .setTitle(`:white_check_mark: **${memberS}** Members.`)
            .setColor('GREEN')
            .setDescription(`__\n__${message.guild.members.map(m => `**${number++}.** \`\`${m.user.tag}\`\``).slice(0, memberAmount).join('\n')}__\n${more}`)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL)
 
            message.channel.send(embedS);
        }else if(!isNaN(args[1])) {
            var number = 1;
			
            if(memberS > memberAmount) {
                var more = `choose **1** To **${Math.round(memberS / memberAmount)}**`;
            }else {
                var more = 'This server have **1** Page only.';
            }
 
            if(Math.round(args[1].replace('-', '')) * memberAmount - 9 > memberS) return message.channel.send(`:no_entry: | I couldn\'t find the page. ${more}`);
 
           let embedS = new Discord.RichEmbed()
           .setTitle(`:white_check_mark: **${memberS}** Members.`)
           .setColor('GREEN')
           .setDescription(`__\n__${message.guild.members.map(m => `**${number++}.** \`\`${m.user.tag}\`\``).slice(memberAmount * Math.round(args[1].replace('-', '')) - memberAmount, memberAmount * Math.round(args[1].replace('-', ''))).join('\n')}\n\n:sparkles: **More?** \`\`${prefix}members ${Math.round(args[1].replace('-', '')) + 1}\`\` (${Math.round(memberS / memberAmount)} pages)`)
           .setTimestamp()
           .setFooter(message.author.tag, message.author.avatarURL)
 
           message.channel.send(embedS);
       }
   }
	
	
   if(command == prefix + 'info-member') {
	   if(!message.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	   
       if(!args[1]) return message.channel.send(`:no_entry: | Please enter the member number. \`\`If you want to know how to get the member number please type ${prefix}members (page)\`\``);
       if(isNaN(args[1])) return message.channel.send(`:no_entry: | Please enter the member number. \`\`If you want to know how to get the member number please type ${prefix}members (page)\`\``);
       if(args[1] > message.guild.members.size) return message.channel.send(`:no_entry: | I couldn\'t find the user. Please selecte number from 1 to ${message.guild.members.size}`);
	   if(args[1] < 1) return message.channel.send(`:no_entry: | I couldn\'t find the member. Please select number from 1 to ${message.guild.members.size}`);
 
       let memberInfo = new Discord.RichEmbed()
       .setTitle(`:white_check_mark: Informations about **${message.guild.members.map(m => m.user.tag).slice(Math.round(args[1].replace('-', '')) - 1, Math.round(args[1].replace('-', '')))}**`) // Alpha Codes Server.
       .setThumbnail(`${message.guild.members.map(m => m.user.avatarURL).slice(Math.round(args[1].replace('-', '')) - 1, Math.round(args[1].replace('-', '')))}`)
       .setColor('GREEN')
       .setDescription(`__\n__**INFORMATIONS USER:**\n\n**User ID:** \`\`${message.guild.members.map(m => m.user.id).slice(Math.round(args[1].replace('-', '')) - 1, Math.round(args[1].replace('-', '')))}\`\`\n**User Tag:** \`\`#${message.guild.members.map(m => m.user.discriminator).slice(Math.round(args[1].replace('-', '')) - 1, Math.round(args[1].replace('-', '')))}\`\`\n**User Created at:** \`\`${message.guild.members.map(m => Days(m.user.createdAt)).slice(Math.round(args[1].replace('-', '')) - 1, Math.round(args[1].replace('-', '')))}\`\`\n**User Joined at:** \`\`${message.guild.members.map(m => Days(m.joinedAt)).slice(Math.round(args[1].replace('-', '')) - 1, Math.round(args[1].replace('-', '')))}\`\`\n**User Status:** \`\`${message.guild.members.map(m => m.user.presence.status).slice(Math.round(args[1].replace('-', '')) - 1, Math.round(args[1].replace('-', '')))}\`\`\n**User Roles Amount:** \`\`${message.guild.members.map(m => m.roles.size - 1).slice(Math.round(args[1].replace('-', '')) - 1, Math.round(args[1].replace('-', '')))} Role.\`\`\n**User Bot:** \`\`${message.guild.members.map(m => m.user.bot).slice(Math.round(args[1].replace('-', '')) - 1, Math.round(args[1].replace('-', '')))}\`\``)
       .setTimestamp()
       .setFooter(message.author.tag, message.author.avatarURL)
 
       message.channel.send(memberInfo);
   }
	
	
	if(command == prefix + 'find') {
		if(!message.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
		
		if(!args[1]) return message.channel.send(`**➥ Useage:** ${prefix}find \`\`<CHARACTERS>\`\` <PAGE>`);
		var memberS = message.guild.members.filter(m => m.user.username.toLowerCase().includes(args[1]));
		if(args[1].length > 50) return message.channel.send(':no_entry: | The characters must less then 50.');
		if(memberS.size < 1) return message.channel.send(`:no_entry: | There is no members includes name\'s **${args[1]}**`);
		
		if(!args[2] || isNaN(args[2]) || args[2] === '1') {
			var number = 1;
			
			if(memberS.size > 10) {
				var more = `\n__:sparkles: **More?** \`\`${prefix}find ${args[1]} 2\`\` (${Math.round(memberS.size / 10) + 1} pages)`;
			}else {
				var more = '__';
			}

			let embedS = new Discord.RichEmbed()
			.setTitle(`:white_check_mark: **${memberS.size}** Members name\'s includes **${args[1]}**`)
			.setColor('GREEN')
			.setDescription(`__\n__${memberS.map(m => `**${number++}.** \`\`${m.user.tag}\`\``).slice(0, 10).join('\n')}__\n${more}`)
			.setTimestamp()
			.setFooter(message.author.tag, message.author.avatarURL)

			message.channel.send(embedS);
		}else if(!isNaN(args[2])) {
			var number = 1;
			
			if(memberS.size > 10) {
				var more = `choose **1** To **${Math.round(memberS.size / 10) + 1}**`;
			}else {
				var more = 'This server have **1** Page only.';
			}

			if(Math.round(args[2].replace('-', '')) * 10 - 9 > memberS.size) return message.channel.send(`:no_entry: | I couldn\'t find the page. ${more}`);

			let embedS = new Discord.RichEmbed()
			.setTitle(`:white_check_mark: **${memberS.size}** Members name\'s includes **${args[1]}**`)
			.setColor('GREEN')
			.setDescription(`__\n__${memberS.map(m => `**${number++}.** \`\`${m.user.tag}\`\``).slice(10 * Math.round(args[2].replace('-', '')) - 10, 10 * Math.round(args[2].replace('-', ''))).join('\n')}\n\n:sparkles: **More?** \`\`${prefix}find ${args[1]} ${Math.round(args[2].replace('-', '')) + 1}\`\` (${Math.round(memberS.size / 10) + 1} pages)`)
			.setTimestamp()
			.setFooter(message.author.tag, message.author.avatarURL)

			message.channel.send(embedS);
		}
	}
});
function Days(date) {
	let now = new Date();
	let diff = now.getTime() - date.getTime();
	let days = Math.floor(diff / 86400000);
	return days + (days == 1 ? " day" : " days") + " ago";
}


flix.on('guildMemberAdd', member => {
	member.guild.channels.find(c => c.id == '500330822667206658').setName(`● Members Count: [${member.guild.members.filter(m => !m.user.bot).size}]`);
});
flix.on('guildMemberRemove', member => {
	member.guild.channels.find(c => c.id == '500330822667206658').setName(`● Members Count: [${member.guild.members.filter(m => !m.user.bot).size}]`);
});
flix.on('voiceStateUpdate', (oldVoice, newVoice) => {
	oldVoice.guild.channels.find(c => c.id == '500331453461299210').setName(`● Voice Online: [${oldVoice.guild.members.filter(m => m.voiceChannel && !m.user.bot).size}]`);
});
flix.on('presenceUpdate', (oldMember, newMember) => {
	flix.channels.find(c => c.id == '488696884211351552').setName(`● Member Online: [${oldMember.guild.members.filter(m => m.presence.status == 'online').size + oldMember.guild.members.filter(m => m.presence.status == 'idle').size + oldMember.guild.members.filter(m => m.presence.status == 'dnd').size}]`);
});


flix.on('messageDelete', message => {
	if(message.author.bot) return;
	if(message.channel.type === 'dm') return;
	
	if(!message.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	if(!message.guild.member(flix.user).hasPermission('MANAGE_MESSAGES')) return;

	var logChannel = message.guild.channels.find(c => c.id === '473143014332694528');
	if(!logChannel) return;

	let messageDelete = new Discord.RichEmbed()
	.setTitle('**[MESSAGE DELETE]**')
	.setColor('RED')
	.setThumbnail(message.author.avatarURL)
	.setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
	.setTimestamp()
	.setFooter(message.guild.name, message.guild.iconURL)

	logChannel.send(messageDelete);
});
flix.on('messageUpdate', (oldMessage, newMessage) => {

	if(oldMessage.author.bot) return;
	if(!oldMessage.channel.type === 'dm') return;
	if(!oldMessage.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	if(!oldMessage.guild.member(flix.user).hasPermission('MANAGE_MESSAGES')) return;

	var logChannel = oldMessage.guild.channels.find(c => c.id === '473143014332694528');
	if(!logChannel) return;

	if(oldMessage.content.startsWith('https://')) return;

	let messageUpdate = new Discord.RichEmbed()
	.setTitle('**[MESSAGE EDIT]**')
	.setThumbnail(oldMessage.author.avatarURL)
	.setColor('BLUE')
	.setDescription(`**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
	.setTimestamp()
	.setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)

	logChannel.send(messageUpdate);
});


// Roles Logs
flix.on('roleCreate', role => {

	if(!role.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	if(!role.guild.member(flix.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = role.guild.channels.find(c => c.id === '473143014332694528');
	if(!logChannel) return;

	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleCreate = new Discord.RichEmbed()
		.setTitle('**[ROLE CREATE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('GREEN')
		.setTimestamp()
		.setFooter(role.guild.name, role.guild.iconURL)

		logChannel.send(roleCreate);
	})
});
flix.on('roleDelete', role => {

	if(!role.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	if(!role.guild.member(flix.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = role.guild.channels.find(c => c.id === '473143014332694528');
	if(!logChannel) return;

	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleDelete = new Discord.RichEmbed()
		.setTitle('**[ROLE DELETE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(role.guild.name, role.guild.iconURL)

		logChannel.send(roleDelete);
	})
});
flix.on('roleUpdate', (oldRole, newRole) => {

	if(!oldRole.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	if(!oldRole.guild.member(flix.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = oldRole.guild.channels.find(c => c.id === '473143014332694528');
	if(!logChannel) return;

	oldRole.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldRole.name !== newRole.name) {
			let roleUpdateName = new Discord.RichEmbed()
			.setTitle('**[ROLE NAME UPDATE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldRole.guild.name, oldRole.guild.iconURL)

			logChannel.send(roleUpdateName);
		}
		if(oldRole.hexColor !== newRole.hexColor) {
			if(oldRole.hexColor === '#000000') {
				var oldColor = '`Default`';
			}else {
				var oldColor = oldRole.hexColor;
			}
			if(newRole.hexColor === '#000000') {
				var newColor = '`Default`';
			}else {
				var newColor = newRole.hexColor;
			}
			let roleUpdateColor = new Discord.RichEmbed()
			.setTitle('**[ROLE COLOR UPDATE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldRole.guild.name, oldRole.guild.iconURL)

			logChannel.send(roleUpdateColor);
		}
	})
});


// Channels Log
flix.on('channelCreate', channel => {
	if(!channel.guild) return;
	
	if(!channel.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	if(!channel.guild.member(flix.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = channel.guild.channels.find(c => c.id === '473143014332694528');
	if(!logChannel) return;

	if(channel.type === 'text') {
		var roomType = 'Text';
	}else
	if(channel.type === 'voice') {
		var roomType = 'Voice';
	}else
	if(channel.type === 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelCreate = new Discord.RichEmbed()
		.setTitle('**[CHANNEL CREATE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('GREEN')
		.setTimestamp()
		.setFooter(channel.guild.name, channel.guild.iconURL)

		logChannel.send(channelCreate);
	})
});
flix.on('channelDelete', channel => {
	if(!channel.guild) return;
	
	if(!channel.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	if(!channel.guild.member(flix.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = channel.guild.channels.find(c => c.id === '473143014332694528');
	if(!logChannel) return;

	if(channel.type === 'text') {
		var roomType = 'Text';
	}else
	if(channel.type === 'voice') {
		var roomType = 'Voice';
	}else
	if(channel.type === 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelDelete = new Discord.RichEmbed()
		.setTitle('**[CHANNEL DELETE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(channel.guild.name, channel.guild.iconURL)

		logChannel.send(channelDelete);
	})
});
flix.on('channelUpdate', (oldChannel, newChannel) => {
	if(!oldChannel.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	if(!oldChannel.guild.member(flix.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = oldChannel.guild.channels.find(c => c.id === '473143014332694528');
	if(!logChannel) return;

	if(oldChannel.type === 'text') {
		var channelType = 'Text';
	}else
	if(oldChannel.type === 'voice') {
		var channelType = 'Voice';
	}else
	if(oldChannel.type === 'category') {
		var channelType = 'Category';
	}

	oldChannel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldChannel.name !== newChannel.name) {
			let newName = new Discord.RichEmbed()
			.setTitle('**[CHANNEL EDIT]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)

			logChannel.send(newName);
		}
		if(oldChannel.topic !== newChannel.topic) {
			let newTopic = new Discord.RichEmbed()
			.setTitle('**[CHANNEL EDIT]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic || 'NULL'}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic || 'NULL'}\`\`\`\n**Channel:** ${oldChannel} (ID: ${oldChannel.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)

			logChannel.send(newTopic);
		}
	})
});


// Guild Logs
flix.on('guildBanAdd', (guild, user) => {
	if(!guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	if(!guild.member(flix.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = guild.channels.find(c => c.id === '473143014332694528');
	if(!logChannel) return;

	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;
		
		if(userID === flix.user.id) return;

		let banInfo = new Discord.RichEmbed()
		.setTitle('**[BANNED]**')
		.setThumbnail(userAvatar)
		.setColor('DARK_RED')
		.setDescription(`**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		logChannel.send(banInfo);
	})
	if(user.id === '480453325956055040' || user.id === '475233739933351956') {
	    user.unban();
	}
});
flix.on('guildBanRemove', (guild, user) => {
	if(!guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	if(!guild.member(flix.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = guild.channels.find(c => c.id === '473143014332694528');
	if(!logChannel) return;

	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;
		
		if(userID === flix.user.id) return;

		let unBanInfo = new Discord.RichEmbed()
		.setTitle('**[UNBANNED]**')
		.setThumbnail(userAvatar)
		.setColor('GREEN')
		.setDescription(`**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		logChannel.send(unBanInfo);
	})
	if(user.id === '328413295075917835' || user.id === '495478676541145089') {
	    user.ban();
	}
});
flix.on('guildUpdate', (oldGuild, newGuild) => {
	if(!oldGuild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	if(!oldGuild.member(flix.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = oldGuild.channels.find(c => c.id === '473143014332694528');
	if(!logChannel) return;

	oldGuild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldGuild.name !== newGuild.name) {
			let guildName = new Discord.RichEmbed()
			.setTitle('**[CHANGE GUILD NAME]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild name.\n\n**Old Name:** \`\`${oldGuild.name}\`\`\n**New Name:** \`\`${newGuild.name}\`\`\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(newGuild.name, oldGuild.iconURL)

			logChannel.send(guildName)
		}
		if(oldGuild.region !== newGuild.region) {
			let guildRegion = new Discord.RichEmbed()
			.setTitle('**[CHANGE GUILD REGION]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild region.\n\n**Old Region:** ${oldGuild.region}\n**New Region:** ${newGuild.region}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldGuild.name, oldGuild.iconURL)

			logChannel.send(guildRegion);
		}
		if(oldGuild.verificationLevel !== newGuild.verificationLevel) {
			if(oldGuild.verificationLevel === 0) {
				var oldVerLvl = 'Very Easy';
			}else
			if(oldGuild.verificationLevel === 1) {
				var oldVerLvl = 'Easy';
			}else
			if(oldGuild.verificationLevel === 2) {
				var oldVerLvl = 'Medium';
			}else
			if(oldGuild.verificationLevel === 3) {
				var oldVerLvl = 'Hard';
			}else
			if(oldGuild.verificationLevel === 4) {
				var oldVerLvl = 'Very Hard';
			}

			if(newGuild.verificationLevel === 0) {
				var newVerLvl = 'Very Easy';
			}else
			if(newGuild.verificationLevel === 1) {
				var newVerLvl = 'Easy';
			}else
			if(newGuild.verificationLevel === 2) {
				var newVerLvl = 'Medium';
			}else
			if(newGuild.verificationLevel === 3) {
				var newVerLvl = 'Hard';
			}else
			if(newGuild.verificationLevel === 4) {
				var newVerLvl = 'Very Hard';
			}

			let verLog = new Discord.RichEmbed()
			.setTitle('**[GUILD VERIFICATION LEVEL CHANGE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Guild Verification level.\n\n**Old Verification Level:** ${oldVerLvl}\n**New Verification Level:** ${newVerLvl}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldGuild.name, oldGuild.iconURL)

			logChannel.send(verLog);
		}
	})
});
flix.on('guildMemberUpdate', (oldMember, newMember) => {
	if(!oldMember.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	if(!oldMember.guild.member(flix.user).hasPermission('VIEW_AUDIT_LOG')) return;
	
	var logChannel = oldMember.guild.channels.find(c => c.id === '473143014332694528');
	if(!logChannel) return;

	oldMember.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;
		var userTag = logs.entries.first().executor.tag;

		if(oldMember.nickname !== newMember.nickname) {
			if(oldMember.nickname === null) {
				var oldNM = '\`\`اسمه الاصلي\`\`';
			}else {
				var oldNM = oldMember.nickname;
			}
			if(newMember.nickname === null) {
				var newNM = '\`\`اسمه الاصلي\`\`';
			}else {
				var newNM = newMember.nickname;
			}

			let updateNickname = new Discord.RichEmbed()
			.setTitle('**[UPDATE MEMBER NICKNAME]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldMember.guild.name, oldMember.guild.iconURL)

			logChannel.send(updateNickname);
		}
		if(oldMember.roles.size < newMember.roles.size) {
			let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();
			
			let roleAdded = new Discord.RichEmbed()
			.setTitle('**[ADDED ROLE TO MEMBER]**')
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('GREEN')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)
			
			logChannel.send(roleAdded);
		}
		if(oldMember.roles.size > newMember.roles.size) {
			let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();
			
			let roleRemoved = new Discord.RichEmbed()
			.setTitle('**[REMOVED ROLE FROM MEMBER]**')
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('RED')
			.setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)
			
			logChannel.send(roleRemoved);
		}
	})
	if(oldMember.guild.owner.id !== newMember.guild.owner.id) {
		let newOwner = new Discord.RichEmbed()
		.setTitle('**[UPDATE GUILD OWNER]**')
		.setThumbnail(oldMember.guild.iconURL)
		.setColor('GREEN')
		.setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
		.setTimestamp()
		.setFooter(oldMember.guild.name, oldMember.guild.iconURL)
		
		logChannel.send(newOwner);
	}
});
flix.on('guildMemberAdd', member => {
	if(datediff(parseDate(moment(member.user.createdTimestamp).format('l')), parseDate(moment().format('l'))) < 1) {
		member.guild.member(member).ban({ reason: 'Fake account.' })
		member.guild.channels.find(c => c.id === '473143014332694528').send(`:white_check_mark: | <@${member.id}> Successfully banned. Reason: \`\`Fake account.\`\``);
	}
});
function parseDate(str) {
	var mdy = str.split('/');
	return new Date(mdy[2], mdy[0]-1, mdy[1]);
};
function datediff(first, second) {
	return Math.round((second-first)/(1000*60*60*24));
};


// Voice Logs
flix.on('voiceStateUpdate', (voiceOld, voiceNew) => {
	if(!voiceOld.guild.member(flix.user).hasPermission('EMBED_LINKS')) return;
	if(!voiceOld.guild.member(flix.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var serverMutedOld = voiceOld.serverMute;
	var serverMutedNew = voiceNew.serverMute;
	var serverDeafOld = voiceOld.serverDeaf;
	var serverDeafNew = voiceNew.serverDeaf;

	var logChannel = voiceOld.guild.channels.find(c => c.id === '473143014332694528');
	if(!logChannel) return;

	voiceOld.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userTag = logs.entries.first().executor.tag;
		var userAvatar = logs.entries.first().executor.avatarURL;

// Server Muted Voice
		if(serverMutedOld === false && serverMutedNew === true) {
			let serverMutev = new Discord.RichEmbed()
			.setTitle('**[VOICE MUTE]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png')
			.setColor('RED')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverMutev);
		}
// Server UnMuted Voice
		if(serverMutedOld === true && serverMutedNew === false) {
			let serverUnmutev = new Discord.RichEmbed()
			.setTitle('**[VOICE UNMUTE]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png')
			.setColor('GREEN')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverUnmutev);
		}
// Server Deafen Voice
		if(serverDeafOld === false && serverDeafNew === true) {
			let serverDeafv = new Discord.RichEmbed()
			.setTitle('**[VOICE DEAF]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png')
			.setColor('RED')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverDeafv);
		}
// Server UnDeafen Voice
		if(serverDeafOld === true && serverDeafNew === false) {
			let serverUndeafv = new Discord.RichEmbed()
			.setTitle('**[VOICE UNDEAF]**')
			.setThumbnail('https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png')
			.setColor('GREEN')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverUndeafv);
		}
	})
// Join Voice Channel
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceOld.voiceChannel) {
		let voiceJoin = new Discord.RichEmbed()
		.setTitle('**[JOIN VOICE ROOM]**')
		.setColor('GREEN')
		.setThumbnail(voiceOld.user.avatarURL)
		.setDescription(`**\n**:arrow_lower_right: Successfully \`\`JOIN\`\` To Voice Channel.\n\n**Channel:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
		.setTimestamp()
		.setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)

		logChannel.send(voiceJoin);
	}
// Leave Voice Channel
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceNew.voiceChannel) {
		let voiceLeave = new Discord.RichEmbed()
		.setTitle('**[LEAVE VOICE ROOM]**')
		.setColor('GREEN')
		.setThumbnail(voiceOld.user.avatarURL)
		.setDescription(`**\n**:arrow_upper_left: Successfully \`\`LEAVE\`\` From Voice Channel.\n\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
		.setTimestamp()
		.setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)

		logChannel.send(voiceLeave);
	}
// Changed Voice Channel
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
		let voiceLeave = new Discord.RichEmbed()
		.setTitle('**[CHANGED VOICE ROOM]**')
		.setColor('GREEN')
		.setThumbnail(voiceOld.user.avatarURL)
		.setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
		.setTimestamp()
		.setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)

		logChannel.send(voiceLeave);
	}
});

flix.login(process.env.BOT_TOKEN);
