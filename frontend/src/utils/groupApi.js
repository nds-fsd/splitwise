import api from "./axios";

export const getGroupByUserId = async (userId) => {
    const response = await api.get(`/group/user/${userId}`);
    return response.data;
}

export const getGroupById = async (groupId) => {
    const response = await api.get(`/group/${groupId}`);
    return response.data;
}

export const createGroup = async (data) => {
    const response = await api.post('/group', data);
    return response.data;
};

export const updateGroup = async (groupId, data) => {
    const response = await api.put(`/group/${groupId}`, data);
    return response.data;
};

export const deleteGroup = async (groupId) => {
    const response = await api.delete(`/group/${groupId}`);
    return response.data;
};

