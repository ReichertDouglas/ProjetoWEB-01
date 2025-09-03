import type { curriculo } from "../pages/types/curriculo";
import axios from "axios";

const URL_BASE = "http://localhost:3001/curriculos";

const onSubmit = async (curriculo: curriculo) => {
    const response = await axios.post(URL_BASE, curriculo);
    return response;
};

const fetchCurriculoById = async (id: string) => {
  try {
    const response = await axios.get(`${URL_BASE}/${id}`);
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Erro ao buscar currículo:", error);
    return { data: null, error: true };
  }
};

export { onSubmit, fetchCurriculoById };