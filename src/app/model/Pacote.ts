import { Produto } from './Produto';
export class Pacote {
    public codigo: number;
    public nome: string;
    public valor: number;
    public dataCriacao: Date;
    public dataInativacao: Date;
    public status: string;

    //--- trasient
    
    public produtos: Produto[];
}
