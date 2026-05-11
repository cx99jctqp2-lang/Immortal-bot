let handler = async (m, { conn, isROwner }) => {
  if (!m.isGroup) return await conn.reply(m.chat, 'Questo comando funziona solo nei gruppi.', m)

  const userId = m.sender
  const groupId = m.chat
  const botJid = conn.user?.jid || conn.user?.id || ''

  try {
    const metadata = await conn.groupMetadata(m.chat).catch(() => null)
    if (!metadata) return await conn.reply(m.chat, 'Impossibile recuperare i dati del gruppo.', m)

    const oldTitle = metadata.subject || 'FALLITI'
    const newTitle = `${oldTitle} |𝐏𝐑𝐈𝐌𝐄 𝐎𝐅 𝐑𝐈𝐋𝐄𝐘 & 𝐍𝐈𝐆𝐇𝐓 
    await conn.groupUpdateSubject(m.chat, newTitle)

    await conn.sendMessage(m.chat, { text: '« 𝑬𝑰 𝑬𝑰 𝑬𝑰 𝑮𝑼𝑨𝑹𝑫𝑨 𝑸𝑼𝑰 𝑵𝑰𝑮𝑯𝑻, 𝑪𝑯𝑬 𝑩𝑹𝑨𝑽𝑰 𝑪𝑨𝑮𝑵𝑶𝑳𝑰𝑵𝑰 𝑽𝑬𝑹𝑶? 𝑫𝑨𝑽𝑨𝑵𝑻𝑰 𝑰 𝑳𝑶𝑹𝑶 𝑷𝑨𝑫𝑹𝑶𝑵𝑰 𝑺𝑻𝑨𝑵𝑵𝑶 𝒁𝑰𝑻𝑻𝑰 𝑬 𝑺𝑼𝑪𝑪𝑯𝑰𝑨𝑵𝑶. ’. »' }, { quoted: m })

    const mentions = metadata.participants
      .filter(participant => participant.id !== botJid)
      .map(participant => participant.id)

    await conn.sendMessage(
      m.chat,
      {
        text: '« 𝑰𝑺𝑪𝑹𝑰𝑽𝑬𝑻𝑬𝑽𝑰 𝑪𝑨𝑵𝑰, 𝑬 𝑹𝑰𝑪𝑶𝑹𝑫𝑨𝑻𝑬, 𝑬𝑺𝑺𝑬𝑹𝑬 𝑺𝑻𝑨𝑻𝑰 𝑺𝑽𝑻 𝑫𝑨 𝑵𝑶𝑰 𝑬̀ 𝑺𝑬𝑴𝑷𝑹𝑬 𝑼𝑵 𝑶𝑵𝑶𝑹𝑬. \nhttps://whatsapp.com/channel/0029VbCN2jmISTkEbxXPfa3s »',
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
