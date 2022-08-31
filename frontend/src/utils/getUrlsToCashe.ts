export const getUrlsTOCache = async (pages: string[]) => {
  const manifestResponse = await fetch('/build-manifest.json');
  const manifest = await manifestResponse.json();
  const precachePagesData = pages.reduce((pagesData, currentPage) => {
    const currentPageData = [`${location.origin}${currentPage}`,
      ...manifest.pages[currentPage]
        .map((path: string) => `${location.origin}/_next/${path}`)];
    return [...pagesData, ...currentPageData];
  }, [] as string[]);

  return [
    ...precachePagesData,
  ];
};
