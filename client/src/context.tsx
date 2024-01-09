import { ReactNode, createContext, useState } from 'react';

interface ContextData {
    name: string,
    setName: (newName: string) => void,
    currPage: number,
    setCurrPage: (newName: number) => void,
}

const context = createContext<ContextData>({ 
    name: "",
    setName: () => {},
    currPage: 0,
    setCurrPage: () => [],
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [name, setName] = useState<string>("");
    const [currPage, setCurrPage] = useState<number>(0);
  
    const contextValue = { name, setName, currPage, setCurrPage };
  
    return (
        <context.Provider value={contextValue}>
          {children}
        </context.Provider>
    );
};

export { context, ContextProvider };