export const checkGeolocationAccess = () => {
  if (typeof window !== 'undefined') {
    navigator.permissions.query({ name: 'geolocation' })
      .then((data) => {
        if (data.state === 'denied') {
          // eslint-disable-next-line no-alert
          alert('site need permission for access to geolocation, check this in browser settings');
        }
      });
  }
};
