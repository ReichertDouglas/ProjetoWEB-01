import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { buscarCargos, buscarIdiomas, buscarTotal } from "../controllers/estatisticascontroller";

export default function Dashboard() {
  const [total, setTotal] = useState(0);
  const [cargos, setCargos] = useState<{ cargo: string; quantidade: number }[]>([]);
  const [idiomas, setIdiomas] = useState<{ idioma: string; quantidade: number }[]>([]);

  useEffect(() => {
    async function carregarDados() {
      const [t, c, i] = await Promise.all([
        buscarTotal(),
        buscarCargos(),
        buscarIdiomas()
      ]);
      setTotal(t);
      setCargos(c);
      setIdiomas(i);
    }

    carregarDados();
  }, []);

  if (total === 0) {
    return null;
  }

  const cargosData = [
    ["Cargo", "Quantidade"],
    ...cargos.map(item => [item.cargo, item.quantidade])
  ];

  const idiomasData = [
    ["Idioma", "Quantidade"],
    ...idiomas.map(item => [item.idioma, item.quantidade])
  ];

  return (
    <div className="p-6 bg-white/10 rounded-lg shadow-md mx-auto max-w-4xl text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Resumo Geral dos Currículos</h2>
      
      <div className="text-center text-5xl font-extrabold mb-8">
        {total}
        <span className="text-xl block mt-2">Currículos cadastrados</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Chart
            chartType="BarChart"
            width="100%"
            height="300px"
            data={cargosData}
            options={{
              title: "Top 3 Cargos Mais Comuns",
              legend: { position: "none" },
              chartArea: { width: "70%" },
              hAxis: { title: "Quantidade", minValue: 0 },
              vAxis: { title: "Cargo" },
              colors: ["#42a5f5"],
            }}
          />
        </div>
        <div>
          <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={idiomasData}
            options={{
              title: "Top 3 Idiomas",
              pieHole: 0.4,
            }}
          />
        </div>
      </div>
    </div>
  );
}