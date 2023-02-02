import { Cliente } from 'src/app/model/Cliente';
export class Agenda {
    public codigo: number;
	public codigoCliente: number;
	public dataAgenda: Date;
	public horario: string;
	public status: string;
	public codigoEmpresa: number;
	public tipoproduto: string;
	
	// transient
	public cliente: Cliente;
}