import api from "./axios";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const createUser = async (user) => {
  const res = await api.post("/users", user);
  return res.data;
};

export const updateUser = async (id, user) => {
  const res = await api.put(`/users/${id}`, user);
  return res.data;
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};

export const computeUserTax = async (id) => {
  const res = await api.get(`/users/${id}/tax`);
  return res.data;
};
