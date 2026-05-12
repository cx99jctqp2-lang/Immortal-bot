let handler = async (m, { conn, args, command }) => {
await m.reply('`_𝐑𝐋𝐘 𝐁𝐎𝐓 ha abbandonato il gruppo correttamente_`') 
await  conn.groupLeave(m.chat)}
handler.command = /^(out|esci|leave|salirdelgrupo)$/i
handler.group = true
handler.rowner = true
export default handler
