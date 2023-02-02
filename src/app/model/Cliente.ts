import { Cidade } from './Cidade';
export class Cliente {
    public codigo: number;
    public nome: string;
    public cpf: string;
    public email: string;
    public endereco: string;
    public telefone1: string;
    public telefone2: string;
    public dataCadastro: Date;
    public codigoCidade: number;

    //--- trasient
    public cidade: Cidade;
}