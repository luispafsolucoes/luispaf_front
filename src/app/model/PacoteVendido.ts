import { Pacote } from './Pacote';
import { Cliente } from 'src/app/model/Cliente';
export class PacoteVendido {
    public codigo: number;
    public codigoPacote: number;
    public codigoCliente: number;
    public codigoEmpresa: number;
    public dataInicio: Date;
    public dataFim: Date;
    public status: string;   
    public validadePacote: Date; 

    //trasinet
    public cliente: Cliente;
    // public itens: 
    public pacote: Pacote;
}