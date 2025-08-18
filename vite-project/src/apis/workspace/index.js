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
    try{
        // 🔹 Local storage se token fetch karo
        const token = localStorage.getItem('token');

        // 🔹 GET request bhejna with token
        const response = await axios.get(`/workspace/${workspaceId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Auth header
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching workspace by ID:", error?.response || error);
        throw error?.response?.data || new Error("Network error");
    }
}
