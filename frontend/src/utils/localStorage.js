export  const getStorageObject = (key) => {
    const item = localStorage.getItem(key);
    if (item ==! null) {
        return JSON.parse(item);
    }
    return null;
};

export const setStorageObject = (token) => {
    localStorage.setItem('user-session', token);
};

export const deleteStorageObject = (key) => {
    localStorage.removeItem(key);
};

export const getUserToken = () => {
    const session = getStorageObject('user-session')
    if (session) {
        return session.token
    }
    return null;
};

export const setUserSession = () => {
    const session = getStorageObject('user-session')
    if (session) {
        return session.user
    }
    return null;
};

export const removeSession = () => {
    deleteStorageObject('user-session');
  };