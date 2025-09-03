import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { curriculo } from "../pages/types/curriculo";

export default function UltimosAdicionados() {
    const [curriculos, setCurriculos] = useState<curriculo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/curriculos")
            .then((response) => {
                const dados = response.data;
                // Ordena por ID decrescente e pega os 3 últimos
                const ultimos = dados.sort((a, b) => b.id - a.id).slice(0, 3);
                setCurriculos(ultimos);
            })
            .catch((error) => {
                console.error("Erro ao buscar currículos:", error);
            });
    }, []);

    const handleVisualizar = (id) => {
        navigate(`/curriculo/${id}`);
    };

    if (curriculos.length === 0) return null;

    return (
        <div className=" bg-white/10 p-6 rounded-lg max-w-2xl  shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Últimos Currículos Adicionados</h2>
            <ul className="space-y-4">
                {curriculos.map((curriculo) => (
                    <li key={curriculo.id} className="bg-white/10 p-4 rounded-lg flex justify-between">
                        <div>
                            <p className="text-lg font-bold">{curriculo.nome}</p>
                            <p className="text-gray-300">{curriculo.experiencias[0]?.cargo || 'Cargo não informado'}</p>
                        </div>
                        <button
                            className="cursor-pointer bg-cyan-400 text-blue-900 font-semibold px-4 py-2 rounded hover:bg-cyan-300 transition"
                            onClick={() => handleVisualizar(curriculo.id)}>
                            Visualizar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}