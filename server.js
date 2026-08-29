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

const stories = []

app.get('/api/stories', (_req, res) => {
  const publishedStories = stories.filter((s) => s.status === 'approved')
  const pendingCount = stories.filter((s) => s.status === 'pending').length
  res.json({ stories: publishedStories, pendingCount })
})

app.post('/api/stories', (req, res) => {
  const story = req.body
  if (!story || !story.id) {
    return res.status(400).json({ error: 'Story data required' })
  }
  stories.push(story)
  res.status(201).json(story)
})

app.post('/api/stories/:id/approve', (req, res) => {
  const story = stories.find((s) => s.id === req.params.id)
  if (!story) {
    return res.status(404).json({ error: 'Story not found' })
  }
  story.status = 'approved'
  res.json(story)
})

app.post('/api/stories/:id/reject', (req, res) => {
  const story = stories.find((s) => s.id === req.params.id)
  if (!story) {
    return res.status(404).json({ error: 'Story not found' })
  }
  story.status = 'rejected'
  res.json(story)
})

const shelterCapacities = {}

app.get('/api/shelters', (_req, res) => {
  const shelterData = [
    { id: 'st-jago', name: 'St. Jago High School', parish: 'St. Catherine', type: 'School', address: 'Spanish Town, St. Catherine', coordinates: { lat: 18.0179, lng: -76.8149 }, status: 'Open', totalCapacity: 120, currentOccupancy: shelterCapacities['st-jago'] || 45, features: ['Accessible', 'Medical support', 'Kitchen', 'Water'], phone: '(876) 984-2341', evacuationRoutes: ['Main: via Spanish Town Road', 'Secondary: via Caymanas Estate Road', 'Emergency: by bridge to Mona'], lastUpdated: Date.now() },
    { id: 'mona-high', name: 'Mona High School', parish: 'St. Andrew', type: 'School', address: 'Mona, Kingston', coordinates: { lat: 18.0063, lng: -76.8043 }, status: 'Open', totalCapacity: 80, currentOccupancy: shelterCapacities['mona-high'] || 28, features: ['Medical support', 'Kitchen', 'Parking'], phone: '(876) 927-3456', evacuationRoutes: ['Main: via Hope Road', 'Secondary: via Old Hope Road'], lastUpdated: Date.now() },
    { id: 'national-arena', name: 'National Arena', parish: 'Kingston', type: 'Sports facility', address: 'Stadium Lane, Kingston', coordinates: { lat: 18.0099, lng: -76.8242 }, status: 'At capacity', totalCapacity: 500, currentOccupancy: shelterCapacities['national-arena'] || 500, features: ['Accessible', 'Pet-friendly', 'Medical support', 'Kitchen'], phone: '(876) 929-4411', evacuationRoutes: ['Main: via Windward Road', 'Secondary: via Harbour Street'], lastUpdated: Date.now() },
    { id: 'jamaica-college', name: 'Jamaica College Gymnasium', parish: 'Kingston', type: 'School', address: 'Hope Road, Kingston', coordinates: { lat: 18.0029, lng: -76.8047 }, status: 'Open', totalCapacity: 200, currentOccupancy: shelterCapacities['jamaica-college'] || 62, features: ['Accessible', 'Medical support', 'Kitchen', 'Water', 'Generator'], phone: '(876) 929-0150', evacuationRoutes: ['Main: via Hope Road', 'Secondary: via Lady Musgrave Road'], lastUpdated: Date.now() },
    { id: 'portmore-high', name: 'Portmore High School', parish: 'St. Catherine', type: 'School', address: 'Portmore, St. Catherine', coordinates: { lat: 17.9783, lng: -76.8374 }, status: 'Open', totalCapacity: 150, currentOccupancy: shelterCapacities['portmore-high'] || 31, features: ['Accessible', 'Kitchen', 'Water'], phone: '(876) 905-5234', evacuationRoutes: ['Main: via Portmore Parkway', 'Secondary: via Washington Boulevard'], lastUpdated: Date.now() },
  ]
  res.json({ shelters: shelterData, capacities: shelterCapacities })
})

app.post('/api/shelters/:id/occupancy', (req, res) => {
  const { id } = req.params
  const { occupancy } = req.body ?? {}
  
  if (!occupancy || typeof occupancy !== 'number') {
    return res.status(400).json({ error: 'Occupancy number required' })
  }
  
  shelterCapacities[id] = Math.max(0, occupancy)
  res.json({ ok: true, occupancy: shelterCapacities[id] })
})

app.get('/health', (_req, res) => {
  res.json({ ok: true, subscriptions: subscriptions.length })
})

app.listen(port, () => {
  console.log(`Watch Out JA push server listening on http://localhost:${port}`)
})
