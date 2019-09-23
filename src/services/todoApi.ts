import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

const getTodoList = async () => {
    const response = await axios.get("/todos");
    return response.data;

}

export { getTodoList }