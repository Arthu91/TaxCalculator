import api from "./axios";

export const getGroups = async () => {
  const res = await api.get("/groups");
  return res.data;
};

export const createGroup = async (group) => {
  const res = await api.post("/groups", group);
  return res.data;
};

export const updateGroup = async (id, group) => {
  const res = await api.put(`/groups/${id}`, group);
  return res.data;
};


export const deleteGroup = async (id) => {
  const res = await api.delete(`/groups/${id}`);
  return res.data;
};
