// $ Create the context to pass the state to the mobile and desktop navar to open the nav menu.
// $ The hook is used in the SidebarMonileMenu.tsx component

import { createContext, useContext, useState, ReactNode } from "react";

// $ Define the type for the context value
interface NavContextType {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

// $ Create the context with a default value
const NavContext = createContext<NavContextType>({
  openSidebar: false,
  setOpenSidebar: () => {},
});

// $ Define props type for the provider component
interface NavProviderProps {
  children: ReactNode;
}

// $ Create the provider component
export const NavProvider: React.FC<NavProviderProps> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  return (
    <NavContext.Provider value={{ openSidebar, setOpenSidebar }}>
      {children}
    </NavContext.Provider>
  );
};

// $ Custom hook to use the NavContext
export const useNav = () => {
  return useContext(NavContext);
};
