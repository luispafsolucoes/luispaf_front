import { Produto } from './Produto';
export class ItemPacote {
    public codigo: number;
    public codigoPacote: number;
    public codigoProduto: number;
    

    //--- trasient
    public produto: Produto;
}