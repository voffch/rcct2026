import { onMounted, onUnmounted } from 'vue';

export function usePolling(callback, timeout=5000) {
  let timeoutId = null;
  let isActive = true; // prevents a race condition if unmounted during an active fetch

  const poll = async () => {
    if (!isActive) return;
    const shouldContinue = await callback();
    
    // schedule the next run only if the component is still mounted
    if (isActive && shouldContinue) {
      timeoutId = setTimeout(poll, timeout);
    }
  }

  onMounted(() => {
    poll();
  });

  onUnmounted(() => {
    isActive = false;
    clearTimeout(timeoutId);
  });
}
