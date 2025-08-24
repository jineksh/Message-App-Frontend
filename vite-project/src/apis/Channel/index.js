import axios from "@/config/axios";
export const getChannelById = async (channelId) => {
    try {
        // 🔹 Local storage se token fetch karo
        const token = localStorage.getItem('token');

        // 🔹 GET request bhejna with token
        const response = await axios.get(`channels/${channelId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Auth header
            }
        });
        return response.data.data;

    } catch (error) {
        console.error("Error fetching channel:", error?.response || error);

        throw error?.response?.data || new Error("Network error");
    }
}

export const getMessage = async ({ channelId, page, limit }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `messages/${channelId}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching messages:", error?.response || error);
    throw error?.response?.data || new Error("Network error");
  }
};
