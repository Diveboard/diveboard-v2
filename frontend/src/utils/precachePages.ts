import { Workbox } from 'workbox-window';

type WindowType = Window & { workbox: Workbox };

export const precachePages = async (pages: string[]) => new Promise((resolve) => {
  if (
    typeof window !== 'undefined'
      && 'serviceWorker' in navigator
      && (window as unknown as WindowType).workbox !== undefined
  ) {
    const wb: Workbox = (window as unknown as WindowType).workbox;
    const activatePrecachePages = async () => {
      const manifestResponse = await fetch('/build-manifest.json');
      const manifest = await manifestResponse.json();

      const precachePagesData = pages.reduce((pagesData, currentPage) => {
        const currentPageData = [`${location.origin}${currentPage}`,
          ...manifest.pages[currentPage]
            .map((path: string) => `${location.origin}/_next/${path}`)];

        return [...pagesData, ...currentPageData];
      }, [] as string[]);

      const urlsToCache = [
        ...precachePagesData,
      ];
      wb.messageSW({
        type: 'CACHE_URLS',
        payload: { urlsToCache },
      });

      resolve('cached');
    };

    wb.addEventListener('activated', activatePrecachePages);
    wb.register();
  }
});
