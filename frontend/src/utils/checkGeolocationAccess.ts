export const checkGeolocationAccess = (alert: () => void): void => {
  if (typeof window !== 'undefined') {
    navigator.permissions.query({ name: 'geolocation' })
      .then((data) => {
        if (data.state === 'denied') {
          alert();
        }
      });
  }
};
