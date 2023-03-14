import { LoginService } from './../../login/login.service';
import { ItemPacote } from './../../../model/ItemPacote';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Page, PageRequest } from './../../_util/pagination';
import { ItemPacoteService } from './../item-pacote.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PacoteService } from './../pacote.service';
import { Pacote } from './../../../model/Pacote';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pacote-update',
  templateUrl: './pacote-update.component.html',
  styleUrls: ['./pacote-update.component.css']
})
export class PacoteUpdateComponent  implements OnInit {
  page: Page<Pacote> = new Page([], 0);
  public carregando: boolean = false;
  public pageEvent: PageEvent | undefined;
  sortEvent: Sort | undefined;

  pacote: Pacote =  new Pacote();
  idParaAlterar: number;
  intensPacote: ItemPacote[] = [];

   displayedColumns = ['nome', 'valor', 'status'];

  constructor(
    private pacoteService: PacoteService, 
    private router: Router, 
    private route: ActivatedRoute,
    private itemPacoteService: ItemPacoteService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
    this.idParaAlterar = Number( this.route.snapshot.paramMap.get('id'));
    this.getById(this.idParaAlterar);
    this.listar();
  }

  listar() {  
    let pacoteSelecionado: Pacote = new Pacote();
    pacoteSelecionado.codigo = this.idParaAlterar;
    this.itemPacoteService.filtrarPage(this.getPageRequest("codigo"), pacoteSelecionado).then((listagem: any)  => {
      if (listagem && listagem.content.length > 0) {
        this.intensPacote = listagem.content;
        this.page.totalElements = listagem.totalElements;
      } else {
        this.intensPacote = [];
        this.page.totalElements = 0;
      }
      this.carregando = false;
    }).catch(erro => {
      this.carregando = false;
      this.itemPacoteService.showMessage(erro);
    });
  }

  getById(id: number) {
    let pacoteSearch: Pacote =  new Pacote();
    pacoteSearch.codigo = id;
    this.pacoteService.buscar(pacoteSearch).then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.pacote = listagem[0];
      }
    }).catch(erro => {
      console.log("Erro ao buscar por ID");
    });
  }

  inativarPacote() {
    this.pacote.dataInativacao = new Date();
    this.pacote.status = "INATIVO";
     this.pacoteService.inativarPacote(this.pacote).then(resposta => {  
        this.router.navigate(['/pacote']);
      this.pacoteService.showMessage("Registro alterado com sucesso!");      
      }).catch(error => {
        this.pacoteService.showMessage("Erro ao alterar registro: " + error.message);
      });    
  }

  cancelar() {
    this.router.navigate(['/pacote']);
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
