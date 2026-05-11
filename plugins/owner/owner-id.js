let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('⚠️ Inserisci il link del gruppo.\n\nEsempio:\n.getid https://chat.whatsapp.com/XXXXXXXXXXXX');

    // Estrae il codice invito
    let match = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]+)/);
    if (!match) return m.reply('❌ Link gruppo non valido.');

    let inviteCode = match[1];

    try {
        // Ottiene info gruppo tramite codice invito
        let groupInfo = await conn.groupGetInviteInfo(inviteCode);

        let groupId = groupInfo.id;
        let groupName = groupInfo.subject;

        await m.reply(
`✅ *Informazioni Gruppo*

📛 Nome: ${groupName}
🆔 ID: ${groupId}
🔗 Codice Invito: ${inviteCode}`
        );

    } catch (e) {
        console.error(e);
        m.reply('❌ Non riesco a ottenere l\'ID.\nForse il link è scaduto o il bot non ha accesso.');
    }
};

handler.command = ['id'];
handler.owner = true; // solo owner
handler.rowner = true;

export default handler;
