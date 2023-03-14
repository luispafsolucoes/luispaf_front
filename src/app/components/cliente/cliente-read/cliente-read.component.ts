import { LoginService } from './../../login/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Page, PageRequest } from 'src/app/components/_util/pagination';
import { Cliente } from './../../../model/Cliente';
import { CidadeService } from './../../cidade/cidade.service';
import { ClienteService } from './../cliente.service';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements OnInit {

  public clientes : Cliente[] = [];
  page: Page<Cliente> = new Page([], 0);
  public carregando: boolean = false;
  public pageEvent: PageEvent | undefined;
  sortEvent: Sort | undefined;
  public clienteSearch = new Cliente();

  displayedColumns = ['nome', 'endereco', 'cidade', 'telefone1', 'cpf', 'action'];

  constructor(
    private clienteService: ClienteService,
    private cidadeService: CidadeService,
    private router: Router,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
    this.listar();
  }  

  listar() {
    if (this.clienteSearch.nome || this.clienteSearch.telefone1 || this.clienteSearch.cpf) {
      this.filtrar();
    } else {
      this.carregando = true;
      this.clienteService.listar(this.getPageRequest("nome")).then((listagem: any)  => {
        if (listagem && listagem.content.length > 0) {
          this.clientes = listagem.content;
          this.page.totalElements = listagem.totalElements;
          this.carregando = false;
        } else {
          this.clientes = [];
          this.carregando = false;
        }
      }).catch(erro => {
        console.log("teste");
        this.carregando = false;
      });
    }    
  } 

  uperCaseAndTrim_nome(value: string) {
    this.clienteSearch.nome = value.trim().toUpperCase();
  }

  filtrar() {
    if (this.clienteSearch.nome || this.clienteSearch.telefone1 || this.clienteSearch.cpf) {
      this.carregando = true;
      this.clienteService.filtrarPage(this.getPageRequest("nome"), this.clienteSearch).then((listagem: any)  => {
        if (listagem && listagem.content.length > 0) {
          this.clientes = listagem.content;
          this.page.totalElements = listagem.totalElements;
          this.carregando = false;
        } else {
          this.clientes = [];
          this.carregando = false;
          this.page.totalElements = 0;
        }
      }).catch(erro => {
        this.carregando = false;
      });
    } else {
      this.cidadeService.showMessage("Informe ao menos um campo para a pesquisa!");
    }   
  }

  todos() {
    this.clienteSearch =  new Cliente();
    this.listar();
  }

  criarCliente() {
    this.router.navigate(['cliente/create']);
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
