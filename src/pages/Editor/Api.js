import axios from 'axios';
import { LANGUAGE_VERSION } from "../../constants";

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
});

export const executeCode = async (language, sourceCode) => {
    try {
        const response = await API.post("/execute", {
            "language": language,
            "version": LANGUAGE_VERSION[language],
            "files": [
                {
                    "content": sourceCode,
                }
            ]
        });
        return response.data;
    } catch (error) {
        console.error("Error executing code:", error);
        throw new Error("Failed to execute code. Please try again.");
    }
};
