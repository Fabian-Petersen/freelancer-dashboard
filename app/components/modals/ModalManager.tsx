"use client";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { Container } from "@chakra-ui/react";

// Import modals
import NewProjectModal from "@/app/components/modals/NewProjectModal";
import UpdateProjectModal from "@/app/components/modals/UpdateProjectModal";
import NewApplicationModal from "@/app/components/modals/NewApplicationModal";
import UpdateJobModal from "@/app/components/modals/UpdateJobModal";

const ModalManager = () => {
  const {
    isNewProjectModalOpen,
    isUpdateProjectModalOpen,
    isNewJobModalOpen,
    isUpdateJobModalOpen,
    selectedProject,
    selectedJob,
  } = useGlobalContext();

  // Determine if any modal is open
  const isAnyModalOpen =
    isNewProjectModalOpen ||
    isUpdateProjectModalOpen ||
    isNewJobModalOpen ||
    isUpdateJobModalOpen;

  // If no modals are open, return null
  if (!isAnyModalOpen) return null;

  // Common container styling for all modals
  return (
    <Container
      position="fixed"
      height="100vh"
      width="100%"
      top="0"
      left="0"
      p={4}
      backdropFilter="blur(4px)"
      mx="auto"
      bgColor="black/60"
      zIndex={2000}
    >
      {/* Render the appropriate modal based on which state is true */}
      {isNewProjectModalOpen && <NewProjectModal />}
      {isUpdateProjectModalOpen && selectedProject && <UpdateProjectModal />}
      {isNewJobModalOpen && <NewApplicationModal />}
      {isUpdateJobModalOpen && selectedJob && (
        <UpdateJobModal application={selectedJob} />
      )}
    </Container>
  );
};

export default ModalManager;
