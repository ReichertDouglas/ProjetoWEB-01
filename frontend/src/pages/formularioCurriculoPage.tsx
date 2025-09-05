import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from "react-imask";
import { useNavigate, useParams } from "react-router-dom";

import { curriculo } from "./types/curriculo";
import { nivel } from "./types/nivel";
import { CurriculoSchema } from "./schemas/curriculoschema";
import { successCreate, successUpdate } from "../components/messages/success";
import { errorAction } from "../components/messages/error";
import {
  atualizarCurriculo,
  buscarCurriculoPorId,
  criarCurriculo,
} from "../controllers/curriculocontroller";

export default function GerenciarCurriculoPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const voltarParaLista = () => navigate("/visualizar-curriculos");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<curriculo>({ resolver: yupResolver(CurriculoSchema) });

  const {
    fields: experienciaFields,
    append: addExperiencia,
    remove: removeExperiencia,
  } = useFieldArray({
    control,
    name: "experiencias",
  });

  const {
    fields: formacaoFields,
    append: addFormacao,
    remove: removeFormacao,
  } = useFieldArray({
    control,
    name: "formacoes",
  });

  const {
    fields: idiomaFields,
    append: addIdioma,
    remove: removeIdioma,
  } = useFieldArray({
    control,
    name: "idiomas",
  });

  useEffect(() => {
    if (!id) return;

    const fetchCurriculo = async () => {
      try {
        const data = await buscarCurriculoPorId(id);
        reset(data);
      } catch (error) {
        console.error("Erro ao carregar currículo:", error);
        errorAction();
      }
    };

    fetchCurriculo();
  }, [id, reset]);

  const onSubmit = async (data: curriculo) => {
    try {
      let response;

      if (id) {
        response = await atualizarCurriculo(id, data);
      } else {
        response = await criarCurriculo(data);
      }

      if (response.status === 200 || response.status === 201) {
        if (id) {
          successUpdate(navigate);
        } else {
          successCreate(navigate);
        }
      }
    } catch (error) {
      console.error("Erro ao salvar currículo:", error);
      errorAction();
    }
  };

  return (
    <div className="py-8 px-4 md:py-15 md:px-30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-white/10 text-white shadow-md rounded-lg flex flex-col gap-5 p-5 md:px-30 md:py-15"
      >
        <h1 className="text-2xl font-bold text-center">
          {id ? "Editar Currículo" : "Criar Currículo"}
        </h1>

        <h2 className="text-xl font-bold text-center">Informações Pessoais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 text-center text-sm gap-5">
          <div>
            <p> Nome completo </p>
            <input {...register("nome")} className="border-1 rounded w-full" />
            <p className="text-red-500 text-sm">{errors.nome?.message}</p>
          </div>

          <div>
            <p> Email </p>
            <input {...register("email")} className="border-1 rounded w-full" />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <p> Telefone </p>
            <Controller
              name="telefone"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="(00) 00000-0000"
                  className="border-1 rounded w-full"
                  onAccept={(value) => field.onChange(value)}
                />
              )}
            />
            <p className="text-red-500 text-sm">{errors.telefone?.message}</p>
          </div>

          <div>
            <p> CEP </p>
            <input
              {...register("endereco.cep")}
              className="border-1 rounded w-full"
            />
          </div>

          <div>
            <p> Rua </p>
            <input
              {...register("endereco.rua")}
              className="border-1 rounded w-full"
            />
          </div>

          <div>
            <p> Número </p>
            <input
              {...register("endereco.numero")}
              className="border-1 rounded w-full"
            />
          </div>

          <div>
            <p> Bairro </p>
            <input
              {...register("endereco.bairro")}
              className="border-1 rounded w-full"
            />
          </div>

          <div>
            <p> Cidade </p>
            <input
              {...register("endereco.cidade")}
              className="border-1 rounded w-full"
            />
          </div>

          <div>
            <p> Estado </p>
            <input
              {...register("endereco.estado")}
              className="border-1 rounded w-full"
            />
          </div>
        </div>

        <h2 className="text-xl font-bold">Resumo Profissional</h2>
        <textarea
          {...register("resumo")}
          className="w-full h-24 border-1 rounded"
        />
        <p className="text-red-500 text-sm">{errors.resumo?.message}</p>

        <h2 className="text-xl font-bold">Experiência Profissional</h2>
        {experienciaFields.map((item, index) => (
          <div key={item.id} className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm gap-8">
              <div>
                <p> Cargo </p>
                <input
                  {...register(`experiencias.${index}.cargo`)}
                  className="border-1 rounded w-full"
                />
              </div>

              <div>
                <p> Empresa </p>
                <input
                  {...register(`experiencias.${index}.empresa`)}
                  className="border-1 rounded w-full"
                />
              </div>

              <div>
                <p> Início </p>
                <input
                  type="date"
                  {...register(`experiencias.${index}.inicio`)}
                  className="border-1 rounded w-full"
                />
              </div>

              <div>
                <p> Fim </p>
                <input
                  type="date"
                  {...register(`experiencias.${index}.fim`)}
                  className="border-1 rounded w-full"
                />
              </div>
            </div>

            <div>
              <p className="text-sm mt-10"> Descrição </p>
              <textarea
                {...register(`experiencias.${index}.descricao`)}
                className="w-full border-1 rounded"
              />
            </div>

            <button
              type="button"
              onClick={() => removeExperiencia(index)}
              className="text-red-500 mt-2 bg-black/30 p-2 rounded-md"
            >
              Remover Experiência
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addExperiencia({
              cargo: "",
              empresa: "",
              inicio: "",
              fim: "",
              descricao: "",
            })
          }
          className="bg-white/30 rounded p-1 cursor-pointer"
        >
          Adicionar Experiência
        </button>

        <h2 className="text-xl font-bold">Formação Acadêmica</h2>
        {formacaoFields.map((item, index) => (
          <div key={item.id} className="text-center text-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm">
              <div>
                <p> Curso </p>
                <input
                  {...register(`formacoes.${index}.curso`)}
                className="border-1 rounded"
                />
              </div>
              <div>
                <p> Instituição </p>
                <input
                  {...register(`formacoes.${index}.instituicao`)}
                className="border-1 rounded"
                />
              </div>
              <div>
                <p> Ano de Conclusão </p>
                <input
                  type="text"
                  {...register(`formacoes.${index}.anoConclusao`)}
                className="border-1 rounded"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeFormacao(index)}
              className="text-red-500 mt-4 bg-black/30 p-2 rounded-md"
            >
              Remover Formação
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addFormacao({ curso: "", instituicao: "", anoConclusao: 0 })
          }
          className="bg-white/30 rounded p-1 cursor-pointer"
        >
          Adicionar Formação
        </button>

        <h2 className="text-xl font-bold">Idiomas</h2>
        {idiomaFields.map((item, index) => (
          <div
            key={item.id}
            className="text-center text-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center text-sm">
              <div>
                <p> Idioma </p>
                <input
                  {...register(`idiomas.${index}.idioma`)}
                className="border-1 rounded w-full"
                />
              </div>
              <div>
                <p> Nível </p>
                <select
                  {...register(`idiomas.${index}.nivel`)}
                  className="border-1 rounded w-full select-auto"
                >
                  <option selected>Selecione o nível</option>
                  <option value="BASICO">Básico</option>
                  <option value="INTERMEDIARIO">Intermediário</option>
                  <option value="AVANCADO">Avançado</option>
                  <option value="FLUENTE">Fluente</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeIdioma(index)}
              className="text-red-500 mt-4 bg-black/30 p-2 rounded-md"
            >
              Remover Idioma
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addIdioma({ idioma: "", nivel: nivel.BASICO })}
          className="bg-white/30 rounded p-1 cursor-pointer"
        >
          Adicionar Idioma
        </button>

        <div className="flex justify-around pt-4">
          <button
            type="button"
            className="cursor-pointer mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-900"
            onClick={voltarParaLista}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="cursor-pointer mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-900"
          >
            {id ? "Atualizar Currículo" : "Salvar Currículo"}
          </button>
        </div>
      </form>
    </div>
  );
}
