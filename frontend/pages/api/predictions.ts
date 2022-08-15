const handler = async (req, res) => {
  const { place } = req.query;

  const result = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&types=geocode&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&fields=geometry`);
  const predictionsJson = await result.json();
  if (predictionsJson.status === 'OK') {
    res.status(200)
      .json(predictionsJson.predictions);
  } else if (predictionsJson.status === 'ZERO_RESULTS') {
    res.status(200)
      .json([{ place_id: '1', description: 'no results' }]);
  } else {
    res.status(500)
      .json({ message: 'something went wrong in fetch predictions' });
  }
};

export default handler;
