import { LoginService } from './../../login/login.service';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Page } from 'src/app/components/_util/pagination';
import { Cliente } from './../../../model/Cliente';
import { PedidoVendido } from './../../../model/PedidoVendido';
import { ClienteService } from './../../cliente/cliente.service';
import { LocalStorageService } from './../../localStorage/local-storage.service';
import { PageRequest } from './../../_util/pagination';
import { VprodutoService } from './../vproduto.service';

@Component({
  selector: 'app-vproduto-read',
  templateUrl: './vproduto-read.component.html',
  styleUrls: ['./vproduto-read.component.css']
})
export class VprodutoReadComponent  implements OnInit {

  
  public pedidoVendido : PedidoVendido[] = [];
  page: Page<PedidoVendido> = new Page([], 0);
  public carregando: boolean = false;
  public pageEvent: PageEvent | undefined;
  sortEvent: Sort | undefined;
  public pedidoVendidoSearch : PedidoVendido = new PedidoVendido();
  clientes: Cliente[] = [];
  pedidosDoDia: PedidoVendido[] = [];

  public listStatus: string[] = [];

  displayedColumns = ['nome', 'dataativacao', 'valor', 'status', 'action'];

  constructor(
    private vprodutoService: VprodutoService, 
    private router: Router,
    private localStorage: LocalStorageService,
    private clienteService: ClienteService,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
    this.montarStatus(); 
    this.listarPedidosDodia("ABERTO");
    this.buscarClientesSearch();   
  } 

  limparDataInicio() {
    this.pedidoVendidoSearch.dataCriacao = null;
  }

  montarStatus() {
    let aberto: string = "ABERTO";
    let recebido: string = "RECEBIDO";
    this.listStatus.push(aberto);
    this.listStatus.push(recebido);
  }

  buscarClientesSearch() {
    this.clienteService.listarTodos().then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.clientes = listagem;
      } else {
        this.clientes = [];
      }
    }).catch(erro => {
      this.vprodutoService.showMessage("Falfa ao listar clientes: " + erro);
    });
  }

  
  listarPedidosDodia(status: string) {
    debugger;
    this.carregando = true;
    this.pedidoVendidoSearch.status = status;
    this.vprodutoService.listarPedidosDodia(this.getPageRequest("codpedidovendido"), this.pedidoVendidoSearch).then((listagem: any)  => {
      if (listagem && listagem.content.length > 0) {
        this.pedidosDoDia = listagem.content;
        this.page.totalElements = listagem.totalElements;
        this.carregando = false;
      } else {
        this.pedidosDoDia = [];
        this.carregando = false;
        this.page.totalElements = 0;
      }
    }).catch(erro => {
      this.carregando = false;
    });  
  }

  filtrar() {
    debugger;
    if (this.pedidoVendidoSearch.codigoCliente || this.pedidoVendidoSearch.status) {
      this.listarPedidosDodia(this.pedidoVendidoSearch.status);
    } else {
      this.vprodutoService.showMessage("Informe ao menos um campo para a pesquisa!");
    }   
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

  todos() {
    this.pedidoVendidoSearch = new PedidoVendido();
    this.listarPedidosDodia("ABERTO");
  }

  criarVenda() {
    this.router.navigate(['vproduto/create']);
  }
}
