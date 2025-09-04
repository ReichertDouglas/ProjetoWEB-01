import axios from "axios";

const URL_BASE = "http://localhost:3001/estatisticas";

export async function buscarTotal() {
  const res = await axios.get(`${URL_BASE}/total`);
  return res.data?.total ?? 0;
}

export async function buscarCargos() {
  const res = await axios.get(`${URL_BASE}/cargos`);
  return res.data ?? [];
}

export async function buscarIdiomas() {
  const res = await axios.get(`${URL_BASE}/idiomas`);
  return res.data ?? [];
}