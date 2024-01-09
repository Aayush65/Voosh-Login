import { ReactNode, createContext, useState } from 'react';

interface ContextData {
    name: string,
    setName: (newName: string) => void,
}

const context = createContext<ContextData>({ 
    name: "",
    setName: () => {},
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [name, setName] = useState<string>("");
  
    const contextValue = { name, setName };
  
    return (
        <context.Provider value={contextValue}>
          {children}
        </context.Provider>
    );
};

export { context, ContextProvider };