import { Workbox } from 'workbox-window';
import { getUrlsTOCache } from './getUrlsToCashe';

type WindowType = Window & { workbox: Workbox };

export const precachePages = async (pages: string[]) => {
  try {
    if (
      typeof window !== 'undefined'
      && 'serviceWorker' in navigator
      && (window as unknown as WindowType).workbox !== undefined
    ) {
      const wb: Workbox = new Workbox('./sw.js');
      const urlsToCache = await getUrlsTOCache(pages);
      wb.messageSW({
        type: 'CACHE_URLS',
        payload: {
          urlsToCache,
        },
      });
      wb.register();
    }
  } catch (e) {
    console.log('something gone wrong with precache pages: ', e.message);
  }
};
