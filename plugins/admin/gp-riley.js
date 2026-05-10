let handler = async (m, { conn, usedPrefix, command }) => {
    conn.rlySave = conn.rlySave ? conn.rlySave : {}

    const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
    const oldName = groupMetadata.subject
    const oldDesc = groupMetadata.desc || "𝛥𝐗𝐈𝚶𝐍 𝐒𝐘𝐒𝐓𝐄𝐌"

    conn.rlySave[m.chat] = {
        name: oldName,
        desc: oldDesc
    }

    let doc = {
        text: "🌀 *𝐑𝐋𝐘 𝐒𝐘𝐒𝐓𝐄𝐌 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐈𝐎𝐍* 🌀\n\n𝐒𝐞𝐢 𝐬𝐢𝐜𝐮𝐫𝐨 𝐝𝐢 𝐯𝐨𝐥𝐞𝐫 𝐚𝐭𝐭𝐢𝐯𝐚𝐫𝐞 𝐥𝐚 𝐝𝐢𝐬𝐭𝐫𝐮𝐳𝐢𝐨𝐧𝐞 𝐝𝐢 𝐑𝐈𝐋𝐄𝐘?\n\n_𝐈𝐥 𝐠𝐫𝐮𝐩𝐩𝐨 𝐯𝐞𝐫𝐫𝐚̀ 𝐦𝐨𝐝𝐢𝐟𝐢𝐜𝐚𝐭𝐨 𝐢𝐬𝐭𝐚𝐧𝐭𝐚𝐧𝐞𝐚𝐦𝐞𝐧𝐭𝐞._",
        footer: "𝐑𝐋𝐘 𝐁𝐎𝐓 𝟐𝟎𝟐𝟔",
        buttons: [
            { buttonId: `.rly_ok`, buttonText: { displayText: '✅ 𝐂𝐎𝐍𝐅𝐄𝐑𝐌𝐀' }, type: 1 },
            { buttonId: `.rly_no`, buttonText: { displayText: '❌ 𝐑𝐈𝐅𝐈𝐔𝐓𝐀' }, type: 1 }
        ],
        headerType: 1
    }

    await conn.sendMessage(m.chat, doc, { quoted: m })
}

handler.before = async (m, { conn, isAdmin, isBotAdmin }) => {
    if (!m.text || !m.isGroup) return

    if (m.text === `.rly_ok`) {
        if (!isAdmin && !m.fromMe) return m.reply("⚠️ 𝐀𝐜𝐜𝐞𝐬𝐬𝐨 𝐧𝐞𝐠𝐚𝐭𝐨: 𝐒𝐨𝐥𝐨 𝐀𝐝𝐦𝐢𝐧.")
        if (!isBotAdmin) return m.reply("⚠️ 𝐄𝐫𝐫𝐨𝐫𝐞: 𝐑𝐋𝐘 𝐁𝐎𝐓 𝐝𝐞𝐯𝐞 𝐞𝐬𝐬𝐞𝐫𝐞 𝐀𝐝𝐦𝐢𝐧.")

        await m.reply("☣️ *𝐃𝐈𝐒𝐓𝐑𝐔𝐙𝐈𝐎𝐍𝐄 𝐈𝐍 𝐂𝐎𝐑𝐒𝐎...*")

        const data = conn.rlySave[m.chat]
        
        await conn.groupUpdateSubject(m.chat, `${data.name} | 𝐒𝐕𝐓 𝐁𝐘 𝐑𝐈𝐋𝐄𝐘`)
        await conn.groupUpdateDescription(m.chat, "𝐑𝐈𝐋𝐄𝐘 𝐃𝐎𝐌𝐈𝐍𝐀")
        await conn.groupSettingUpdate(m.chat, 'announcement')

        await conn.sendMessage(m.chat, { text: "✨ *𝐆𝐑𝐔𝐏𝐏𝐎 𝐃𝐈𝐒𝐓𝐑𝐔𝐓𝐓𝐎 𝐁𝐘 𝐑𝐈𝐋𝐄𝐘* ✨" })

        setTimeout(async () => {
            await conn.sendMessage(m.chat, {
                text: "🛠️ *𝐒𝐘𝐒𝐓𝐄𝐌 𝐑𝐄𝐂𝐎𝐕𝐄𝐑𝐘*\n\n𝐕𝐮𝐨𝐢 𝐫𝐢𝐩𝐫𝐢𝐬𝐭𝐢𝐧𝐚𝐫𝐞 𝐢𝐥 𝐠𝐫𝐮𝐩𝐩𝐨 𝐚𝐥𝐥𝐨 𝐬𝐭𝐚𝐭𝐨 𝐨𝐫𝐢𝐠𝐢𝐧𝐚𝐥𝐞?",
                footer: "𝐑𝐋𝐘 𝐑𝐞𝐬𝐭𝐨𝐫𝐞",
                buttons: [
                    { buttonId: `.rly_reset`, buttonText: { displayText: '🔄 𝐑𝐈𝐏𝐑𝐈𝐒𝐓𝐈𝐍𝐀' }, type: 1 }
                ],
                headerType: 1
            })
        }, 3000)
    }

    if (m.text === `.rly_reset`) {
        const data = conn.rlySave[m.chat]
        if (!data) return m.reply("❌ 𝐃𝐚𝐭𝐢 𝐝𝐢 𝐛𝐚𝐜𝐤𝐮𝐩 𝐧𝐨𝐧 𝐭𝐫𝐨𝐯𝐚𝐭𝐢.")

        await m.reply("⏳ *𝐑𝐢𝐩𝐫𝐢𝐬𝐭𝐢𝐧𝐨 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨...*")
        
        await conn.groupUpdateSubject(m.chat, data.name)
        await conn.groupUpdateDescription(m.chat, data.desc)
        await conn.groupSettingUpdate(m.chat, 'not_announcement')

        await m.reply("✅ *𝐒𝐘𝐒𝐓𝐄𝐌 𝐑𝐄𝐒𝐓𝐎𝐑𝐄𝐃*")
        delete conn.rlySave[m.chat]
    }

    if (m.text === `.rly_no`) {
        await m.reply("🛡️ *𝐎𝐩𝐞𝐫𝐚𝐳𝐢𝐨𝐧𝐞 𝐀𝐧𝐧𝐮𝐥𝐥𝐚𝐭𝐚.*")
    }
}

handler.help = ['distruggi']
handler.tags = ['rly']
handler.command = /^(distruggi)$/i
handler.group = true
handler.admin = true

export default handler
