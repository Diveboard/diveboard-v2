import { Workbox } from 'workbox-window';

export const deleteCache = async () => {
  if ('serviceWorker' in navigator) {
    const wb: Workbox = new Workbox('./sw.js');
    await caches.delete('next-data');
    wb.register();
  }
};

export const refreshCache = async () => {
  if ('serviceWorker' in navigator) {
    const wb: Workbox = new Workbox('./sw.js');
    await caches.delete('next-data');
    await caches.delete('others');
    wb.register();
  }
};
