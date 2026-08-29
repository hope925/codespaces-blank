import express from 'express'
import cors from 'cors'
import webpush from 'web-push'

const app = express()
const port = process.env.PORT || 3001

const vapidKeys = {
  publicKey: 'BHget84JV6pgVhuFvx_mSEVLyq2ONyZ4dBmBlPuUfi-M-xYu-ax0ss-UlHr19FOI9D--faMR1_4eAu3fKhHcenI',
  privateKey: 'jWH1vPSxv5RJrg6UvoJLzqFNIkTyHDaFN_oqW6gcPZI',
}

webpush.setVapidDetails(
  'mailto:alert@watchoutja.local',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
)

app.use(cors())
app.use(express.json())

const subscriptions = []

app.get('/api/public-key', (_req, res) => {
  res.json({ publicKey: vapidKeys.publicKey })
})

app.post('/api/subscribe', (req, res) => {
  const { subscription } = req.body ?? {}

  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: 'Subscription required' })
  }

  if (!subscriptions.some((item) => item.endpoint === subscription.endpoint)) {
    subscriptions.push(subscription)
  }

  return res.status(201).json({ ok: true })
})

app.post('/api/send-alert', async (req, res) => {
  const { title, body, data } = req.body ?? {}

  if (!subscriptions.length) {
    return res.status(202).json({ ok: true, queued: 0 })
  }

  const payload = JSON.stringify({
    title: title || 'Watch Out JA Alert',
    body: body || 'An emergency update is available.',
    data: data || { url: '/#/alerts' },
  })

  const sendResults = await Promise.allSettled(
    subscriptions.map((subscription) => webpush.sendNotification(subscription, payload)),
  )

  const delivered = sendResults.filter((result) => result.status === 'fulfilled').length
  return res.json({ ok: true, delivered, total: subscriptions.length })
})

app.get('/health', (_req, res) => {
  res.json({ ok: true, subscriptions: subscriptions.length })
})

app.listen(port, () => {
  console.log(`Watch Out JA push server listening on http://localhost:${port}`)
})
