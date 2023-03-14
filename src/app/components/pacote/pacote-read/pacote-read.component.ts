import { LoginService } from './../../login/login.service';
import { LocalStorageService } from './../../localStorage/local-storage.service';
import { Router } from '@angular/router';
import { PacoteService } from './../pacote.service';
import { Status } from './../../../model/Status';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Page, PageRequest } from 'src/app/components/_util/pagination';
import { Pacote } from './../../../model/Pacote';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pacote-read',
  templateUrl: './pacote-read.component.html',
  styleUrls: ['./pacote-read.component.css']
})
export class PacoteReadComponent implements OnInit {

  public pacotes : Pacote[] = [];
  page: Page<Pacote> = new Page([], 0);
  public carregando: boolean = false;
  public pageEvent: PageEvent | undefined;
  sortEvent: Sort | undefined;
  public pacoteSearch : Pacote = new Pacote();

  public listStatus: Status[] = [];

  displayedColumns = ['nome', 'valor', 'status', 'dataativacao', 'datainativacao', 'action'];

  constructor(
    private pacoteService: PacoteService, 
    private router: Router,
    private localStorage: LocalStorageService,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado(); 
    this.montarStatus(); 
    this.listar();    
  } 

  desabilitaFuncaoInativar() {
    return false;
  }

  montarStatus() {
    let ativo: Status =  new Status("ATIVO");
    let inativo: Status =  new Status("INATIVO");
    this.listStatus.push(ativo);
    this.listStatus.push(inativo);
  }

  todos() {
    this.pacoteSearch =  new Pacote();
    this.listar();
  }

  listar() {  
    this.pacoteSearch.status = "ATIVO";
    this.pacoteService.filtrarPage(this.getPageRequest("nome"), this.pacoteSearch).then((listagem: any)  => {
      if (listagem && listagem.content.length > 0) {
        this.pacotes = listagem.content;
        this.page.totalElements = listagem.totalElements;
      } else {
        this.pacotes = [];
        this.page.totalElements = 0;
      }
      this.carregando = false;
    }).catch(erro => {
      this.carregando = false;
      this.pacoteService.showMessage(erro);
    });
  }
  
  criarPacote() {
    this.router.navigate(['pacote/create']);
  }

  filtrar() {
    if (this.pacoteSearch.nome || this.pacoteSearch.status) {
      this.carregando = true;
      this.pacoteService.filtrarPage(this.getPageRequest("nome"), this.pacoteSearch).then((listagem: any)  => {
        if (listagem && listagem.content.length > 0) {
          this.pacotes = listagem.content;
          this.page.totalElements = listagem.totalElements;
        } else {
          this.pacotes = [];
          this.page.totalElements = 0;
        }
        this.carregando = false;
      }).catch(erro => {
        this.carregando = false;
        this.pacoteService.showMessage(erro);
      });
    } else {
      this.pacoteService.showMessage("Informe ao menos um campo para a pesquisa!");
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
    this.pacoteSearch.nome = value.trim().toUpperCase();
  }

}
