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

export const updateGroupExpense = async (groupId, expenseId, data) => {
  const response = await api.patch(`/group/${groupId}/expenses/${expenseId}`, data);
  return response.data;
};

export const deleteGroupExpense = async (groupId, expenseId) => {
  const response = await api.delete(`/group/${groupId}/expenses/${expenseId}`);
  return response.data;
};
