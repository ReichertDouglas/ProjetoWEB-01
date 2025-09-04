import type { curriculo } from "../pages/types/curriculo";
import axios from "axios";

const URL_BASE = "http://localhost:3001/curriculos";

const criarCurriculo = async (curriculo: curriculo) => {
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

const buscarUltimosCurriculos = async () => {
  try {
    const response = await axios.get(URL_BASE);
    const dados = response.data;
    const ultimos = dados.sort((a, b) => b.id - a.id).slice(0, 3);
    return ultimos;
  } catch (error) {
    console.error("Erro ao buscar os últimos currículos:", error);
    return [];
  }
};

const listarCurriculos = async () => {
  const response = await axios.get(URL_BASE);
  return response.data;
};

const deletarCurriculo = async (id: number) => {
  await axios.delete(`${URL_BASE}/${id}`);
};

const atualizarCurriculo = async (id: string, data: curriculo) => {
  const response = await axios.put(`${URL_BASE}/${id}`, data);
  return response;
};

const buscarCurriculoPorId = async (id: string) => {
  const response = await axios.get(`${URL_BASE}/${id}`);
  return response.data;
};

export {
  criarCurriculo,
  fetchCurriculoById,
  buscarUltimosCurriculos,
  listarCurriculos,
  deletarCurriculo,
  atualizarCurriculo,
  buscarCurriculoPorId
};