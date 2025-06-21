import { catsApiInstance } from "./axios";

export interface CatData {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: any[];
}

export const fetchCats = async (limit: number) => {
  if (limit <= 0) {
    throw new Error("Limit must be a positive number");
  }

  try {
    const { data } = await catsApiInstance.get<CatData[]>("/images/search", {
      params: { limit },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch cats:", error);
    throw error;
  }
};
