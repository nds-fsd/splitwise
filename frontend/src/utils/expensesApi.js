import api from "./axios";

export const getAllUserExpensesById = async (userId) => {
  const response = await api.get(`/user/${userId}/expenses`);
  return response.data;
};

export const getAllGroupExpensesById = async (groupId) => {
  const response = await api.get(`/group/${groupId}/expenses`);
  return response.data;
};

export const createGroupExpense = async (groupId, data) => {
  const response = await api.post(`/group/${groupId}/expenses`, data);
  return response.data;
};
