
let handler = async (m, { conn, usedPrefix, command }) => {
    conn.nukeSave = conn.nukeSave ? conn.nukeSave : {}

    const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
    const oldName = groupMetadata.subject
    const oldDesc = groupMetadata.desc || "𝛥𝐗𝐈𝚶𝐍 𝐒𝐘𝐒𝐓𝐄𝐌"

    conn.nukeSave[m.chat] = {
        name: oldName,
        desc: oldDesc
    }

    let doc = {
        text: "☢️ *𝐖𝐀𝐑𝐍𝐈𝐍𝐆: 𝐍𝐔𝐊𝐄 𝐃𝐄𝐓𝐎𝐍𝐀𝐓𝐈𝐎𝐍* ☢️\n\n𝐒𝐞𝐢 𝐬𝐢𝐜𝐮𝐫𝐨 𝐝𝐢 𝐯𝐨𝐥𝐞𝐫 𝐬𝐠𝐚𝐧𝐜𝐢𝐚𝐫𝐞 𝐥𝐚 𝐍𝐮𝐤𝐞 𝐝𝐢 𝐑𝐈𝐋𝐄𝐘?\n\n_𝐐𝐮𝐞𝐬𝐭𝐚 𝐚𝐳𝐢𝐨𝐧𝐞 𝐞̀ 𝐢𝐫𝐫𝐞𝐯𝐞𝐫𝐬𝐢𝐛𝐢𝐥𝐞 𝐬𝐞𝐧𝐳𝐚 𝐚𝐮𝐭𝐨𝐫𝐢𝐳𝐳𝐚𝐳𝐢𝐨𝐧𝐞._",
        footer: "𝐑𝐋𝐘 𝐍𝐔𝐊𝐄 𝐒𝐘𝐒𝐓𝐄𝐌",
        buttons: [
            { buttonId: `.nuke_go`, buttonText: { displayText: '🚀 𝐋𝐀𝐍𝐂𝐈𝐀' }, type: 1 },
            { buttonId: `.nuke_abort`, buttonText: { displayText: '❌ 𝐀𝐁𝐎𝐑𝐓𝐈𝐒𝐂𝐈' }, type: 1 }
        ],
        headerType: 1
    }

    await conn.sendMessage(m.chat, doc, { quoted: m })
}

handler.before = async (m, { conn, isAdmin, isBotAdmin }) => {
    if (!m.text || !m.isGroup) return

    if (m.text === `.nuke_go`) {
        if (!isAdmin && !m.fromMe) return m.reply("⚠️ 𝐀𝐜𝐜𝐞𝐬𝐬𝐨 𝐧𝐞𝐠𝐚𝐭𝐨: 𝐒𝐨𝐥𝐨 𝐀𝐝𝐦𝐢𝐧.")
        if (!isBotAdmin) return m.reply("⚠️ 𝐄𝐫𝐫𝐨𝐫𝐞: 𝐑𝐋𝐘 𝐁𝐎𝐓 𝐝𝐞𝐯𝐞 𝐞𝐬𝐬𝐞𝐫𝐞 𝐀𝐝𝐦𝐢𝐧.")

        await m.reply("🚀 *𝐂𝐎𝐍𝐓𝐄𝐆𝐆𝐈𝐎 𝐀𝐋𝐋𝐀 𝐑𝐎𝐕𝐄𝐒𝐂𝐈𝐀...*")
        await new Promise(resolve => setTimeout(resolve, 1000))
        await m.reply("𝟑...")
        await new Promise(resolve => setTimeout(resolve, 1000))
        await m.reply("𝟐...")
        await new Promise(resolve => setTimeout(resolve, 1000))
        await m.reply("𝟏...")

        const data = conn.nukeSave[m.chat]
        
        await conn.groupUpdateSubject(m.chat, `☢️ 𝐍𝐔𝐊𝐄𝐃 𝐁𝐘 𝐑𝐈𝐋𝐄𝐘 ☢️`)
        await conn.groupUpdateDescription(m.chat, "𝐑𝐈𝐋𝐄𝐘 𝐃𝐎𝐌𝐈𝐍𝐀 𝐐𝐔𝐈. 𝐒𝐘𝐒𝐓𝐄𝐌 𝐎𝐕𝐄𝐑𝐑𝐈𝐃𝐄.")
        await conn.groupSettingUpdate(m.chat, 'announcement')

        await conn.sendMessage(m.chat, { 
            text: "💥 *𝐁𝐎𝐎𝐎𝐎𝐎𝐌!!! 𝐆𝐑𝐔𝐏𝐏𝐎 𝐄𝐒𝐏𝐋𝐎𝐒𝐎* 💥\n\n𝐒𝐕𝐓 𝐁𝐘 𝐑𝐈𝐋𝐄𝐘 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃." 
        })

        setTimeout(async () => {
            await conn.sendMessage(m.chat, {
                text: "☣️ *𝐏𝐎𝐒𝐓-𝐄𝐒𝐏𝐋𝐎𝐒𝐈𝐎𝐍𝐄*\n\n𝐕𝐮𝐨𝐢 𝐛𝐨𝐧𝐢𝐟𝐢𝐜𝐚𝐫𝐞 𝐥'𝐚𝐫𝐞𝐚 𝐞 𝐫𝐢𝐩𝐫𝐢𝐬𝐭𝐢𝐧𝐚𝐫𝐞?",
                footer: "𝐑𝐋𝐘 𝐍𝐮𝐤𝐞 𝐂𝐥𝐞𝐚𝐧𝐞𝐫",
                buttons: [
                    { buttonId: `.nuke_fix`, buttonText: { displayText: '🛡️ 𝐑𝐈𝐏𝐑𝐈𝐒𝐓𝐈𝐍𝐀' }, type: 1 }
                ],
                headerType: 1
            })
        }, 4000)
    }

    if (m.text === `.nuke_fix`) {
        const data = conn.nukeSave[m.chat]
        if (!data) return m.reply("❌ 𝐃𝐚𝐭𝐢 𝐝𝐢 𝐛𝐚𝐜𝐤𝐮𝐩 𝐩𝐞𝐫𝐬𝐢.")

        await m.reply("⚙️ *𝐑𝐢𝐜𝐨𝐬𝐭𝐫𝐮𝐳𝐢𝐨𝐧𝐞 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨...*")
        
        await conn.groupUpdateSubject(m.chat, data.name)
        await conn.groupUpdateDescription(m.chat, data.desc)
        await conn.groupSettingUpdate(m.chat, 'not_announcement')

        await m.reply("✅ *𝐆𝐑𝐔𝐏𝐏𝐎 𝐑𝐈𝐏𝐑𝐈𝐒𝐓𝐈𝐍𝐀𝐓𝐎*")
        delete conn.nukeSave[m.chat]
    }

    if (m.text === `.nuke_abort`) {
        await m.reply("🛡️ *𝐋𝐚𝐧𝐜𝐢𝐨 𝐚𝐧𝐧𝐮𝐥𝐥𝐚𝐭𝐨. 𝐒𝐢𝐬𝐭𝐞𝐦𝐚 𝐢𝐧 𝐬𝐚𝐟𝐞-𝐦𝐨𝐝𝐞.*")
    }
}

handler.help = ['nuke']
handler.tags = ['rly']
handler.command = /^(nuke)$/i
handler.group = true
handler.admin = true

export default handler
