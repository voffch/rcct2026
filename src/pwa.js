import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl) {
    console.log('SW registered: ', swScriptUrl)
  },
  onOfflineReady() {
    console.log('PWA application ready to work offline')
  },
  onNeedRefresh() {
    // fallback - shouldn't fire with autoUpdate
    window.location.reload(); 
  }
})