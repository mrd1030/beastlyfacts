const isNode = typeof window === 'undefined';

// Simple storage fallback for SSR
const storage = isNode 
  ? { getItem: () => null, setItem: () => {}, removeItem: () => {} } 
  : window.localStorage;

const getAppParamValue = (paramName, defaultValue = null) => {
  if (isNode) return defaultValue;

  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get(paramName);

  if (searchParam) {
    storage.setItem(paramName, searchParam);
    return searchParam;
  }

  const storedValue = storage.getItem(paramName);
  if (storedValue) return storedValue;

  return defaultValue;
};

export const appParams = {
  appId: getAppParamValue("app_id", import.meta.env.VITE_APP_ID || null),
  token: getAppParamValue("access_token"),
  fromUrl: getAppParamValue("from_url", window.location.href),
  
  // You can add more custom params here later
  siteName: "Beastly Facts",
  siteUrl: "https://beastlyfacts.com",
};
