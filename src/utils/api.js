const rawApiUrl = process.env.REACT_APP_API_URL || "https://ancient-woodland-05995-715624a89d87.herokuapp.com";

export const API_URL = rawApiUrl.replace(/\/$/, "");

export const apiUrl = (path = "") => {
  if (!path) {
    return API_URL;
  }

  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
};