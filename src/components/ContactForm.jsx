import { useRef, useState } from 'react'
import { contact, formUrl } from '../content'

const TOPICS = ['Something to build', 'Something to study', 'Just saying hello']
const whatsappLink = (text) => `${contact.whatsapp}?text=${encodeURIComponent(text)}`
const compose = (v) => `${v.topic}\n\n${v.message}\n\n${v.name}\n${v.email}`

// Posts straight from the browser to a Google Sheet. See google-sheet/README.md.
// Until formUrl is set, the same form opens WhatsApp with the message filled in.
export function ContactForm({ onSent }) {
  const [state, setState] = useState('idle') // idle, sending, sent, failed
  const [values, setValues] = useState(null)
  const formRef = useRef(null)

  const submit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    if (data.website) return setState('sent') // filled only by bots
    delete data.website
    setValues(data)

    if (!formUrl) {
      open(whatsappLink(compose(data)), '_blank', 'noopener')
      return
    }

    setState('sending')
    const abort = new AbortController()
    const timer = setTimeout(() => abort.abort(), 20000)
    try {
      // text/plain keeps this a simple request, which Apps Script needs.
      const res = await fetch(formUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data),
        signal: abort.signal,
      })
      const reply = await res.json()
      if (!res.ok || !reply.ok) throw new Error(reply.error || 'not saved')
      formRef.current.reset()
      setState('sent')
      onSent()
    } catch {
      setState('failed')
    } finally {
      clearTimeout(timer)
    }
  }

  if (state === 'sent') {
    return (
      <div className="form form-done" role="status">
        <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 25l10 10 18-21" /></svg>
        <h3>Message received</h3>
        <p>Thank you. I will reply to the address you gave.</p>
        <button type="button" className="btn btn-outline-dark" onClick={() => setState('idle')}>Write another</button>
      </div>
    )
  }

  const busy = state === 'sending'
  return (
    <form ref={formRef} className="form" onSubmit={submit} aria-label="Contact form">
      <fieldset>
        <legend>What is it about?</legend>
        <div className="topics">
          {TOPICS.map((t, i) => (
            <label key={t} className="topic">
              <input type="radio" name="topic" value={t} defaultChecked={i === 0} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="form-pair">
        <label className="field">
          <span>Your name</span>
          <input name="name" autoComplete="name" required maxLength={80} />
        </label>
        <label className="field">
          <span>Your email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={120} />
        </label>
      </div>
      <label className="field">
        <span>Message</span>
        <textarea name="message" rows={5} required minLength={10} maxLength={3000} />
      </label>
      <label className="trap" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button type="submit" className={busy ? 'btn btn-orange sending' : 'btn btn-orange'} disabled={busy}>
        {busy ? 'Sending' : formUrl ? 'Send message' : 'Send on WhatsApp'}
      </button>
      <p className="form-note" role="status">
        {state === 'failed' && values && (
          <>
            I could not confirm that your message arrived. You can try again, or{' '}
            <a href={whatsappLink(compose(values))} target="_blank" rel="noreferrer">send it on WhatsApp</a>.
          </>
        )}
      </p>
    </form>
  )
}
