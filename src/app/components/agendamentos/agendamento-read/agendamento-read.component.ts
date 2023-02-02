import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { AgendamentoService } from './../agendamento.service';
import { LoginService } from './../../login/login.service';
import { LocalStorageService } from 'src/app/components/localStorage/local-storage.service';
import { Router } from '@angular/router';
import { Agenda } from './../../../model/Agenda';
import { Component, OnInit } from '@angular/core';
import { Page, PageRequest } from 'src/app/components/_util/pagination';

@Component({
  selector: 'app-agendamento-read',
  templateUrl: './agendamento-read.component.html',
  styleUrls: ['./agendamento-read.component.css']
})
export class AgendamentoReadComponent implements OnInit {

  agenda: Agenda = new Agenda();
  agendados: Agenda[] = [];

  page: Page<Agenda> = new Page([], 0);
  public carregando: boolean = false;
  public pageEvent: PageEvent | undefined;
  sortEvent: Sort | undefined;

  displayedColumns = ['nomeCliente', 'dataAgenda', 'horario', 'status', 'tipoProduto'];

  constructor(
    private agendamentoService: AgendamentoService, 
    private router: Router,
    private localStorage: LocalStorageService,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado(); 
    this.filtrarAgendaDataAtual();
    debugger;
  } 

  limparData() {
    this.agenda = new Agenda();
  }

  filtrarAgendaDataAtual() {
    this.agenda.dataAgenda = new Date();
    this.filtrarPage(this.agenda); 
  }

  filtrar() {
    this.filtrarPage(this.agenda);
  }

  filtrarPage(agenda: Agenda) {
    debugger;
    this.agendamentoService.filtrarPage(this.getPageRequest("horario"), agenda).then((listagem: any)  => {
      if (listagem && listagem.content.length > 0) {
        this.agendados = listagem.content;
        this.page.totalElements = listagem.totalElements;
        this.carregando = false;
      } else {
        this.agendados = [];
        this.carregando = false;
        this.page.totalElements = 0;
      }
    }).catch(erro => {
      this.carregando = false;
    });  
  }

  getPageRequest(orderColum: string): PageRequest {
    const queryAdicional = new Map();
    return new PageRequest(
      {
          pageNumber: this.pageEvent ? this.pageEvent.pageIndex : 0,
          pageSize: this.pageEvent ? this.pageEvent.pageSize : 5,
      },
      {
        property: this.sortEvent ? this.sortEvent.active : orderColum,
        direction: this.sortEvent ? this.sortEvent.direction : "asc",
      },
      queryAdicional
    )
  }

}
