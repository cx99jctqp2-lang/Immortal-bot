import fs from 'fs'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const chat = global.db.data.chats[m.chat] || {}
    const title = "🏴‍☠️ *𝐑𝐋𝐘 𝐃𝐄𝐒𝐓𝐑𝐔𝐂𝐓𝐈𝐎𝐍* 🏴‍☠️"
    const footer = "𝐑𝐋𝐘 𝐁𝐎𝐓 𝐒𝐘𝐒𝐓𝐄𝐌"

    if (command === 'distruzione') {
        if (text === 'conferma') {
            const groupMetadata = await conn.groupMetadata(m.chat)
            chat.rileyOldName = groupMetadata.subject
            chat.rileyOldDesc = groupMetadata.desc || ""
            global.db.data.chats[m.chat] = chat

            await conn.reply(m.chat, "☣️ *𝐀𝐭𝐭𝐢𝐯𝐚𝐳𝐢𝐨𝐧𝐞 𝐏𝐫𝐨𝐭𝐨𝐜𝐨𝐥𝐥𝐨 𝐑𝐋𝐘... 𝐀𝐝𝐝𝐢𝐨.*", m)

            await conn.groupUpdateSubject(m.chat, `${chat.rileyOldName} | SVT BY RILEY`)
            await conn.groupUpdateDescription(m.chat, "𝐑𝐈𝐋𝐄𝐘 𝐃𝐎𝐌𝐈𝐍𝐀")
            await conn.groupSettingUpdate(m.chat, 'announcement')

            let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)
            let nukeMsg = `💀 *𝐆𝐑𝐔𝐏𝐏𝐎 𝐃𝐈𝐒𝐓𝐑𝐔𝐓𝐓𝐎 𝐁𝐘 𝐑𝐈𝐋𝐄𝐘*\n\n𝘓𝘰 𝘴𝘵𝘢𝘵𝘰 𝘥𝘪 𝘲𝘶𝘦𝘴𝘵𝘢 𝘤𝘩𝘢𝘵 𝘦̀ 𝘴𝘵𝘢𝘵𝘰 𝘢𝘻𝘻𝘦𝘳𝘢𝘵𝘰.\n\n🔗 *𝐋𝐢𝐧𝐤 𝐆𝐫𝐮𝐩𝐩𝐨:* ${link}`

            await conn.sendMessage(m.chat, { text: nukeMsg }, { quoted: m })

            return conn.sendMessage(m.chat, {
                text: "🔄 *𝐑𝐋𝐘 𝐒𝐘𝐒𝐓𝐄𝐌: 𝐕𝐮𝐨𝐢 𝐫𝐢𝐩𝐫𝐢𝐬𝐭𝐢𝐧𝐚𝐫𝐞?*",
                footer: footer,
                buttons: [
                    { buttonId: `${usedPrefix}distruzione ripristina`, buttonText: { displayText: '✅ Ripristina' }, type: 1 },
                    { buttonId: `${usedPrefix}distruzione rifiuta`, buttonText: { displayText: '❌ No' }, type: 1 }
                ],
                headerType: 1
            })
        }

        if (text === 'ripristina') {
            if (!chat.rileyOldName) return m.reply("⚠️ *𝐄𝐫𝐫𝐨𝐫𝐞: 𝐃𝐚𝐭𝐢 𝐝𝐢 𝐫𝐢𝐩𝐫𝐢𝐬𝐭𝐢𝐧𝐨 𝐧𝐨𝐧 𝐭𝐫𝐨𝐯𝐚𝐭𝐢.*")

            await conn.groupUpdateSubject(m.chat, chat.rileyOldName)
            await conn.groupUpdateDescription(m.chat, chat.rileyOldDesc)
            await conn.groupSettingUpdate(m.chat, 'not_announcement')

            return m.reply("✅ *𝐑𝐋𝐘 𝐒𝐘𝐒𝐓𝐄𝐌: 𝐑𝐢𝐩𝐫𝐢𝐬𝐭𝐢𝐧𝐨 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐚𝐭𝐨.*")
        }

        if (text === 'rifiuta') {
            return m.reply("🕶️ *𝐎𝐩𝐞𝐫𝐚𝐳𝐢𝐨𝐧𝐞 𝐚𝐧𝐧𝐮𝐥𝐥𝐚𝐭𝐚.*")
        }

        return conn.sendMessage(m.chat, {
            text: `*╭━━━━━━━☠️━━━━━━━╮*\n${title}\n*╰━━━━━━━☠️━━━━━━━╯*\n\n𝐒𝐞𝐢 𝐬𝐢𝐜𝐮𝐫𝐨 𝐝𝐢 𝐯𝐨𝐥𝐞𝐫 𝐚𝐭𝐭𝐢𝐯𝐚𝐫𝐞 𝐥𝐚 𝐝𝐢𝐬𝐭𝐫𝐮𝐳𝐢𝐨𝐧𝐞 𝐝𝐢 𝐑𝐢𝐥𝐞𝐲?`,
            footer: footer,
            buttons: [
                { buttonId: `${usedPrefix}distruzione conferma`, buttonText: { displayText: '✅ Conferma' }, type: 1 },
                { buttonId: `${usedPrefix}distruzione rifiuta`, buttonText: { displayText: '❌ Rifiuta' }, type: 1 }
            ],
            headerType: 1
        }, { quoted: m })
    }
}

handler.help = ['distruzione']
handler.tags = ['admin']
handler.command = ['distruzione']

handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
