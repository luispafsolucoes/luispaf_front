import { LoginService } from './../../login/login.service';
import { LocalStorageService } from './../../localStorage/local-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Page, PageRequest } from 'src/app/components/_util/pagination';
import { Cidade } from '../../../model/Cidade';
import { CidadeService } from './../cidade.service';

@Component({
  selector: 'app-cidade-read',
  templateUrl: './cidade-read.component.html',
  styleUrls: ['./cidade-read.component.css']
})
export class CidadeReadComponent implements OnInit {

  public cidades : Cidade[] = [];
  page: Page<Cidade> = new Page([], 0);
  public carregando: boolean = false;
  public pageEvent: PageEvent | undefined;
  sortEvent: Sort | undefined;
  public cidadeSearch : Cidade = new Cidade(null, null, null);

  displayedColumns = ['nome', 'uf', 'action'];

  constructor(
    private cidadeService: CidadeService, 
    private router: Router,
    private localStorage: LocalStorageService,
    private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
    this.listar();
  }  

  todos() {
    this.cidadeSearch =  new Cidade(null, null, null);
    this.listar();
  }

  listar() {
    if (this.cidadeSearch.nome || this.cidadeSearch.uf) {
      this.filtrar();
    } else {
      this.carregando = true;
      this.cidadeService.listar(this.getPageRequest("nome")).then((listagem: any)  => {
        if (listagem && listagem.content.length > 0) {
          this.cidades = listagem.content;
          this.page.totalElements = listagem.totalElements;
          this.carregando = false;
        } else {
          this.cidades = [];
          this.carregando = false;
        }
      }).catch(erro => {
        this.carregando = false;
      });
    }   
  }  

  filtrar() {
    debugger;
    if (this.cidadeSearch.nome || this.cidadeSearch.uf) {
      this.carregando = true;
      this.cidadeService.filtrarPage(this.getPageRequest("nome"), this.cidadeSearch).then((listagem: any)  => {
        if (listagem && listagem.content.length > 0) {
          this.cidades = listagem.content;
          this.page.totalElements = listagem.totalElements;
          this.carregando = false;
        } else {
          this.cidades = [];
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

  criarCidade() {
    this.router.navigate(['cidade/create']);
  }

  uperCaseAndTrim_nome(value: string) {
    debugger
    this.cidadeSearch.nome = value.trim().toUpperCase();
  }

  uperCaseAndTrim_uf(value: string) {
    this.cidadeSearch.uf = value.trim().toUpperCase();
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
