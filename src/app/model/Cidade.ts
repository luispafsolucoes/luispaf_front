export class Cidade {
    public codigo: number;
    public nome: string;
    public uf: string;

    constructor(codigo: number, nome: string, uf: string) {
        this.codigo = codigo;
        this.nome = nome;
        this.uf = uf;
    }
}