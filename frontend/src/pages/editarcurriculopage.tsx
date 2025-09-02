import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { IMaskInput } from 'react-imask';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const schema = yup.object().shape({
  fullName: yup.string().required('Nome é obrigatório').min(3),
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  phone: yup.string().required('Telefone é obrigatório'),
  address: yup.object().shape({
    cep: yup.string().required('CEP é obrigatório'),
    street: yup.string().required('Rua é obrigatória'),
    number: yup.string().required('Número é obrigatório'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
    state: yup.string().required('Estado é obrigatório'),
  }),
  summary: yup.string().required('Resumo é obrigatório').min(30, 'Mínimo 30 caracteres'),
  experiences: yup.array().of(
    yup.object().shape({
      role: yup.string().required('Cargo é obrigatório'),
      company: yup.string().required('Empresa é obrigatória'),
      startDate: yup.string().required('Data de início é obrigatória'),
      endDate: yup.string().required('Data de fim é obrigatória'),
      description: yup.string().required('Descrição é obrigatória'),
    })
  ),
  education: yup.array().of(
    yup.object().shape({
      course: yup.string().required('Curso é obrigatório'),
      institution: yup.string().required('Instituição é obrigatória'),
      year: yup.string().required('Ano de conclusão é obrigatório'),
    })
  ),
  languages: yup.array().of(
    yup.object().shape({
      language: yup.string().required('Idioma é obrigatório'),
      level: yup.string().required('Nível é obrigatório'),
    })
  ),
});

export default function EditarCurriculoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: {
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
      },
      summary: '',
      experiences: [{ role: '', company: '', startDate: '', endDate: '', description: '' }],
      education: [{ course: '', institution: '', year: '' }],
      languages: [{ language: '', level: '' }],
    },
  });

  const { fields: experienceFields, append: addExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experiences',
  });

  const { fields: educationFields, append: addEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education',
  });

  const { fields: languageFields, append: addLanguage, remove: removeLanguage } = useFieldArray({
    control,
    name: 'languages',
  });

  useEffect(() => {
    if (!id) return;
    const fetchCurriculo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/curriculos/${id}`);
        const data = response.data;
        console.log('data', data)
        // Mapeia do backend para frontend
        const curriculoFormatado = {
          fullName: data.nome || '',
          email: data.email || '',
          phone: data.telefone || '',
          address: {
            cep: data.endereco?.cep || '',
            street: data.endereco?.rua || '',
            number: data.endereco?.numero || '',
            neighborhood: data.endereco?.bairro || '',
            city: data.endereco?.cidade || '',
            state: data.endereco?.estado || '',
          },
          summary: data.resumo || '',
          experiences: data.experiencias?.map((exp) => ({
            role: exp.cargo || '',
            company: exp.empresa || '',
            startDate: exp.inicio || '',
            endDate: exp.fim || '',
            description: exp.descricao || '',
          })) || [{ role: '', company: '', startDate: '', endDate: '', description: '' }],
          education: data.formacoes?.map((edu) => ({
            course: edu.curso || '',
            institution: edu.instituicao || '',
            year: edu.anoConclusao || '',
          })) || [{ course: '', institution: '', year: '' }],
          languages: data.idiomas?.map((lang) => ({
            language: lang.idioma || '',
            level: lang.nivel || '',
          })) || [{ language: '', level: '' }],
        };

        reset(curriculoFormatado);
        console.log('Currículo formatado para reset:', curriculoFormatado);
      } catch (error) {
        console.error('Erro ao carregar currículo:', error);
        alert('Erro ao carregar currículo.');
      }
    };

    fetchCurriculo();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      // Mapeia para o formato do backend
      const dataParaBackend = {
        nome: data.fullName,
        email: data.email,
        telefone: data.phone,
        endereco: {
          cep: data.address.cep,
          rua: data.address.street,
          numero: data.address.number,
          bairro: data.address.neighborhood,
          cidade: data.address.city,
          estado: data.address.state,
        },
        resumo: data.summary,
        experiencias: data.experiences.map(exp => ({
          cargo: exp.role,
          empresa: exp.company,
          inicio: exp.startDate,
          fim: exp.endDate,
          descricao: exp.description,
        })),
        formacoes: data.education.map(edu => ({
          curso: edu.course,
          instituicao: edu.institution,
          anoConclusao: edu.year,
        })),
        idiomas: data.languages.map(lang => ({
          idioma: lang.language,
          nivel: lang.level,
        })),
      };

      const response = await axios.put(`http://localhost:3001/curriculos/${id}`, dataParaBackend);

      if (response.status !== 200) throw new Error('Erro ao atualizar currículo');

      alert('Currículo atualizado com sucesso!');
      navigate('/listar-curriculos'); // ou onde quiser redirecionar após salvar
    } catch (error) {
      console.error('Erro ao atualizar currículo:', error);
      alert('Erro ao atualizar currículo.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      {/* Informações Pessoais */}
      <h2 className="text-xl font-bold">Informações Pessoais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input {...register('fullName')} placeholder="Nome completo" className="input" />
        <p className="text-red-500 text-sm">{errors.fullName?.message}</p>

        <input {...register('email')} placeholder="Email" className="input" />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <IMaskInput
              {...field}
              mask="(00) 00000-0000"
              placeholder="Telefone"
              className="input"
              onAccept={(value) => field.onChange(value)}
            />
          )}
        />
        <p className="text-red-500 text-sm">{errors.phone?.message}</p>

        <input {...register('address.cep')} placeholder="CEP" className="input" />
        <input {...register('address.street')} placeholder="Rua" className="input" />
        <input {...register('address.number')} placeholder="Número" className="input" />
        <input {...register('address.neighborhood')} placeholder="Bairro" className="input" />
        <input {...register('address.city')} placeholder="Cidade" className="input" />
        <input {...register('address.state')} placeholder="Estado" className="input" />
      </div>

      {/* Resumo Profissional */}
      <h2 className="text-xl font-bold">Resumo Profissional</h2>
      <textarea {...register('summary')} placeholder="Resumo profissional" className="input h-24" />
      <p className="text-red-500 text-sm">{errors.summary?.message}</p>

      {/* Experiência Profissional */}
      <h2 className="text-xl font-bold">Experiência Profissional</h2>
      {experienceFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register(`experiences.${index}.role`)} placeholder="Cargo" className="input" />
          <input {...register(`experiences.${index}.company`)} placeholder="Empresa" className="input" />
          <input type="date" {...register(`experiences.${index}.startDate`)} className="input" />
          <input type="date" {...register(`experiences.${index}.endDate`)} className="input" />
          <textarea {...register(`experiences.${index}.description`)} placeholder="Descrição" className="input h-20" />
          <button type="button" className="text-red-600" onClick={() => removeExperience(index)}>Remover</button>
        </div>
      ))}
      <button type="button" onClick={() => addExperience({ role: '', company: '', startDate: '', endDate: '', description: '' })} className="btn">
        Adicionar Experiência
      </button>

      {/* Formação Acadêmica */}
      <h2 className="text-xl font-bold">Formação Acadêmica</h2>
      {educationFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input {...register(`education.${index}.course`)} placeholder="Curso" className="input" />
          <input {...register(`education.${index}.institution`)} placeholder="Instituição" className="input" />
          <input type="text" {...register(`education.${index}.year`)} placeholder="Ano de Conclusão" className="input" />
          <button type="button" className="text-red-600" onClick={() => removeEducation(index)}>Remover</button>
        </div>
      ))}
      <button type="button" onClick={() => addEducation({ course: '', institution: '', year: '' })} className="btn">
        Adicionar Formação
      </button>

      {/* Idiomas */}
      <h2 className="text-xl font-bold">Idiomas</h2>
      {languageFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register(`languages.${index}.language`)} placeholder="Idioma" className="input" />
          <select {...register(`languages.${index}.level`)} className="input">
            <option value="">Selecione o nível</option>
            <option value="Básico">Básico</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
            <option value="Fluente">Fluente</option>
          </select>
          <button type="button" className="text-red-600" onClick={() => removeLanguage(index)}>Remover</button>
        </div>
      ))}
      <button type="button" onClick={() => addLanguage({ language: '', level: '' })} className="btn">
        Adicionar Idioma
      </button>

      {/* Ações */}
      <div className="flex justify-between pt-4">
        <button type="submit" className="cursor-pointer mt-2 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-600">
          Atualizar
        </button>
        <button
          type="button"
          className="cursor-pointer mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => navigate('/listar-curriculos')}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};