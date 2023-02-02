import { Produto } from './Produto';
export class ItemPedidoVendido {
    public codigo: number;
    public codigoPedidoVendido: number;
    public codigoProduto: number;
    public codigoEmpresa: number;
    
    //--- trasient
    public produto: Produto;
}