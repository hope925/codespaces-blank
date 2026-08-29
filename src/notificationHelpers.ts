export type NotificationPermissionState = 'default' | 'granted' | 'denied' | 'unsupported'

export function getNotificationPermissionState(): NotificationPermissionState {
  if (!('Notification' in window)) return 'unsupported'
  return Notification.permission as NotificationPermissionState
}

export function getAlertDeepLink(route: string = 'alerts'): string {
  return `/#/${route}`
}

export function getSmsFallbackLink(alertTitle: string, alertSummary: string): string {
  const message = encodeURIComponent(`${alertTitle}: ${alertSummary}`)
  return `sms:?&body=${message}`
}

export function isNotificationSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator
}
