import { LoginService } from './../../login/login.service';
import { Router } from '@angular/router';
import { ClienteService } from './../cliente.service';
import { CidadeService } from './../../cidade/cidade.service';
import { Cidade } from './../../../model/Cidade';
import { Cliente } from './../../../model/Cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = new Cliente();
  cidades: Cidade[] = [];

  constructor(
    private cidadeService: CidadeService,
    private clienteService: ClienteService,
    private router: Router,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
    this.listarCidade();
  }  

  listarCidade() {
    this.cidadeService.listarTodos().then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.cidades = listagem;
      } else {
        this.cidadeService.showMessage("Nenhuma cidade cadastrada!");
      }
    }).catch(erro => {
      this.cidadeService.showMessage("Erro ao listar cidades: " + erro);
    });
  }

  salvar() {
    if (this.clienteService.validarCampos(this.cliente)) {
      this.cliente.dataCadastro = new Date();
      this.clienteService.salvar(this.cliente).then(resposta => {  
      this.cliente = new Cliente(); 
      this.clienteService.showMessage("Registro salvo com sucesso!");      
    }).catch(error => {
      this.clienteService.showMessage("Erro ao salvar registro: " + error);
    });
    }
  }

  cancelar() {
    this.router.navigate(['/cliente']);
  }

  uperCaseAndTrim_nome(value: string) {
    this.cliente.nome = value.trim().toUpperCase();
  }

  trim_email(value: string) {
    this.cliente.email = value.trim();
  }

  uperCaseAndTrim_endereco(value: string) {
    this.cliente.endereco = value.trim().toUpperCase();
  } 
}
