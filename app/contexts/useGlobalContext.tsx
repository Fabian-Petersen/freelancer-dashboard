import React, { createContext, useContext, useState, ReactNode } from "react";

import { projectSchema, jobSchema } from "@/app/schemas";
import { Task } from "@/app/schemas";
import { z } from "zod";

// $ import the user attributes state
import { FetchUserAttributesOutput } from "@aws-amplify/auth";

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

  // *  ========= Tasks Modal ========= //
  // # Tasks Modal - Create Task
  isNewTaskModalOpen: boolean;
  setIsNewTaskModalOpen: (isOpen: boolean) => void;

  // # Tasks Modal - Update Task
  isUpdateTaskModalOpen: boolean;
  setIsUpdateTaskModalOpen: (isOpen: boolean) => void;

  // *  ========= Delete Items Modal ========= //
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  itemToDelete: Project | Job | Task | null;
  setItemToDelete: (item: Project | Job | Task | null) => void;
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

  // #  ========= Tasks State ========= //
  // # State to select as task from the tasks status cards
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;

  // # State to display the menu button for the job card when hovered over
  hoveredCardId: string;
  setHoveredCardId: (id: string) => void;

  // * Sidebar State
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  activeItem: string | null;
  setActiveItem: (activeItem: string) => void;

  // * AWS State
  userAttributes: FetchUserAttributesOutput | null;
  setUserAttributes: React.Dispatch<
    React.SetStateAction<FetchUserAttributesOutput | null>
  >;

  // *  ========= Confirm SignUp & Resend Code Modal ========= //
  isConfirmSignUpModalOpen: boolean;
  setIsConfirmSignUpModalOpen: (isOpen: boolean) => void;
  isResendCodeModalOpen: boolean;
  setIsResendCodeModalOpen: (isOpen: boolean) => void;

  signUpEmail: string;
  setSignUpEmail: (email: string) => void;

  // *  ========= Loading State ========= //
  formSubmitting: boolean;
  setFormSubmitting: (isSubmitting: boolean) => void;
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

  // $ Update Task Modal State
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] =
    useState<boolean>(false);

  // $ New Task Modal State
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState<boolean>(false);

  // $ Set State when a card is hover to display the menu button for the card
  const [hoveredCardId, setHoveredCardId] = useState<string>("");

  // $ Delete Item Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<Project | Job | Task | null>(
    null
  );
  const [resourceTypeToDelete, setResourceTypeToDelete] =
    useState<ResourceType | null>(null);

  // $ Sign Up Modal State
  const [isConfirmSignUpModalOpen, setIsConfirmSignUpModalOpen] =
    useState<boolean>(false);

  const [isResendCodeModalOpen, setIsResendCodeModalOpen] =
    useState<boolean>(false);
  const [signUpEmail, setSignUpEmail] = useState<string>("");

  // $ Set state for the sidebar
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // $ AWS Authentication State
  const [userAttributes, setUserAttributes] =
    useState<FetchUserAttributesOutput | null>(null);

  // $ Form Submitting State
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

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
      isActive,
      setIsActive,
      activeItem,
      setActiveItem,
      userAttributes,
      setUserAttributes,
      isConfirmSignUpModalOpen,
      setIsConfirmSignUpModalOpen,
      signUpEmail,
      setSignUpEmail,
      formSubmitting,
      setFormSubmitting,
      isResendCodeModalOpen,
      setIsResendCodeModalOpen,
      isNewTaskModalOpen,
      setIsNewTaskModalOpen,
      setSelectedTask,
      selectedTask,
      isUpdateTaskModalOpen,
      setIsUpdateTaskModalOpen,
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
      isActive,
      activeItem,
      userAttributes,
      isConfirmSignUpModalOpen,
      signUpEmail,
      formSubmitting,
      isResendCodeModalOpen,
      isNewTaskModalOpen,
      selectedTask,
      isUpdateTaskModalOpen,
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
