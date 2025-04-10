import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService, ResourceType, EntityType } from "../utils/api";
// import { Project } from "@/types/project";
// import { Job } from "@/types/job";

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
export const useDelete = (resourceType: ResourceType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiService.delete(resourceType, id),
    onSuccess: () => {
      // Invalidate the resource query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: [resourceType] });
    },
  });
};

// export const useApplications = () => {
//   return useQuery({
//     queryKey: [JOB_PATH:ResourceType],
//     queryFn: apiService.getApplications,
//   });
// };

// /**
//  * Hook to fetch a single project by ID
//  */
// export const useProject = (id: string) => {
//   return useQuery({
//     queryKey: [PROJECTS_PATH, id],
//     queryFn: () => apiService.getProject(id),
//     enabled: !!id, // Only run the query if we have an ID
//   });
// };

// /**
//  * Hook to create a new project
//  */
// export const useCreateProject = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (newProject: Project) => apiService.createProject(newProject),
//     onSuccess: () => {
//       // Invalidate the projects query to refetch the updated list
//       queryClient.invalidateQueries({ queryKey: [PROJECTS_PATH] });
//     },
//   });
// };

// // $ Create Job Application
// export const useCreateApplication = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (newApplication: Job) =>
//       apiService.createApplication(newApplication),
//     onSuccess: () => {
//       // Invalidate the projects query to refetch the updated list
//       queryClient.invalidateQueries({ queryKey: [JOB_PATH:ResourceType] });
//     },
//   });
// };

// /**
//  * Hook to update an existing project
//  */
// export const useUpdateProject = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, project }: { id: string; project: Partial<Project> }) =>
//       apiService.updateProject(id, project),
//     onSuccess: (data, variables) => {
//       // Update both the list query and the individual project query
//       queryClient.invalidateQueries({ queryKey: [PROJECTS_PATH] });
//       queryClient.invalidateQueries({
//         queryKey: [PROJECTS_PATH, variables.id],
//       });
//     },
//   });
// };

// /**
//  * Hook to delete a project
//  */
// export const useDeleteProject = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) => apiService.deleteProject(id),
//     onSuccess: () => {
//       // Invalidate the projects query to refetch the updated list
//       queryClient.invalidateQueries({ queryKey: [PROJECTS_PATH] });
//     },
//   });
// };
