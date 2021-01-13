const API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:3000";

export const callApi = async (route: string) => {
  const response = await fetch(`${API_ENDPOINT}${route}`);
  return await response.json();
};
