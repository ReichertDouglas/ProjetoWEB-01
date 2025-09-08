import { endereco } from "./endereco";
import { experiencia } from "./experiencia";
import { formacao } from "./formacao";
import { idioma } from "./idioma";

export type curriculo = {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
    endereco?: endereco;
    resumo?: string;
    experiencias?: experiencia[];
    formacoes?: formacao[];
    idiomas?: idioma[];
}