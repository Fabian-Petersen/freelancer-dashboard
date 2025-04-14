import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService, ResourceType, EntityType } from "../utils/api";

// Query key for projects
// const PROJECTS_PATH: ResourceType = "projects";
// const JOB_PATH: ResourceType = "applications";

/**
 * $ Generic hook to fetch all entities of a specific resource type
 */
export const useGetAll = <T extends EntityType>(resourceType: ResourceType) => {
  return useQuery({
    queryKey: [resourceType],
    queryFn: () => apiService.getAll<T>(resourceType),
  });
};

/**
 * $ Generic hook to fetch a single entity by ID
 */
export const useGetById = <T extends EntityType>(
  resourceType: ResourceType,
  id: string
) => {
  return useQuery({
    queryKey: [resourceType, id],
    queryFn: () => apiService.getById<T>(resourceType, id),
    enabled: !!id, // Only run the query if we have an ID
  });
};

/**
 * $ Generic hook to create a new entity
 */
export const useCreate = <T extends EntityType>(resourceType: ResourceType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (entity: T) => apiService.create<T>(resourceType, entity),
    onSuccess: () => {
      // Invalidate the resource query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: [resourceType] });
    },
  });
};

/**
 * $ Generic hook to update an existing entity
 */
export const useUpdate = <T extends EntityType>(resourceType: ResourceType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, entity }: { id: string; entity: Partial<T> }) =>
      apiService.update<T>(resourceType, id, entity),
    onSuccess: (data, variables) => {
      // Update both the list query and the individual entity query
      queryClient.invalidateQueries({ queryKey: [resourceType] });
      queryClient.invalidateQueries({
        queryKey: [resourceType, variables.id],
      });
    },
  });
};

/**
 * $ Generic hook to delete an entity
 */
export const useDelete = <T extends EntityType>(resourceType: ResourceType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiService.delete(resourceType, id),
    onSuccess: (data, id) => {
      // Update the cache manually to prevent the whole application from refreshing on item delete
      queryClient.setQueryData<T[]>([resourceType], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((item) => item.id !== id);
      });
    },
  });
};
