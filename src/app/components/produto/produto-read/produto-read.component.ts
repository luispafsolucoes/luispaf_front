import { LoginService } from './../../login/login.service';
import { Status } from './../../../model/Status';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Page, PageRequest } from 'src/app/components/_util/pagination';
import { Produto } from './../../../model/Produto';
import { LocalStorageService } from './../../localStorage/local-storage.service';
import { ProdututoService } from './../prodututo.service';

@Component({
  selector: 'app-produto-read',
  templateUrl: './produto-read.component.html',
  styleUrls: ['./produto-read.component.css']
})
export class ProdutoReadComponent implements OnInit {

  public produtos : Produto[] = [];
  page: Page<Produto> = new Page([], 0);
  public carregando: boolean = false;
  public pageEvent: PageEvent | undefined;
  sortEvent: Sort | undefined;
  public produtoSearch : Produto = new Produto();

  public listStatus: Status[] = [];

  displayedColumns = ['nome', 'valor', 'status', 'dataativacao', 'datainativacao', 'action'];

  constructor(
    private produtoService: ProdututoService, 
    private router: Router,
    private localStorage: LocalStorageService,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
    this.montarStatus(); 
    this.listar();    
  } 
  
  montarStatus() {
    let ativo: Status =  new Status("ATIVO");
    let inativo: Status =  new Status("INATIVO");
    this.listStatus.push(ativo);
    this.listStatus.push(inativo);
  }

  todos() {
    this.produtoSearch =  new Produto();
    this.listar();
  }

  listar() {  
    this.produtoSearch.status = "ATIVO";
    this.produtoService.filtrarPage(this.getPageRequest("nome"), this.produtoSearch).then((listagem: any)  => {
      if (listagem && listagem.content.length > 0) {
        this.produtos = listagem.content;
        this.page.totalElements = listagem.totalElements;
      } else {
        this.produtos = [];
        this.page.totalElements = 0;
      }
      this.carregando = false;
    }).catch(erro => {
      this.carregando = false;
    });
  }

  criarProduto() {
    this.router.navigate(['produto/create']);
  }

  filtrar() {
    debugger;
    if (this.produtoSearch.nome || this.produtoSearch.status) {
      this.carregando = true;
      this.produtoService.filtrarPage(this.getPageRequest("nome"), this.produtoSearch).then((listagem: any)  => {
        if (listagem && listagem.content.length > 0) {
          this.produtos = listagem.content;
          this.page.totalElements = listagem.totalElements;
        } else {
          this.produtos = [];
          this.page.totalElements = 0;
        }
        this.carregando = false;
        //this.produtoSearch =  new Produto();
      }).catch(erro => {
        this.carregando = false;
      });
    } else {
      this.produtoService.showMessage("Informe ao menos um campo para a pesquisa!");
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

  uperCaseAndTrim_nome(value: string) {
    debugger
    this.produtoSearch.nome = value.trim().toUpperCase();
  }
}
