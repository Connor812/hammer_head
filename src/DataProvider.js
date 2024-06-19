import React, { createContext } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const url = "http://hammerheadhomeservice.com"

    return (
        <DataContext.Provider value={{ url }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };