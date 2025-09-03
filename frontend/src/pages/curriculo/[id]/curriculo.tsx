import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCurriculoById } from "../../../controllers/curriculocontroller";
import { useNavigate } from 'react-router-dom';

export default function Curriculo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [curriculo, setCurriculo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

useEffect(() => {
  const getCurriculo = async () => {
      const result = await fetchCurriculoById(id as string);
      if (result.error || !result.data) {
        setErro(true);
      } else {
        setCurriculo(result.data);
      }
      setLoading(false);
    };
    getCurriculo();
  }, [id]);

  if (loading) return <div className="p-6 text-gray-500">Carregando...</div>;
  if (erro || !curriculo) return <div className="p-6 text-red-500">Currículo não encontrado.</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-10 text-gray-800 font-sans">
        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold">{curriculo.nome}</h1>
          <p className="text-md text-gray-600">{curriculo.email} | {curriculo.telefone}</p>
          <p className="text-sm text-gray-600">
            {curriculo.endereco?.rua}, {curriculo.endereco?.numero} - {curriculo.endereco?.bairro}, {curriculo.endereco?.cidade}/{curriculo.endereco?.estado} - CEP: {curriculo.endereco?.cep}
          </p>
        </div>

        {curriculo.resumo && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Resumo Profissional</h2>
            <p className="text-justify leading-relaxed">{curriculo.resumo}</p>
          </section>
        )}

        {curriculo.experiencias?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Experiência Profissional</h2>
            {curriculo.experiencias.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold text-lg">{exp.cargo} - <span className="font-normal text-gray-700">{exp.empresa}</span></h3>
                <p className="text-sm text-gray-600">{exp.inicio} - {exp.fim}</p>
                <p className="mt-1 text-justify">{exp.descricao}</p>
              </div>
            ))}
          </section>
        )}

        {curriculo.formacoes?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Formação Acadêmica</h2>
            {curriculo.formacoes.map((formacao, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold">{formacao.curso}</h3>
                <p className="text-sm text-gray-700">{formacao.instituicao} - Conclusão: {formacao.anoConclusao}</p>
              </div>
            ))}
          </section>
        )}

        {curriculo.idiomas?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Idiomas</h2>
            <ul className="list-disc pl-6">
              {curriculo.idiomas.map((idioma, index) => (
                <li key={index} className="mb-1">
                  {idioma.idioma} - {idioma.nivel}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <div className="pt-10 text-center">
          <button
            onClick={() => navigate("/visualizar-curriculos")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer "
          >
            Voltar para a Lista
          </button>
        </div>
    </div>
  );
}