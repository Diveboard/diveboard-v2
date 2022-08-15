import { useEffect, useState } from 'react';

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number }>();

  const showPosition = (position) => {
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }, []);

  return userLocation;
};
