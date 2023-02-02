import { LoginService } from './../../login/login.service';
import { ClienteService } from './../../cliente/cliente.service';
import { LocalStorageService } from './../../localStorage/local-storage.service';
import { Router } from '@angular/router';
import { VpacoteService } from './../vpacote.service';
import { Cliente } from 'src/app/model/Cliente';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Page, PageRequest } from 'src/app/components/_util/pagination';
import { PacoteVendido } from './../../../model/PacoteVendido';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vpacote',
  templateUrl: './vpacote.component.html',
  styleUrls: ['./vpacote.component.css']
})
export class VpacoteComponent implements OnInit {

  public pacoteVendido : PacoteVendido[] = [];
  page: Page<PacoteVendido> = new Page([], 0);
  public carregando: boolean = false;
  public pageEvent: PageEvent | undefined;
  sortEvent: Sort | undefined;
  public pacoteVendidoSearch : PacoteVendido = new PacoteVendido();
  clientes: Cliente[] = [];
  pacotesVendidos: PacoteVendido[] = [];

  public listStatus: string[] = [];

  displayedColumns = ['nomeCliente', 'nomePacote', 'valor', 'dataVenda', 'dataConclusao', 'status', 'action'];

  constructor(
    private vpacoteService: VpacoteService, 
    private router: Router,
    private localStorage: LocalStorageService,
    private clienteService: ClienteService,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
    this.montarStatus(); 
    this.listarPacotesVendidos("ATIVO");
    this.buscarClientesSearch();   
  } 

  filtrar() {
    if (this.pacoteVendidoSearch.codigoCliente || this.pacoteVendidoSearch.status) {
      this.listarPacotesVendidos(this.pacoteVendidoSearch.status);
    } else {
      this.vpacoteService.showMessage("Informe ao menos um campo para a pesquisa!");
    }     
  }

  todos() {
    this.pacoteVendidoSearch = new PacoteVendido();
    this.listarPacotesVendidos("ATIVO");
  }

  criarVenda() {
    this.router.navigate(['vpacote/create']);
  }

  montarStatus() {
    this.listStatus.push("ATIVO");
    this.listStatus.push("CANCELADO");
    this.listStatus.push("FINALIZADO");
  }

  listarPacotesVendidos(status: string) {
    this.carregando = true;
    this.pacoteVendidoSearch.status = status;
    this.vpacoteService.filtrarPage(this.getPageRequest("validadePacote"), this.pacoteVendidoSearch).then((listagem: any)  => {
      if (listagem && listagem.content.length > 0) {
        this.pacotesVendidos = listagem.content;
        this.page.totalElements = listagem.totalElements;
        this.carregando = false;
      } else {
        this.pacotesVendidos = [];
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

  buscarClientesSearch() {
    this.clienteService.listarTodos().then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.clientes = listagem;
      } else {
        this.clientes = [];
      }
    }).catch(erro => {
      this.vpacoteService.showMessage("Falfa ao listar clientes: " + erro);
    });
  }

  getClasStatus($event) {
    if ($event === "ATIVO") {
      return "blue";
    } else {
      return "red";
    }    
  } 

  getClasDataValidade($event) {
    if (new Date(new Date($event).toDateString()) >= new Date(new Date().toDateString())) {
      return "blue";
    } else {
      return "red";
    }    
  } 

}
