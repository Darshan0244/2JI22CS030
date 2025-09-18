export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const generateShortcode = () => {
  return Math.random().toString(36).substring(2, 8);
};

export const isValidShortcode = (shortcode) => {
  return /^[a-zA-Z0-9]+$/.test(shortcode);
};

export const isExpired = (expiryTime) => {
  return new Date() > new Date(expiryTime);
};