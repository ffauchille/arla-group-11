export const callApi = (token?: string) => async (route: string) => {
  if (token) {
    const response = await fetch(`http://localhost:3000${route}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } else throw new Error("no auth token");
};
