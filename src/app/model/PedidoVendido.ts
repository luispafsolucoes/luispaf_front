import { Cliente } from './Cliente';
import { Produto } from './Produto';
export class PedidoVendido {
    public codigo: number;
    public codigoCliente: number;
    public codigoEmpresa: number;
    public codigoUsuario: number;
    public dataCriacao: Date;
    public dataFinalizacao: Date;
    public valor: number;
    public status: string;

    //trasinet

    public produtos: Produto[];
    public cliente: Cliente;
}