import { Produto } from './Produto';
export class ItemPacoteVendido {
    public codigo: number;
    public codigoPacoteVendido: number;
    public codigoProduto: number;
    public dataInicio: Date;
    public dataFim: Date;
    public codigoEmpresa: number;
    public status: string;
    
    //--- trasient
    public produto: Produto;
}