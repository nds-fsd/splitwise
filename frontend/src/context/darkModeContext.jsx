import { createContext, useContext, useState } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
    return useContext(DarkModeContext);
};

export const DarkModeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode((prevDarkmode) => !prevDarkmode);
    }

    return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
};