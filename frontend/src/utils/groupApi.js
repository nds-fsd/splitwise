import { authHeaders } from "./authHeaders";
import api from "./axios";


export const getGroupByUserId = async (token) => {
    const response = await api.get(`/group/user`, authHeaders(token));
    return response.data;
}

export const getGroupById = async (groupId, token) => {
    const response = await api.get(`/group/${groupId}`, authHeaders(token));
    return response.data;
}

export const createGroup = async (data, token) => {
    const response = await api.post('/group', data, authHeaders(token));
    return response.data;
};

export const updateGroup = async (groupId, data, token) => {
    const response = await api.put(`/group/${groupId}`, data, authHeaders(token));
    return response.data;
};

export const deleteGroup = async (groupId, token) => {
    const response = await api.delete(`/group/${groupId}`, authHeaders(token));
    return response.data;
};

export const getGroupBalance = async (groupId) => {
    const response = await api.get(`/group/${groupId}/balance`);
    return response.data;
}

