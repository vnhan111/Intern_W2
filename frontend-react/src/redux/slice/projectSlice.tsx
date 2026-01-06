import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProjectResponse } from "../../api/projectAPI";

interface ProjectState{
    projects: ProjectResponse[];
    loading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    projects : [],
    loading : false,
    error : null
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers:{
        getAllProjectStart: (state) =>{
            state.loading = true;
            state.error = null;
        },
        getAllProjectSuccess: (state, actions: PayloadAction<ProjectResponse[]>) =>{
            state.loading = false;
            state.projects = actions.payload;
            state.error = null;
        },
        getAllProjectError: (state, actions: PayloadAction<string>) =>{
            state.loading = false;
            state.error = actions.payload;
        },
        clearProjectError: (state) =>{
            state.error = null;
        }
    }
});

export const {
    getAllProjectStart,
    getAllProjectSuccess,
    getAllProjectError,
    clearProjectError,
} = projectSlice.actions;

export default projectSlice.reducer;