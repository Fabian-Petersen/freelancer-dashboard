import React from "react";
import { Box, Button, Fieldset, Flex, Stack } from "@chakra-ui/react";
import { AlertTriangle } from "lucide-react";
import { useDelete } from "@/app/hooks/useFetchDataHook";
import { ResourceType } from "@/app/utils/api";
import { toaster } from "@/components/ui/toaster";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";

type ModalDeleteItemProps = {
  closeModal: (isOpen: boolean) => void;
};

const DeleteItemModal = ({ closeModal }: ModalDeleteItemProps) => {
  const { setIsDeleteModalOpen, itemToDelete, resourceTypeToDelete } =
    useGlobalContext();

  const deleteItem = useDelete(resourceTypeToDelete as ResourceType);

  const handleDelete = async () => {
    if (!itemToDelete?.id) {
      toaster.create({
        title: "Error",
        description: "Item ID is missing",
        type: "error",
        duration: 3000,
      });
      return;
    }

    try {
      await deleteItem.mutateAsync(itemToDelete.id);

      toaster.create({
        title: "Success",
        description: `${
          resourceTypeToDelete === "projects"
            ? "Project"
            : resourceTypeToDelete === "tasks"
            ? "Task"
            : "Job application"
        } deleted successfully`,
        type: "success",
        duration: 3000,
      });

      // $ Close the modal
      setIsDeleteModalOpen(false);
    } catch (error) {
      toaster.create({
        title: "Error",
        description: `Failed to delete ${
          resourceTypeToDelete === "projects" ? "project" : "job application"
        }`,
        type: "error",
        duration: 3000,
      });
      console.error(`Error deleting ${resourceTypeToDelete}:`, error);
    }
  };

  return (
    <form>
      <Stack gap="4" align="flex-start" maxW="lg" width={"lg"} rounded="lg">
        <Fieldset.Root
          size="lg"
          position={"absolute"}
          maxW="xl"
          mx={"auto"}
          my={"auto"}
          bgColor={{ base: "white", _dark: "#1d2739" }}
          p={6}
          translate={"-50% -50%"}
          left={"50%"}
          top={"50%"}
          rounded="md"
          backdropBlur={"xl"}
        >
          <Stack>
            <Flex gap={2} align={"center"}>
              <Box color="red.500" padding={2}>
                <AlertTriangle size={36} />
              </Box>
              <Fieldset.Legend
                color="blue.500"
                fontWeight={"bold"}
                fontSize={{ base: "1rem", lg: "1.5rem" }}
              >
                Confirm Delete
              </Fieldset.Legend>
            </Flex>
            <Fieldset.HelperText>
              Are you sure you want to delete this{" "}
              {resourceTypeToDelete === "projects"
                ? "project"
                : "job application"}
              ? This action cannot be undone.
            </Fieldset.HelperText>
          </Stack>
          <Flex gap={4} mt={2} direction={{ base: "column", lg: "row" }}>
            <Button
              alignSelf="flex-start"
              width={{
                base: "100%",
                lg: "8rem",
              }}
              mt={4}
              variant="outline"
              rounded="full"
              colorPalette="yellow"
              color={{ base: "gray.600", _dark: "gray.200" }}
              _hover={{ bgColor: "red.300", color: "white" }}
              onClick={() => {
                closeModal(false);
              }}
              disabled={deleteItem.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              alignSelf="flex-start"
              width={{
                base: "100%",
                lg: "8rem",
              }}
              mt={4}
              colorPalette="teal"
              rounded="full"
              onClick={handleDelete}
              loading={deleteItem.isPending}
              loadingText="Deleting"
            >
              Delete
            </Button>
          </Flex>
        </Fieldset.Root>
      </Stack>
    </form>
  );
};

export default DeleteItemModal;
