// Saves contact form messages to this Google Sheet and emails you each one.
// Setup steps are in README.md. No address is written here: the email goes to
// the Google account that deploys the script.

const HEADERS = ['Received', 'Topic', 'Name', 'Email', 'Message']
const MAX_PER_HOUR = 30

function doPost(e) {
  const lock = LockService.getScriptLock()
  try {
    lock.waitLock(10000)
    const data = JSON.parse(e.postData.contents)
    const row = {
      topic: clean(data.topic, 60),
      name: clean(data.name, 80),
      email: clean(data.email, 120),
      message: clean(data.message, 3000),
    }
    if (!row.name || row.message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
      return reply({ ok: false, error: 'invalid' })
    }
    if (overLimit()) return reply({ ok: false, error: 'busy' })

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS)
    sheet.appendRow([new Date(), safe(row.topic), safe(row.name), safe(row.email), safe(row.message)])

    // The row is already saved, so a mail problem must not look like a failure.
    try {
      MailApp.sendEmail({
        to: Session.getEffectiveUser().getEmail(),
        replyTo: row.email,
        subject: 'Portfolio message from ' + row.name.replace(/[\r\n]+/g, ' '),
        body: row.topic + '\n\n' + row.message + '\n\n' + row.name + '\n' + row.email,
      })
    } catch (mailError) {
      console.error(mailError)
    }
    return reply({ ok: true })
  } catch (error) {
    console.error(error)
    return reply({ ok: false, error: 'failed' })
  } finally {
    lock.releaseLock()
  }
}

function clean(value, max) {
  return String(value || '').trim().slice(0, max)
}

// Stops a message such as "=IMPORTXML(...)" from running as a formula.
function safe(value) {
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value
}

function overLimit() {
  const cache = CacheService.getScriptCache()
  const count = Number(cache.get('count') || 0)
  if (count >= MAX_PER_HOUR) return true
  cache.put('count', String(count + 1), 3600)
  return false
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON)
}
