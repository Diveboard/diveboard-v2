export const getPredictions = async (place: string) => {
  const res = await fetch(`/api/predictions?place=${place}`);
  return res.json();
};

export const getLocation = async (placeId: string) => {
  const res = await fetch(`/api/location?placeId=${placeId}`);
  return res.json();
};
