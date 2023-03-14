import { Usuario } from './../../../model/Usuario';
import { LoginService } from './../../login/login.service';
import { HorarioEnum } from './../../../model/HorarioEnum';
import { Agenda } from './../../../model/Agenda';
import { AgendamentoService } from '../agendamento.service';
import { LocalStorageService } from 'src/app/components/localStorage/local-storage.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/Cliente';
import { TipoProdutoEnum } from 'src/app/model/TipoProdutoEnum';
import { Component } from '@angular/core';
import { ClienteService } from '../../cliente/cliente.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent {

  clientes: Cliente[] = [];
  tiposProduto: string[] = [];
  horarios: string[] = [];
  agenda: Agenda = new Agenda();

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private clienteService: ClienteService,
    private agendamentoService: AgendamentoService,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.usuarioESenhaValidos();
    this.buscarClientesSearch(); 
    this.montarTiposProduto();
    this.montarHorarios(); 
  } 

  usuarioESenhaValidos() {
    if (localStorage.getItem("idUsuarioAgenda") == null) {
      this.localStorage.clear();
      this.router.navigate(['/login']);
    } 
  }

  agendar() {
    if (this.validaCampos(this.agenda)) {
      let usuario: Usuario = new Usuario();
      usuario.codigo = Number(localStorage.getItem("idUsuarioAgenda"));
      this.loginService.getUsuario(usuario).then((usuario: Usuario)  => {
        this.agenda.codigoEmpresa = usuario.codigoEmpresa;
        this.agenda.status = "ATIVO";
        this.salvar(this.agenda);
      }).catch(erro => {
        this.agendamentoService.showMessage(erro);
      });
    }
  }

  salvar(agenda: Agenda) {
    this.agendamentoService.salvar(agenda).then(resposta => {  
      this.agenda = new Agenda();
      this.agendamentoService.showMessage("Cliente agendado com sucesso!");      
    }).catch(error => {
      this.agendamentoService.showMessage("Erro ao salvar registro: " + error);
    });
  }

  sair() {
    this.localStorage.clear();
    this.router.navigate(['/login']);
  }

  montarHorarios() {
    for(var x in HorarioEnum) {
      if(typeof HorarioEnum[x] === 'number') {
        this.horarios.push(x);
      }
    }
  }

  montarTiposProduto() {
    for(var x in TipoProdutoEnum) {
      if(typeof TipoProdutoEnum[x] === 'number') {
        this.tiposProduto.push(x);
      }
    }
  }

  buscarClientesSearch() {
    this.clienteService.listarTodos().then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.clientes = listagem;
      } else {
        this.clientes = [];
      }
    }).catch(erro => {
      this.agendamentoService.showMessage("Falfa ao listar clientes: " + erro);
    });
  }

  limparDataAgendamento() {
    this.agenda.dataAgenda = null;
  }

  validaCampos(agenda: Agenda) {
    let ret = true;
    if (!agenda.codigoCliente) {
      this.agendamentoService.showMessage("Cliente é obrigatório!");
      return false;
    }

    if (!agenda.tipoproduto) {
      this.agendamentoService.showMessage("Tipo Produto é obrigatório!");
      return false;
    }

    if (!agenda.dataAgenda) {
      this.agendamentoService.showMessage("Data Agenda é obrigatório!");
      return false;
    }

    if (!agenda.horario) {
      this.agendamentoService.showMessage("Horario é obrigatório!");
      return false;
    }   

    if (new Date(new Date(agenda.dataAgenda).toDateString()) < new Date(new Date().toDateString())) {
      this.agendamentoService.showMessage("A data de agendamento tem que ser maior que a data atual!");
      return false;
    }
    return true;
  }
}
