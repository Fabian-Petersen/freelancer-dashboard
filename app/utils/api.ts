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

export type JobApplicationProps = {
  id?: string;
  description: string;
  company: string;
  location: string;
  date_applied: string;
  job_details: string[];
  status: "applied" | "interview" | "on hold" | "failed";
};

// Format the project data according to API requirements
const formatProjectData = (item: Project | JobApplicationProps) => {
  return {
    body: JSON.stringify(item),
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

  // $ Get all applications
  getApplications: async (): Promise<JobApplicationProps[]> => {
    try {
      const response = await apiClient.get("/applications");
      const applications: JobApplicationProps[] = JSON.parse(
        response.data.body
      );
      return applications;
    } catch (error) {
      console.error("Error fetching applications:", error);
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

  // Get a specific application
  getApplication: async (id: string): Promise<JobApplicationProps> => {
    try {
      const response = await apiClient.get(`/applications/${id}`);
      console.log("/GET:", response);
      return response.data;
    } catch (error) {
      console.error(`Error fetching application ${id}:`, error);
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

  // Create a new application
  createApplication: async (
    application: JobApplicationProps
  ): Promise<JobApplicationProps> => {
    try {
      const formattedData = formatProjectData(application);
      const response = await apiClient.post("/application", formattedData);
      return response.data;
    } catch (error) {
      console.error("Error creating application:", error);
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
