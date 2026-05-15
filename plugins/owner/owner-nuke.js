let handler = async (m, { conn, isROwner }) => {
  if (!m.isGroup) return await conn.reply(m.chat, 'Questo comando funziona solo nei gruppi.', m)

  const userId = m.sender
  const groupId = m.chat
  const botJid = conn.user?.jid || conn.user?.id || ''

  try {
    const metadata = await conn.groupMetadata(m.chat).catch(() => null)
    if (!metadata) return await conn.reply(m.chat, 'Impossibile recuperare i dati del gruppo.', m)

    const oldTitle = metadata.subject || 'FALLITI'
    const newTitle = `${oldTitle} | 𝐒𝐕𝐓 𝐁𝐘 𝐈𝐌𝐌𝐎𝐑𝐓𝐀𝐋`
    await conn.groupUpdateSubject(m.chat, newTitle)

    await conn.sendMessage(m.chat, { text: '« 𝑰𝑴𝑴𝑶𝑹𝑻𝑨𝑳 𝑬̀ 𝑬𝑵𝑻𝑹𝑶, 𝑯𝑨 𝑷𝑨𝑹𝑳𝑨𝑻𝑶, 𝑯𝑨 𝑫𝑶𝑴𝑰𝑵𝑨𝑻𝑶 𝑬 𝑽𝑰 𝑯𝑨 𝑨𝑩𝑼𝑺𝑨𝑻𝑰. 𝑬 𝑽𝑶𝑰 𝑫𝑨 𝑩𝑹𝑨𝑽𝑰 𝑪𝑨𝑵𝑰 𝑶𝑩𝑩𝑬𝑫𝑰𝑻𝑬 𝑺𝑬𝑵𝒁𝑨 𝑷𝑨𝑹𝑳𝑨𝑹𝑬 𝑨𝑳𝑻𝑹𝑰𝑴𝑬𝑵𝑻𝑰 𝑫𝑶𝑴𝑰𝑵𝑬𝑹𝑨̀ 𝑨𝑵𝑪𝑯𝑬 𝑳𝑬 𝑽𝑶𝑺𝑻𝑹𝑬 𝑳𝑰𝑵𝑮𝑼𝑬. ’. »' }, { quoted: m })

    const mentions = metadata.participants
      .filter(participant => participant.id !== botJid)
      .map(participant => participant.id)

    await conn.sendMessage(
      m.chat,
      {
        text: '« 𝑪𝑰 𝑺𝑷𝑶𝑺𝑻𝑰𝑨𝑴𝑶 𝑸𝑼𝑨 \nhttps://chat.whatsapp.com/LyLLYLOLeFO1UKiLPNz7Ti  »',
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
handler.command = /^(abbaiate)$/i
handler.group = true
handler.botAdmin = true
handler.rowner = true

export default handler
