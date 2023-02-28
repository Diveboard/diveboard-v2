import { Workbox } from 'workbox-window';

export const deleteCache = async () => {
  if ('serviceWorker' in navigator) {
    const wb: Workbox = new Workbox('./sw.js');
    caches.delete('next-data').then(() => {
      wb.register();
    });
  }
};
