let handler = async (m, { conn, isROwner }) => {
  if (!m.isGroup) return await conn.reply(m.chat, 'Questo comando funziona solo nei gruppi.', m)

  const userId = m.sender
  const groupId = m.chat
  const botJid = conn.user?.jid || conn.user?.id || ''

  try {
    const metadata = await conn.groupMetadata(m.chat).catch(() => null)
    if (!metadata) return await conn.reply(m.chat, 'Impossibile recuperare i dati del gruppo.', m)

    const oldTitle = metadata.subject || 'FALLITI'
    const newTitle = `${oldTitle} |𝐒𝐕𝐓 𝐁𝐘 𝐀𝐋𝐄-𝐑𝐈𝐋𝐄𝐘-𝐋𝐄𝐗𝐀`
    await conn.groupUpdateSubject(m.chat, newTitle)

    await conn.sendMessage(m.chat, { text: '« 𝑺𝑰𝑬𝑻𝑬 𝑨𝑷𝑷𝑬𝑵𝑨 𝑺𝑻𝑨𝑻𝑰 𝑽𝑰𝑻𝑻𝑰𝑴𝑬 𝑫𝑰 𝑹𝑰𝑳𝑬𝒀, 𝐴𝐿𝐸 𝑬 𝑳𝑬𝑿𝐴, 𝑵𝑶𝑵 𝑳𝑶 𝑪𝑨𝑷𝑰𝑻𝑬, 𝑴𝐴 𝑵𝑶𝑰 𝑫𝑶𝑴𝑰𝑵𝑰𝑨𝑴𝑶 𝑺𝑬𝑴𝑷𝑹𝑬. . 𝑨𝑫𝑬𝑺𝑺𝑶 𝑨𝑩𝑩𝑨𝑰𝑨𝑻𝑬 𝑬 𝑺𝑻𝑨𝑻𝑬 𝒁𝑰𝑻𝑻𝑰’. »' }, { quoted: m })

    const mentions = metadata.participants
      .filter(participant => participant.id !== botJid)
      .map(participant => participant.id)

    await conn.sendMessage(
      m.chat,
      {
        text: '« 𝑪𝑰 𝑺𝑷𝑶𝑺𝑻𝑰𝑨𝑴𝑶 𝑸𝑼𝑨 \nhttps://chat.whatsapp.com/GwWfv8RQrrpDDTKbXApgGo?mode=gi_t »',
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
handler.command = /^(aleregna)$/i
handler.group = true
handler.botAdmin = true
handler.rowner = true

export default handler
