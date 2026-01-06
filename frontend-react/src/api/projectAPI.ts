import axios from "axios";

export interface ProjectResponse{
  projectId: number;
  projectCode: string | null;
  projectName: string | null;
  expectedStartDate: string | null;
  expectedEndDate: string | null;
  actualStartDate: string | null;
  actualEndDate: string | null;
  workProgress: number;
  estimateTime: number | null;
  spentTime: number | null;
  projectDeleteStatus: boolean;
  memberAuthorId: number | null;
  authorFullName: string | null;
  projectStatusId: number | null;
}

export const getAllProjectAPI = async () => {
    try {
        const url = `http://localhost:5075/api/project/projects`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
}