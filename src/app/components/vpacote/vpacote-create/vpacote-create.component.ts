import { LoginService } from './../../login/login.service';
import { PacoteService } from './../../pacote/pacote.service';
import { PacoteVendido } from './../../../model/PacoteVendido';
import { Pacote } from './../../../model/Pacote';
import { Cliente } from 'src/app/model/Cliente';
import { Router } from '@angular/router';
import { ClienteService } from './../../cliente/cliente.service';
import { VpacoteService } from './../vpacote.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vpacote-create',
  templateUrl: './vpacote-create.component.html',
  styleUrls: ['./vpacote-create.component.css']
})
export class VpacoteCreateComponent implements OnInit {

  clientesSearch: Cliente[] = [];
  pacotesSearch: Pacote[] = [];
  pacotevendido: PacoteVendido = new PacoteVendido();

  constructor(
    private vpacoteService: VpacoteService,
    private clienteService: ClienteService,
    private router: Router,
    private pacoteService: PacoteService,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
    this.listarClientesSearch();
    this.listarPacotesAtivosSearch();
  }  
  
  public onDate(event): void {
    this.pacotevendido.validadePacote = event.value;
  }

  limparValidadePacote() {
    this.pacotevendido.validadePacote = null;
  }

  salvarPacoteVendido() {
    if (this.validaCampos(this.pacotevendido)) {
      this.pacotevendido.dataInicio = new Date();
      this.pacotevendido.status = "ATIVO";
      this.vpacoteService.salvar(this.pacotevendido).then(resposta => {  
        this.pacotevendido = new PacoteVendido()
        this.vpacoteService.showMessage("Pacote salvo com sucesso!");      
      }).catch(error => {
        this.vpacoteService.showMessage("Erro ao salvar Pedido: " + error);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/vpacote']);
  }

  listarClientesSearch() {
    this.clienteService.listarTodos().then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.clientesSearch = listagem;
      } else {
        this.vpacoteService.showMessage("Nenhum cliente cadastrado!");
      }
    }).catch(erro => {
      this.vpacoteService.showMessage("Erro ao listar clientes: " + erro);
    });
  }

  listarPacotesAtivosSearch() {
    this.pacoteService.listarPacotesAtivosOrdenadoPornome().then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.pacotesSearch = listagem;
      } else {
        this.vpacoteService.showMessage("Nenhum Pacote cadastrado!");
      }
    }).catch(erro => {
      this.vpacoteService.showMessage("Erro ao listar Pacotes: " + erro);
    });
  }

  validaCampos(pacoteVendido: PacoteVendido) {
    let ret = true;
    if (!pacoteVendido.codigoCliente) {
      this.vpacoteService.showMessage("Cliente é obrigatório!");
      return false;
    }

    if (!pacoteVendido.codigoPacote) {
      this.vpacoteService.showMessage("Pacote é obrigatório!");
      return false;
    }

    if (!pacoteVendido.validadePacote) {
      this.vpacoteService.showMessage("Validade é obrigatório!");
      return false;
    }

    if (new Date(new Date(pacoteVendido.validadePacote).toDateString()) < new Date(new Date().toDateString())) {
      this.vpacoteService.showMessage("A data de validade tem que ser maior que a data atual!");
      return false;
    }
    return true;
  }
}
