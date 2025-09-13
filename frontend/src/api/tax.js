import api from "./axios";

export const calculateTax = async (salary) => {
  const res = await api.post("/tax", { salary });
  return res.data;
};
