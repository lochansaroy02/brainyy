import axios from "axios";
import { useEffect } from "react";
import { useContentStore } from "../utils/store";

export const useContent = () => {
    const { setContent } = useContentStore();

    const getContent = async () => {
        try {
            const response = await axios.get("http://localhost:5000/content/fetch", {
                headers: {
                    Authorization: localStorage.getItem("token") || ""
                }
            });
            const data = response.data.data;
            setContent(data);
        } catch (error) {
            console.error("Error fetching content:", error);
        }
    };

    useEffect(() => {
        getContent();
    }, []);

    return { refetch: getContent }; // 👈 Return the fetch function
};
