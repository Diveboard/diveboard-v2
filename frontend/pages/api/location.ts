const handler = async (req, res) => {
  const { placeId } = req.query;

  const result = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`);
  const location = await result.json();

  if (location.status === 'OK') {
    res.status(200)
      .json(location.result.geometry.location);
  } else {
    res.status(500)
      .json({ message: 'something went wrong' });
  }
};

export default handler;
