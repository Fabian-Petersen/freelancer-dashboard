import axios from "axios";

// $ Types
import { jobSchema, projectSchema, taskSchema } from "../schemas";
export type ResourceType = "projects" | "applications" | "tasks";
import { z } from "zod";

type Project = z.infer<typeof projectSchema>;
type Job = z.infer<typeof jobSchema>;
type Task = z.infer<typeof taskSchema>;
// $ Combine the types into a union type for the generic functions
export type EntityType = Project | Job | Task;

// $ Create an axios instance with default configs
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

// $ Format the data according to API requirements
const formatData = <T extends EntityType>(item: T): Omit<T, "id"> => {
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
      // console.log(`API Response All ${resourcePath}:`, response.data);
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
      const payload = { body: JSON.stringify(entity) };
      const response = await apiClient.post(`/${resourcePath}`, payload);
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
      const formattedData = formatData(entity as T);
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
};
