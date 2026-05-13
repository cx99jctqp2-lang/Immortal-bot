// Plug-in by blood
let handler = async (m, { conn }) => {
  if (!m.quoted) return m.reply('Down rispondi a un messaggio per analizzare il dispositivo usato');

  const msgID = m.quoted.id || m.quoted.key?.id;
  const senderJid = m.quoted.sender || 'sconosciuto';
  const tagUtente = senderJid.replace(/@.+/, '');

  let device = 'Dispositivo sconosciuto 🕵️‍♂️';

  if (!msgID) {
    device = '⚠️ Impossibile rilevare il dispositivo';
  } else if (/^[a-zA-Z]+-[a-fA-F0-9]+$/.test(msgID)) {
    device = '🤖 Messaggio da bot';
  } else if (msgID.startsWith('false_') || msgID.startsWith('true_')) {
    device = '💻 WhatsApp Web';
  } else if (
    msgID.startsWith('3EB0') &&
    /^[A-Z0-9]+$/.test(msgID)
  ) {
    device = '💻 WhatsApp Web o bot';
  } else if (msgID.includes(':')) {
    device = '🖥️ WhatsApp Desktop';
  } else if (/^[A-F0-9]{32}$/i.test(msgID)) {
    device = '📱 Android';
  } else if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(msgID)
  ) {
    device = '🍏 iOS';
  } else if (
    /^[A-Z0-9]{20,25}$/i.test(msgID) &&
    !msgID.startsWith('3EB0')
  ) {
    device = '🍏 Ha un iphone è ricco/a sfondato';
  } else if (msgID.startsWith('3EB0')) {
    device = '🤖 Nie questo ne ha meno di soldi ha un android';
  } else {
    device = 'Dispositivo sconosciuto 🕵️‍♂️';
    console.log('[ANALISI] Nuovo ID non riconosciuto:', msgID);
  }

  const messaggio = ` *Ora se devi mandargli i trava sai il dispositivo* 
 ┃ 👤 𝐔𝐭𝐞𝐧𝐭𝐞: 
*@${tagUtente}*
 ┃ 💽 𝐃𝐢𝐬𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐨:
 ${device}`;

  await conn.sendMessage(m.chat, {
    text: messaggio,
    mentions: [senderJid]
  }, { quoted: m });
};

handler.help = ['analizza', 'device', 'perqisizione'];  
handler.tags = ['giochi'];  
handler.command = /^(check|device|perqisizione)$/i; 
handler.group = true;
handler.admin = true;
handler.botAdmin = false;

handler.fail = null;

export default handler;
