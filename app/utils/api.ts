import axios from "axios";

// $ Types
import { jobSchema, projectSchema } from "../schemas";
export type ResourceType = "projects" | "applications";
import { z } from "zod";

type Project = z.infer<typeof projectSchema>;
type Job = z.infer<typeof jobSchema>;
// $ Combine the types into a union type for the generic functions
export type EntityType = Project | Job;

// $ Create an axios instance with default configs
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

// $ Format the data according to API requirements
const formatData = <T extends EntityType>(item: T, resource: string) => {
  // Only format for projects, not applications
  if (resource === "projects") {
    return {
      body: JSON.stringify(item),
      isBase64Encoded: false,
    };
  }
  return item;
};

// $ API service functions
export const apiService = {
  // $ Get all items for a resource
  getAll: async <T extends EntityType>(
    resourcePath: ResourceType
  ): Promise<T[]> => {
    try {
      const response = await apiClient.get(`/${resourcePath}`);
      console.log(`API Response All ${resourcePath}:`, response.data);
      return response.data as T[];
    } catch (error) {
      console.error(`Error fetching ${resourcePath}:`, error);
      throw error;
    }
  },

  // $ Get a specific entity by ID
  getById: async <T extends EntityType>(
    resourcePath: ResourceType,
    id: string
  ): Promise<T> => {
    try {
      const response = await apiClient.get(`/${resourcePath}/${id}`);
      console.log("/GET:", response);
      return response.data as T;
    } catch (error) {
      console.error(`Error fetching ${resourcePath} ${id}:`, error);
      throw error;
    }
  },

  // $ Create a new entity
  create: async <T extends EntityType>(
    resourcePath: ResourceType,
    entity: T
  ): Promise<T> => {
    try {
      // const formattedData = formatData(entity);
      const response = await apiClient.post(
        `/${resourcePath}`,
        formatData(entity, resourcePath)
      );
      return response.data as T;
    } catch (error) {
      console.error(`Error creating ${resourcePath}:`, error);
      throw error;
    }
  },

  // $ Update an existing entity
  update: async <T extends EntityType>(
    resourcePath: ResourceType,
    id: string,
    entity: Partial<T>
  ): Promise<T> => {
    try {
      const formattedData = formatData(entity as T, resourcePath);
      const response = await apiClient.put(
        `/${resourcePath}/${id}`,
        formattedData
      );
      return response.data as T;
    } catch (error) {
      console.error(`Error updating ${resourcePath} ${id}:`, error);
      throw error;
    }
  },

  // $ Delete an entity
  delete: async (resourcePath: ResourceType, id: string): Promise<void> => {
    try {
      await apiClient.delete(`/${resourcePath}/${id}`);
    } catch (error) {
      console.error(`Error deleting ${resourcePath} ${id}:`, error);
      throw error;
    }
  },

  // // $ Get all applications
  // getApplications: async (): Promise<Job[]> => {
  //   try {
  //     const response = await apiClient.get("/applications");
  //     console.log("API Response All Applciations:", response.data);
  //     const applications: Job[] = response.data;
  //     return applications;
  //   } catch (error) {
  //     console.error("Error fetching applications:", error);
  //     throw error;
  //   }
  // },

  // // Get a specific project
  // getProject: async (id: string): Promise<Project> => {
  //   try {
  //     const response = await apiClient.get(`/projects/${id}`);
  //     console.log("/GET:", response);
  //     return response.data;
  //   } catch (error) {
  //     console.error(`Error fetching project ${id}:`, error);
  //     throw error;
  //   }
  // },

  // // Get a specific application
  // getApplication: async (id: string): Promise<Job> => {
  //   try {
  //     const response = await apiClient.get(`/applications/${id}`);
  //     console.log("/GET:", response);
  //     return response.data;
  //   } catch (error) {
  //     console.error(`Error fetching application ${id}:`, error);
  //     throw error;
  //   }
  // },

  // // Create a new project
  // createProject: async (project: Project): Promise<Project> => {
  //   try {
  //     const formattedData = formatData(project);
  //     const response = await apiClient.post("/projects", formattedData);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error creating project:", error);
  //     throw error;
  //   }
  // },

  // // Create a new application
  // createApplication: async (application: Job): Promise<Job> => {
  //   try {
  //     const formattedData = formatData(application);
  //     const response = await apiClient.post("/application", formattedData);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error creating application:", error);
  //     throw error;
  //   }
  // },

  // // Update an existing project
  // updateProject: async (
  //   id: string,
  //   project: Partial<Project>
  // ): Promise<Project> => {
  //   try {
  //     const formattedData = formatData(project as Project);
  //     const response = await apiClient.put(`/projects/${id}`, formattedData);
  //     return response.data;
  //   } catch (error) {
  //     console.error(`Error updating project ${id}:`, error);
  //     throw error;
  //   }
  // },

  // // Delete a project
  // deleteProject: async (id: string): Promise<void> => {
  //   try {
  //     await apiClient.delete(`/projects/${id}`);
  //   } catch (error) {
  //     console.error(`Error deleting project ${id}:`, error);
  //     throw error;
  //   }
  // },
};
