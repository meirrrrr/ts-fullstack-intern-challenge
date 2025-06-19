import { axiosInstance } from "./axios";

export const getLikes = async () => {
  const res = await axiosInstance.get("/likes");
  return res.data.data;
};

export const likeCat = async (cat_id: string) => {
  const res = await axiosInstance.post("/likes", { cat_id });
  return res.data;
};

export const unlikeCat = async (cat_id: string) => {
  const res = await axiosInstance.delete(`/likes/${cat_id}`);
  return res.data;
};
