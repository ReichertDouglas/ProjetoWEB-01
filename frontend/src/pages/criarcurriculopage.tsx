import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';
import { onSubmit } from '../controllers/curriculocontroller';
import { CurriculoSchema } from "./schemas/curriculoschema";
import { curriculo } from './types/curriculo';
import { nivel } from './types/nivel';
import { successCreate } from '../components/messages/success';
import { errorAction } from '../components/messages/error';

export const CriarCurriculoPage = () => {
  const navigate = useNavigate();
  const listaCurriculos = () => navigate('/visualizar-curriculos');

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<curriculo>({ resolver: yupResolver(CurriculoSchema) });

  const { fields: experienciaFields, append: addExperiencia } = useFieldArray({control, name: 'experiencias'});

  const { fields: formacaoFields, append: addFormacao } = useFieldArray({control, name: 'formacoes'});

  const { fields: idiomaFields, append: addIdioma } = useFieldArray({control, name: 'idiomas'});

  const handleFormSubmit = async (data: curriculo) => {
    try {
      const response = await onSubmit(data);

      if (response.status === 201) {
        successCreate(navigate)
        setTimeout(() => {
          listaCurriculos();
        }, 2000);
      }
    } catch (error) {
      errorAction();
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-xl font-bold">Informações Pessoais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-sm mt-10"> Nome completo </p>
          <input {...register('nome')} className="border-1 rounded" />
          <p className="text-red-500 text-sm">{errors.nome?.message}</p>
        </div>
        <div>
          <p className="text-sm mt-10"> Email </p>
          <input {...register('email')} className="border-1 rounded" />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div>
          <p className="text-sm mt-10"> Telefone </p>
          <Controller
            name="telefone"
            control={control}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask="(00) 00000-0000"
                className="border-1 rounded"
                onAccept={(value) => field.onChange(value)}
              />
            )}
          />
          <p className="text-red-500 text-sm">{errors.telefone?.message}</p>
        </div>
        <div>
          <p className="text-sm mt-10"> CEP </p>
          <input {...register('endereco.cep')} className="border-1 rounded" />
        </div>
        <div>
          <p className="text-sm mt-10"> Rua </p>
          <input {...register('endereco.rua')} className="border-1 rounded" />
        </div>
        <div>
          <p className="text-sm mt-10"> Número </p>
          <input {...register('endereco.numero')} className="border-1 rounded" />
        </div>
        <div>
          <p className="text-sm mt-10"> Bairro </p>
          <input {...register('endereco.bairro')} className="border-1 rounded" />
        </div>
        <div>
          <p className="text-sm mt-10"> Cidade </p>
          <input {...register('endereco.cidade')} className="border-1 rounded" />
        </div>
        <div>
          <p className="text-sm mt-10"> Estado </p>
          <input {...register('endereco.estado')} className="border-1 rounded" />
        </div>
      </div>

      <h2 className="text-xl font-bold">Resumo Profissional</h2>
      <textarea {...register('resumo')} className="w-full h-24 border-1 rounded" />
      <p className="text-red-500 text-sm">{errors.resumo?.message}</p>

      <h2 className="text-xl font-bold">Experiência Profissional</h2>
      {experienciaFields.map((item, index) => (
        <div key={item.id} className="text-center">
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
            <p className="text-sm mt-10"> Cargo </p>
            <input {...register(`experiencias.${index}.cargo`)} className="border-1 rounded" />
            </div>
            <div>
              <p className="text-sm mt-10"> Empresa </p>
              <input {...register(`experiencias.${index}.empresa`)} className="border-1 rounded" />
            </div>
            <div>
              <p className="text-sm mt-10"> Data de início </p>
              <input type="date" {...register(`experiencias.${index}.inicio`)} className="border-1 rounded" />
            </div>
            <div>
              <p className="text-sm mt-10"> Data de fim </p>
              <input type="date" {...register(`experiencias.${index}.fim`)} className="border-1 rounded" />
            </div>
          </div>
            <div>
              <p className="text-sm mt-10"> Descrição </p>
              <textarea {...register(`experiencias.${index}.descricao`)} className="w-full border-1 rounded" />
            </div>
        </div>
      ))}
      <button type="button" onClick={() => addExperiencia({ cargo: '', empresa: '', inicio: '', fim: '', descricao: '' })} className="bg-blue-400 rounded p-1 cursor-pointer">
        Adicionar Experiência
      </button>

      <h2 className="text-xl font-bold">Formação Acadêmica</h2>
      {formacaoFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm mt-10"> Curso </p>
            <input {...register(`formacoes.${index}.curso`)} className="border-1 rounded" />
          </div>
          <div>
            <p className="text-sm mt-10"> Instituição </p>
            <input {...register(`formacoes.${index}.instituicao`)} className="border-1 rounded" />
          </div>
          <div>
            <p className="text-sm mt-10"> Ano de Conclusão </p>
            <input type="text" {...register(`formacoes.${index}.anoConclusao`)} className="border-1 rounded" />
          </div>
        </div>
      ))}
      <button type="button" onClick={() => addFormacao({ curso: '', instituicao: '', anoConclusao: 0 })} className="bg-blue-400 rounded p-1 cursor-pointer">
        Adicionar Formação
      </button>

      <h2 className="text-xl font-bold">Idiomas</h2>
      {idiomaFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm mt-10"> Idioma </p>
            <input {...register(`idiomas.${index}.idioma`)} className="border-1 rounded" />
          </div>
          <div>
            <p className="text-sm mt-10"> Nível </p>
            <select {...register(`idiomas.${index}.nivel`)} className="border-1 rounded">
              <option value="">Selecione o nível</option>
              <option value="BASICO">Básico</option>
              <option value="INTERMEDIARIO">Intermediário</option>
              <option value="AVANCADO">Avançado</option>
              <option value="FLUENTE">Fluente</option>
            </select>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => addIdioma({ idioma: '', nivel: nivel.BASICO })} className="bg-blue-400 rounded p-1 cursor-pointer">
        Adicionar Idioma
      </button>

      <div className="flex justify-between pt-4">
        <button type="submit" className="cursor-pointer mt-2 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-600">
          Salvar Currículo
        </button>
        <button type="button" className="cursor-pointer mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => listaCurriculos()}>
          Cancelar
        </button>
      </div>
    </form>
  );
};