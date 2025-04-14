import React, { createContext, useContext, useState, ReactNode } from "react";

import { projectSchema, jobSchema } from "@/app/schemas";
import { z } from "zod";

type Project = z.infer<typeof projectSchema>;
type Job = z.infer<typeof jobSchema>;
import { ResourceType } from "@/app/utils/api";

// Define the shape of our context state
type GlobalContextType = {
  // $ State to open and close modals
  // %  ========= Projects Modal ========= //
  // % Projects Modal - Create Project
  isNewProjectModalOpen: boolean;
  setIsNewProjectModalOpen: (isOpen: boolean) => void;

  // % Projects Modal - Update Project
  isUpdateProjectModalOpen: boolean;
  setIsUpdateProjectModalOpen: (isOpen: boolean) => void;

  // *  ========= Jobs Modal ========= //
  // # Jobs Modal - Creat Job
  isNewJobModalOpen: boolean;
  setIsNewJobModalOpen: (isOpen: boolean) => void;

  // # Jobs Modal - Update Job
  isUpdateJobModalOpen: boolean;
  setIsUpdateJobModalOpen: (isOpen: boolean) => void;

  // *  ========= Delete Items Modal ========= //
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  itemToDelete: Project | Job | null;
  setItemToDelete: (item: Project | Job | null) => void;
  resourceTypeToDelete: ResourceType | null;
  setResourceTypeToDelete: (type: ResourceType | null) => void;

  // %  ========= Projects State ========= //
  // % State to select as project from the project summary table
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;

  // % State to update the project status with the slideer in the project summary table
  projectProgressStatus: number;
  setProjectProgressStatus: (prev: number) => void;

  // #  ========= Jobs State ========= //
  // # State to select as job from the applications status cards
  selectedJob: Job | null;
  setSelectedJob: (application: Job | null) => void;

  // # State to display the menu button for the job card when hovered over
  hoveredCardId: string;
  setHoveredCardId: (id: string) => void;

  // * Sidebar Open and Close State
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
// $ State to select a specific job application card on click.

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
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] =
    useState<boolean>(false);
  const [projectProgressStatus, setProjectProgressStatus] = useState<number>(0);

  // $ Update Project Modal State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isUpdateProjectModalOpen, setIsUpdateProjectModalOpen] =
    useState<boolean>(false);

  // $ Update Job Modal State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isUpdateJobModalOpen, setIsUpdateJobModalOpen] =
    useState<boolean>(false);

  // $ New Job Modal State
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState<boolean>(false);

  // $ Set State when a card is hover to display the menu button for the card
  const [hoveredCardId, setHoveredCardId] = useState<string>("");

  // $ Set state for the sidebar
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // $ Delete Item Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<Project | Job | null>(null);
  const [resourceTypeToDelete, setResourceTypeToDelete] =
    useState<ResourceType | null>(null);

  // Memoize the context value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      isNewProjectModalOpen,
      setIsNewProjectModalOpen,
      projectProgressStatus,
      setProjectProgressStatus,
      isUpdateProjectModalOpen,
      setIsUpdateProjectModalOpen,
      selectedProject,
      setSelectedProject,
      isUpdateJobModalOpen,
      setIsUpdateJobModalOpen,
      selectedJob,
      setSelectedJob,
      isNewJobModalOpen,
      setIsNewJobModalOpen,
      hoveredCardId,
      setHoveredCardId,
      isOpen,
      setIsOpen,
      isDeleteModalOpen,
      setIsDeleteModalOpen,
      itemToDelete,
      setItemToDelete,
      resourceTypeToDelete,
      setResourceTypeToDelete,
    }),
    [
      isNewProjectModalOpen,
      projectProgressStatus,
      isUpdateProjectModalOpen,
      selectedProject,
      isUpdateJobModalOpen,
      selectedJob,
      setSelectedJob,
      isNewJobModalOpen,
      hoveredCardId,
      isOpen,
      isDeleteModalOpen,
      itemToDelete,
      resourceTypeToDelete,
    ]
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
