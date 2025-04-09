import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService, JobApplicationProps, Project } from "../utils/api";

// Query key for projects
const PROJECTS_QUERY_KEY = "projects";
const APPLICATIONS_QUERY_KEY = "applications";

/**
 * Hook to fetch all projects
 */
export const useProjects = () => {
  return useQuery({
    queryKey: [PROJECTS_QUERY_KEY],
    queryFn: apiService.getProjects,
  });
};

export const useApplications = () => {
  return useQuery({
    queryKey: [APPLICATIONS_QUERY_KEY],
    queryFn: apiService.getApplications,
  });
};

/**
 * Hook to fetch a single project by ID
 */
export const useProject = (id: string) => {
  return useQuery({
    queryKey: [PROJECTS_QUERY_KEY, id],
    queryFn: () => apiService.getProject(id),
    enabled: !!id, // Only run the query if we have an ID
  });
};

/**
 * Hook to create a new project
 */
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProject: Project) => apiService.createProject(newProject),
    onSuccess: () => {
      // Invalidate the projects query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
    },
  });
};

// $ Create Job Application
export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newApplication: JobApplicationProps) =>
      apiService.createApplication(newApplication),
    onSuccess: () => {
      // Invalidate the projects query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: [APPLICATIONS_QUERY_KEY] });
    },
  });
};

/**
 * Hook to update an existing project
 */
export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, project }: { id: string; project: Partial<Project> }) =>
      apiService.updateProject(id, project),
    onSuccess: (data, variables) => {
      // Update both the list query and the individual project query
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [PROJECTS_QUERY_KEY, variables.id],
      });
    },
  });
};

/**
 * Hook to delete a project
 */
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiService.deleteProject(id),
    onSuccess: () => {
      // Invalidate the projects query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
    },
  });
};
