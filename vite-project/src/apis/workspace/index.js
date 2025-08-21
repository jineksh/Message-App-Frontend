import axios from '@/config/axios'

export const createWorkspace = async ({ name, description }) => {
    try {
        // 🔹 Local storage se token fetch karo
        const token = localStorage.getItem('token');

        // 🔹 POST request bhejna with token
        const response = await axios.post(
            '/workspace',
            { name, description },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Auth header
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;

    } catch (error) {
        console.error("Error creating workspace:", error?.response || error);

        throw error?.response?.data || new Error("Network error");
    }
};

export const getWorkspaces = async () => {
    try {
        // 🔹 Local storage se token fetch karo
        const token = localStorage.getItem('token');

        // 🔹 GET request bhejna with token
        const response = await axios.get('/workspace', {
            headers: {
                Authorization: `Bearer ${token}` // Auth header
            }
        });
        return response.data.data;

    } catch (error) {
        console.error("Error fetching workspaces:", error?.response || error);

        throw error?.response?.data || new Error("Network error");
    }
}

export const getWorkspaceById = async (workspaceId) => {
    try {
        // 🔹 Local storage se token fetch karo
        const token = localStorage.getItem('token');

        // 🔹 GET request bhejna with token
        const response = await axios.get(`/workspace/${workspaceId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Auth header
            }
        });
        console.log(response.data.data);
        return response.data.data;
    }
    catch (error) {
        console.error("Error fetching workspace by ID:", error?.response || error);
        throw error?.response?.data || new Error("Network error");
    }
}

export const deleteWorkspace = async (workspaceId) => {
    try {
        // 🔹 Local storage se token fetch karo
        const token = localStorage.getItem('token');

        // 🔹 DELETE request bhejna with token
        const response = await axios.delete(`/workspace/${workspaceId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Auth header
            }
        });
        return response.data.data;

    } catch (error) {
        console.error("Error deleting workspace:", error?.response || error);

        throw error?.response?.data || new Error("Network error");
    }
}

export const updateWorkspace = async (workspaceId,name ) => {
    try {
        // 🔹 Local storage se token fetch karo
        const token = localStorage.getItem('token');

        // 🔹 PUT request bhejna with token
        const response = await axios.put(
            `/workspace/${workspaceId}`,
            { name },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Auth header
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.data;

    } catch (error) {
        console.error("Error updating workspace:", error?.response || error);

        throw error?.response?.data || new Error("Network error");
    }
}

export const addChannelToWorkspace = async ({workspaceid, name}) => {
    try {
        // 🔹 Local storage se token fetch karo
        const token = localStorage.getItem('token');

        // 🔹 POST request bhejna with token
        const response = await axios.put(
            `/workspace/${workspaceid}/channel`,
            { name },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Auth header
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.data;

    } catch (error) {
        console.error("Error adding channel to workspace:", error?.response || error);

        throw error?.response?.data || new Error("Network error");
    }
}

export const joinWorkspace = async ({ workspaceid,joincode }) => {
    try {
        // 🔹 Local storage se token fetch karo
        const token = localStorage.getItem('token');

        
        const response = await axios.put(
            `/workspace/${workspaceid}/join`,
            { joincode },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Auth header
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.data;

    } catch (error) {
        console.error("Error adding member to workspace:", error?.response || error);

        throw error?.response?.data || new Error("Network error");
    }
}
