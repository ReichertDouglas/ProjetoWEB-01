import * as yup from 'yup';
import { curriculo } from '../types/curriculo';
import { nivel } from '../types/nivel';

export const CurriculoSchema: yup.ObjectSchema<curriculo> = yup.object({
  nome: yup.string().required('Nome é obrigatório').min(5, 'Mínimo 5 caracteres'),
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  telefone: yup.string().required('Telefone é obrigatório'),
  endereco: yup.object({
    cep: yup.string().required('CEP é obrigatório'),
    rua: yup.string().required('Rua é obrigatória'),
    numero: yup.number().required('Número é obrigatório'),
    bairro: yup.string().required('Bairro é obrigatório'),
    cidade: yup.string().required('Cidade é obrigatória'),
    estado: yup.string().required('Estado é obrigatório'),
  }),
  resumo: yup.string(),
  
  experiencias: yup.array().of(
    yup.object({
      cargo: yup.string().required('Cargo é obrigatório'),
      empresa: yup.string().required('Empresa é obrigatória'),
      inicio: yup.string().required('Data de início é obrigatória'),
      fim: yup.string().required('Data de fim é obrigatória'),
      descricao: yup.string(),
    }).required()
  ),

  formacoes: yup.array().of(
    yup.object({
      curso: yup.string().required('Curso é obrigatório'),
      instituicao: yup.string().required('Instituição é obrigatória'),
      anoConclusao: yup.number().required('Ano de conclusão é obrigatório'),
    }).required()
  ),

  idiomas: yup.array().of(
    yup.object({
      idioma: yup.string().required('Idioma é obrigatório'),
        nivel: yup.mixed<nivel>().oneOf([nivel.BASICO, nivel.INTERMEDIARIO, nivel.AVANCADO, nivel.FLUENTE]).required('Nível é obrigatório'),

    }).required()
  ),
    id: yup.number().transform(value => (isNaN(value) ? undefined : value)).optional()
});