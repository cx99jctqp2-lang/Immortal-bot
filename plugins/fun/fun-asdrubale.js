let handler = async (m, { conn }) => {

  const testo = `*asdrubale sto coglione ha una palla storta e un dente nel naso ma gli voglio tanto bene al mio hackerino stronzo preferito melo chiavo tutti giorni*`;

  await conn.sendMessage(
    m.chat,
    {
      text: testo
    },
    { quoted: m }
  );
};

handler.help = ['asdrubale'];
handler.tags = ['giochi'];
handler.command = ['asdrubale'];

export default handler;
