const API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:3000";

export const callApi = (token?: string) => async (route: string) => {
  if (token) {
    const response = await fetch(`${API_ENDPOINT}${route}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } else throw new Error("no auth token");
};
