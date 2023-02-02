import { LoginService } from './../../login/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from './../../../model/Cidade';
import { Cliente } from './../../../model/Cliente';
import { CidadeService } from './../../cidade/cidade.service';
import { ClienteService } from './../cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = new Cliente();
  cidades: Cidade[] = [];
  idParaDeletar: number;

  constructor(
    private cidadeService: CidadeService, 
    private router: Router, 
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
    this.listarCidade();
    this.idParaDeletar = Number(this.route.snapshot.paramMap.get('id'));
    this.getById(this.idParaDeletar);
  }  

  getById(id: number) {
    let cid: Cliente = new Cliente();
    cid.codigo = id;
    this.clienteService.buscar(cid).then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.cliente = listagem[0];
      }
    }).catch(erro => {
      console.log("Erro ao buscar por ID");
    });
  }

  listarCidade() {
    debugger;
    this.cidadeService.listarTodos().then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.cidades = listagem;
      } else {
        this.clienteService.showMessage("Nenhuma cidade cadastrada!");
      }
    }).catch(erro => {
      this.clienteService.showMessage("Erro ao listar cidades: " + erro);
    });
  }

  cancelar() {
    this.router.navigate(['/cliente']);
  }

  deletar() {
    this.clienteService.deletar(this.idParaDeletar).then(resposta => {
      this.clienteService.showMessage('Registro deletado com sucesso!');
      this.router.navigate(['/cliente']);
    }).catch(erro => {
      this.clienteService.showMessage('Erro ao excluir registro: ' + erro);
    });
  }
}
