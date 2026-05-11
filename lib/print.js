import { WAMessageStubType } from '@chatunity/baileys'
import chalk from 'chalk'
import { watchFile } from 'fs'
import { fileURLToPath } from 'url'

const nameCache = new Map()
const CACHE_TTL = 300000

async function getCachedName(conn, jid) {
  if (!jid) return null
  const cached = nameCache.get(jid)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) return cached.name
  try {
    const name = await Promise.race([
      conn.getName(jid),
      new Promise((resolve) => setTimeout(() => resolve(null), 100))
    ])
    nameCache.set(jid, { name, timestamp: Date.now() })
    return name
  } catch { return null }
}

function getMentionedJids(m) {
  try {
    const desc = Object.getOwnPropertyDescriptor(m, 'mentionedJid')
    if (desc && 'value' in desc) return desc.value || []
    return m.mentionedJid || []
  } catch { return [] }
}

function getJidUser(jid) {
  return typeof jid === 'string' ? jid.split('@')[0].split(':')[0] : ''
}

export default async function (m, conn = { user: {} }) {
  try {
    let sender = m.sender
    if (m.key?.participant) sender = m.key.participant

    let resolvedSender = conn.decodeJid ? conn.decodeJid(sender) : sender
    if (/@lid/.test(resolvedSender) && m.key?.senderPn) resolvedSender = m.key.senderPn

    const [senderName, chatName] = await Promise.all([
      getCachedName(conn, resolvedSender),
      getCachedName(conn, m.chat)
    ])

    let displaySender = '+' + resolvedSender.replace('@s.whatsapp.net', '').replace('@lid', '') + (senderName ? ' ~ ' + senderName : '')
    let filesize = (m.msg?.fileLength?.low || m.msg?.fileLength || m.text?.length || 0)
    let me = '+' + (conn.user?.jid || '').replace('@s.whatsapp.net', '')
    const userName = conn.user.name || conn.user.verifiedName || "Sconosciuto"

    if (resolvedSender === conn.user?.jid) return

    const b1 = chalk.blue.bold('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓')
    const b2 = chalk.blue.bold('┃')
    const b3 = chalk.blue.bold('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛')
    const title = chalk.cyan.bold(' ℝ𝕃𝕐 𝔹𝕆𝕋 - 𝕊𝕐𝕊𝕋𝔼𝕄 𝕃𝕆𝔾 ')

    console.log(`${b1}
${b2} ${title}
${b2} ${chalk.blueBright('🆔 Bot:')} ${chalk.white(me)} ${chalk.cyan('(' + userName + ')')}
${b2} ${chalk.blueBright('🕒 Ora:')} ${chalk.white(new Date().toLocaleTimeString())}
${b2} ${chalk.blueBright('👤 Da:')} ${chalk.cyan(displaySender)}
${b2} ${chalk.blueBright('💬 Chat:')} ${chalk.white(chatName || m.chat)} ${m.isGroup ? chalk.blue('[G]') : chalk.blue('[P]')}
${b2} ${chalk.blueBright('📦 Tipo:')} ${chalk.white(m.mtype?.replace(/message$/i, '') || 'Testo')}
${b2} ${chalk.blueBright('⚖️ Dim:')} ${chalk.white((filesize / 1024).toFixed(1) + ' KB')}
${b3}`)

    if (typeof m.text === 'string' && m.text) {
      let displayText = m.text
      const mentionedJids = getMentionedJids(m)

      if (mentionedJids.length > 0) {
        const replacements = []
        for (const [index, id] of mentionedJids.entries()) {
          try {
            let mentionJid = conn.decodeJid ? conn.decodeJid(id) : id
            let displayNum = getJidUser(mentionJid)
            let name = await getCachedName(conn, mentionJid) || displayNum
            replacements[index] = chalk.blueBright('@' + name)
          } catch {}
        }
        let replacementIndex = 0
        displayText = displayText.replace(/@(\d{5,})/g, (full) => replacements[replacementIndex++] || full)
      }

      const logColor = m.error != null ? chalk.red : m.isCommand ? chalk.cyan.bold : chalk.white
      console.log(chalk.blue('  ➡ ') + logColor(displayText))
    }

    if (m.messageStubParameters?.length > 0) {
      const decoded = await Promise.all(m.messageStubParameters.map(async jid => {
        let resolvedJid = conn.decodeJid ? conn.decodeJid(jid) : jid
        const name = await getCachedName(conn, resolvedJid)
        return chalk.blueBright('+' + resolvedJid.replace('@s.whatsapp.net', '') + (name ? ' (' + name + ')' : ''))
      }))
      console.log(chalk.blue('  ⚙️ Evento: ') + decoded.join(', '))
    }

    if (/document/i.test(m.mtype)) console.log(chalk.cyan(`  📄 Doc: ${m.msg.fileName || 'Documento'}`))
    else if (/audio/i.test(m.mtype)) console.log(chalk.cyan(`  🎵 Audio: ${m.msg.ptt ? 'PTT' : 'Brano'}`))

    console.log()
  } catch {}
}

const __filename = fileURLToPath(import.meta.url)
watchFile(__filename, () => {
  console.log(chalk.cyan.bold("🔄 RLY BOT: Modulo 'print.js' aggiornato!"))
})
