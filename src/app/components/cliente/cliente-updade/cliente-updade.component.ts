import { LoginService } from './../../login/login.service';
import { Cidade } from './../../../model/Cidade';
import { Cliente } from './../../../model/Cliente';
import { ClienteService } from './../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CidadeService } from './../../cidade/cidade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-updade',
  templateUrl: './cliente-updade.component.html',
  styleUrls: ['./cliente-updade.component.css']
})
export class ClienteUpdadeComponent implements OnInit{

  cliente: Cliente =  new Cliente();
  idParaAlterar: number;
  cidades: Cidade[] = [];

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
    this.idParaAlterar = Number( this.route.snapshot.paramMap.get('id'));
    this.getById(this.idParaAlterar);
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

  atualizar() {
    if (this.clienteService.validarCampos(this.cliente)) {
      this.clienteService.atualizar(this.cliente).then(resposta => {  
        this.router.navigate(['/cliente']);
      this.clienteService.showMessage("Registro alterado com sucesso!");      
      }).catch(error => {
        this.clienteService.showMessage("Erro ao alterar registro: " + error);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/cliente']);
  }

  uperCaseAndTrim_nome(value: string) {
    this.cliente.nome = value.trim().toUpperCase();
  }

  trim_nome(value: string) {
    this.cliente.email = value.trim();
  }

  uperCaseAndTrim_endereco(value: string) {
    this.cliente.endereco = value.trim().toUpperCase();
  }
}
