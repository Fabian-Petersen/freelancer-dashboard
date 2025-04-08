import React, { createContext, useContext, useState, ReactNode } from "react";
import { Project } from "../utils/api";

// Define the shape of our context state
type GlobalContextType = {
  isProjectModalOpen: boolean;
  setIsProjectModalOpen: (isOpen: boolean) => void;
  projectStatus: number;
  setProjectStatus: (prev: number) => void;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (isOpen: boolean) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
};

// Create the context with default values
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Props for the context provider component
interface GlobalContextProviderProps {
  children: ReactNode;
}

/**
 * Provider component that wraps your app and makes global state available to the tree
 */
export function GlobalContextProvider({
  children,
}: GlobalContextProviderProps) {
  // $ Main state to Open and Close the Add New Project Modal
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [projectStatus, setProjectStatus] = useState<number>(0);

  // $ Update Project MOdal State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  // Memoize the context value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      isProjectModalOpen,
      setIsProjectModalOpen,
      projectStatus,
      setProjectStatus,
      isUpdateModalOpen,
      setIsUpdateModalOpen,
      selectedProject,
      setSelectedProject,
    }),
    [isProjectModalOpen, projectStatus, isUpdateModalOpen, selectedProject]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

/**
 * Custom hook to use the global context state
 */
export function useGlobalContext(): GlobalContextType {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }

  return context;
}
