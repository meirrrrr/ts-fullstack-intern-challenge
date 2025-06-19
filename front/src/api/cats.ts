import { catsApiInstance } from "./axios";

const API_KEY =
  "live_LPSKueMvMxePXWmuh2AYbpz2VOtOzQB3yc2BJnt5MJ0LYurRlSApO8z7uHbrnsSw";

export const fetchCats = async (limit: number) => {
  if (limit <= 0) {
    throw new Error("Limit must be a positive number");
  }

  try {
    const response = await catsApiInstance.get("/images/search", {
      params: {
        limit,
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cats:", error);
    throw error;
  }
};

export async function fetchCatById(catId: string) {
  if (!catId) {
    throw new Error("Cat ID is required");
  }

  try {
    const response = await catsApiInstance.get(`/images/${catId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch cat with ID ${catId}:`, error);
    throw error;
  }
}
