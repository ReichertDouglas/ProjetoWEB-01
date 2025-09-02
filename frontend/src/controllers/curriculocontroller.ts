import Error from "../components/messages/error";
import { successCreate } from "../components/messages/success";
import type { curriculo } from "../pages/types/curriculo";
import axios from "axios";

const URL_BASE = "http://localhost:3001/curriculos";

const onSubmit = async (curriculo: curriculo) => {
    try {
        const response = await axios.post(URL_BASE, curriculo);
        if (response.status == 201)
            successCreate();
    } catch (error) {
        Error();
        console.log(error);
    }
};

export { onSubmit };