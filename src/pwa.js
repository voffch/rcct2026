import { registerSW } from 'virtual:pwa-register';

if ('serviceWorker' in navigator) {
  let refreshing = false;
  let isFirstInstall = !navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', async () => {
    if (refreshing) {
      return;
    }
    if (isFirstInstall) {
      console.log('PWA: fresh install, skipping reload');
      isFirstInstall = false;
      return;
    }
    refreshing = true;
    console.log('PWA: controller changed, reloading');
    window.location.reload();
  });
}

registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl) {
    console.log('PWA: SW registered: ', swScriptUrl);
  },
  onOfflineReady() {
    console.log('PWA: ready to work offline');
  },
  onNeedRefresh() {
    // fallback - shouldn't fire with autoUpdate
    window.location.reload(); 
  }
});