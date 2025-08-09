export const getBaseUrl = () => {
  return import.meta.env.VITE_PUBLIC_SERVER_URL;
};

export const getImageUrl = () => {
  return import.meta.env.VITE_PUBLIC_IMAGE_URL;
};

export const getSocketUrl = () => {
  return import.meta.env.VITE_PUBLIC_SOCKET_URL;
};

export const googleMapsApiKey = () => {
  return import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY;
};
