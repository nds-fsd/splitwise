import { createContext, useContext, useState } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
    return useContext(DarkModeContext);
};

export const DarkModeContextProvider = ({ children }) => {
    const initialDarkMode = localStorage.getItem("darkMode") === 'true';

    const [darkMode, setDarkMode] = useState(initialDarkMode);

    const toggleDarkMode = () => {
        setDarkMode((prevDarkmode) => {
            localStorage.setItem("darkMode", !prevDarkmode);
            return !prevDarkmode;
        });
    }

    return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
};