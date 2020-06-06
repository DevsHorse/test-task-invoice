export const setCookie = (key: string, value: string, year: number, month: number, day: number): void => {
  let cookieStr = encodeURI(key) + '=' + encodeURI(value);

  if (year) {
    const expires = new Date(year, month-1, day);
    cookieStr += '; expires=' + encodeURI(expires.toUTCString());
  }

  document.cookie = cookieStr;
};

export const getAuthCookie = (): object => {
  const regAuth = /^auth=/;
  const auth = decodeURI(document.cookie).split('; ').filter(cookie => {
    if (regAuth.test(cookie)) {
      return cookie;
    }
  });

  if (auth.length) {
    return JSON.parse(auth.join().split('=')[1]);
  } else {
    return {};
  }
};