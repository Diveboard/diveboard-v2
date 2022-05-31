import { Workbox } from 'workbox-window';
import { onUserPageRedirect } from './onUserPageRedirect';

export const precachePages = (pages: string[]) => {
  type WindowType = Window & { workbox: Workbox };

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
        `${location.origin}/main/home-user`,
        ...manifest.pages['/main/home-user'].map((path: string) => `${location.origin}/_next/${path}`),
        `${location.origin}/main/home-guest`,
        ...manifest.pages['/main/home-guest'].map((path: string) => `${location.origin}/_next/${path}`),
        ...precachePagesData,
      ];
      wb.messageSW({
        type: 'CACHE_URLS',
        payload: { urlsToCache },
      });
      onUserPageRedirect();
    };

    wb.addEventListener('installed', activatePrecachePages);
    wb.register();
  }
};
