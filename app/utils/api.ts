import axios from "axios";

// Create an axios instance with default configs
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Project type definition based on the NewProjectModal
export type Project = {
  id?: string;
  client: string;
  name: string;
  description: string;
  price: number;
  deadline: string;
  email: string;
  phone: string;
  //   country: string;
  status: number;
};

// Format the project data according to API requirements
const formatProjectData = (project: Project) => {
  return {
    body: JSON.stringify(project),
    isBase64Encoded: false,
  };
};

// $ API service functions
export const apiService = {
  // $ Get all projects
  getProjects: async (): Promise<Project[]> => {
    try {
      const response = await apiClient.get("/projects");
      const projects: Project[] = JSON.parse(response.data.body);
      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  // Get a specific project
  getProject: async (id: string): Promise<Project> => {
    try {
      const response = await apiClient.get(`/projects/${id}`);
      console.log("/GET:", response);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      throw error;
    }
  },

  // Create a new project
  createProject: async (project: Project): Promise<Project> => {
    try {
      const formattedData = formatProjectData(project);
      const response = await apiClient.post("/projects", formattedData);
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },

  // Update an existing project
  updateProject: async (
    id: string,
    project: Partial<Project>
  ): Promise<Project> => {
    try {
      const formattedData = formatProjectData(project as Project);
      const response = await apiClient.put(`/projects/${id}`, formattedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating project ${id}:`, error);
      throw error;
    }
  },

  // Delete a project
  deleteProject: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/projects/${id}`);
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      throw error;
    }
  },
};
