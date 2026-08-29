self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('push', (event) => {
  if (!event.data) return

  const payload = event.data.json()
  const title = payload.title || 'Watch Out JA'
  const options = {
    body: payload.body || 'Emergency update available',
    icon: '/favicon.png',
    badge: '/favicon.png',
    data: payload.data || { url: '/#/alerts' },
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/#/alerts'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const client = clients.find((item) => item.url.includes(location.origin))
      if (client) return client.focus()
      return self.clients.openWindow(url)
    }),
  )
})
