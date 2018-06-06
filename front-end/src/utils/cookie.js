const deleteCookie = (key) => {
  document.cookie = `${key}=; expires= Thu, 01 Jan 1970 00:00:00 GMT`;
};

const fetchCookie = (key) => {
  const cookies = document.cookie.split(';');

  for (const cookie of cookies) { // eslint-disable-line
    const [cookieKey, cookieValue] = cookie.split('=');

    if (key === cookieKey.trim()) { // trim removes the spaces around the cookie
      return cookieValue;
    }
  }
  return null;
};

export { deleteCookie, fetchCookie };
