//plugin by Giuse
let handler = async (m, { conn }) => {

    // Newsletter globale ChatUnity
    const cuContext = {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363259442839354@newsletter',
            serverMessageId: 100,
            newsletterName: `𝐑𝐋𝐘𝐁𝐎𝐓-𝐌𝐃 ⸸ Staff Ufficiale`
        }
    };

    // Schede di contatto (vCard)
    const vcards = [
        { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Vale | 𝚁𝚒𝚕𝚎𝚢;;;\nFN:Vale | 𝙾𝚆𝙽\nORG:𝐑𝐥𝐲𝐁𝐨𝐭\nTITLE:CEO\nitem1.TEL;waid=81 8016522578\nitem1.X-ABLabel:Cellulare\nEND:VCARD` },
        { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Diego;;;\nFN:𝙻𝚎𝚡𝚊\nORG:𝐑𝐥𝐲𝐁𝐨𝐭\nTITLE:Staff\nitem1.TEL;waid=81 70-9491-4530\nitem1.X-ABLabel:Cellulare\nEND:VCARD` },
        { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Matte;;;\nFN:𝙸𝚖𝚖𝚘𝚛𝚝𝚊𝚕\nORG:𝐑𝐥𝐲𝐁𝐨𝐭\nTITLE:Staff\nitem1.TEL;waid=90 534 862 29 18\nitem1.X-ABLabel:Cellulare\nEND:VCARD` },
        { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Giuse;;;\nFN:𝙴𝚗𝚍𝚢\nORG:𝐑𝐥𝐲𝐁𝐨𝐭\nTITLE:Staff\nitem1.TEL;waid=39 350 198 9497\nitem1.X-ABLabel:Cellulare\nEND:VCARD` }
    ];

    // Testo elegante con i numeri in chiaro
    let testo = `
୧・︶ ⸸ 𝐑𝐋𝐘𝐁𝐎𝐓-𝐌𝐃 ⸸ ︶・୨
꒷꒦ ‧₊ 🛡️ 𝐒 𝐓 𝐀 𝐅 𝐅 🛡️ ₊‧ ꒷꒦
୧・︶ : ︶ : ︶ : ︶ : ︶ : ︶・୨

⸸ 👑 +81 8016522578 ~ Riley |OWN|
⸸ 👨‍💻 +39 350 198 9497 ~ endy
⸸ 👨‍💻 +81 70-9491-4530 ~ lexa
⸸ 👨‍💻 +90 534 862 29 18 ~ immortal

👑 _Il team dietro 𝐑𝐋𝐘𝐁𝐎𝐓-𝐌𝐃._
୧・︶ : ︶ ꒷꒦ ‧₊ ୧`.trim();

    // 1. Invia le schede contatto (rubrica)
    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: 'Staff 𝐑𝐋𝐘𝐁𝐎𝐓-𝐌𝐃',
            contacts: vcards
        },
        contextInfo: cuContext
    }, { quoted: m });

    // 2. Invia il testo stilizzato
    await conn.sendMessage(m.chat, {
        text: testo,
        contextInfo: cuContext
    });

};

handler.help = ['staff', 'owner', 'creatori'];
handler.tags = ['info'];
handler.command = /^(staff|owner|creatori|founder)$/i;

export default handler;
