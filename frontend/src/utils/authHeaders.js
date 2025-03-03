export const authHeaders = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}