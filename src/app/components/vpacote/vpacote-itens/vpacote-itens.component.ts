import { LoginService } from './../../login/login.service';
import { ItemPacoteVendido } from './../../../model/ItemPacoteVendido';
import { ItemPacoteService } from './../../vpacote/item-pacote.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VpacoteService } from './../vpacote.service';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Page, PageRequest } from './../../_util/pagination';
import { PacoteVendido } from './../../../model/PacoteVendido';
import { Component, OnInit } from '@angular/core';
import { Pacote } from 'src/app/model/Pacote';
import { Cliente } from 'src/app/model/Cliente';

@Component({
  selector: 'app-vpacote-itens',
  templateUrl: './vpacote-itens.component.html',
  styleUrls: ['./vpacote-itens.component.css']
})
export class VpacoteItensComponent implements OnInit {

  page: Page<PacoteVendido> = new Page([], 0);
  public carregando: boolean = false;
  public pageEvent: PageEvent | undefined;
  sortEvent: Sort | undefined;

  
  pacoteVendido: PacoteVendido =  new PacoteVendido();
  idParaAlterar: number;
  intensPacoteVendido: ItemPacoteVendido[] = [];

  displayedColumns = ['nome', 'dataativacao', 'dataconclusao', 'status', 'action'];

  constructor(
    private pacoteVendidoService: VpacoteService, 
    private router: Router, 
    private route: ActivatedRoute,
    private itemPacoteService: ItemPacoteService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
    this.pacoteVendido.pacote = new Pacote();
    this.pacoteVendido.cliente = new Cliente();
    this.idParaAlterar = Number( this.route.snapshot.paramMap.get('id'));
    this.getById(this.idParaAlterar);
    this.listar();
  }

  listar() {  
    let itemPacoteVendido: ItemPacoteVendido = new ItemPacoteVendido();
    itemPacoteVendido.codigoPacoteVendido = this.idParaAlterar;
    this.itemPacoteService.filtrarPage(this.getPageRequest("status"), itemPacoteVendido).then((listagem: any)  => {
      if (listagem && listagem.content.length > 0) {
        this.intensPacoteVendido = listagem.content;
        this.page.totalElements = listagem.totalElements;
      } else {
        this.intensPacoteVendido = [];
        this.page.totalElements = 0;
      }
      this.carregando = false;
    }).catch(erro => {
      this.carregando = false;
      this.itemPacoteService.showMessage(erro);
    });
  }

  cancelarPacoteVendido() {
    if (new Date(this.pacoteVendido.dataInicio).toDateString() == new Date().toDateString()) {
      this.pacoteVendido.dataFim = new Date();
      this.pacoteVendido.status = "CANCELADO";
      this.pacoteVendidoService.cancelarPacote(this.pacoteVendido).then(resposta => { 
        this.router.navigate(['/vpacote']);
        this.pacoteVendidoService.showMessage("PacoteVendido cancelado com sucesso!");      
      }).catch(error => {
        this.pacoteVendidoService.showMessage("Erro ao cancelar PacoteVendido: " + error);
      });
    } else {
      this.itemPacoteService.showMessage("Só pode cancelar pacote do dia atual, pois este pacote já foi contabiliado no caixa.");
    } 
  }

  finalizarItem(itemPacv: ItemPacoteVendido) {
    debugger;
    itemPacv.dataFim = new Date();
    itemPacv.status = "FINALIZADO";    
    this.pacoteVendidoService.inativarItemPacoteVendido(itemPacv).then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        if (listagem[0].status != "ATIVO") {
          this.router.navigate(['/vpacote']);
        }
        this.itemPacoteService.showMessage("Item finalizado com sucesso!");
      }
    }).catch(erro => {
      this.pacoteVendidoService.showMessage("Falfa ao inativar item: " + erro);
    });    
  }

  cancelar() {
    this.router.navigate(['/vpacote']);
  }

  getClasStatus($event) {
    if ($event === "ATIVO") {
      return "blue";
    } else {
      return "red";
    }    
  } 

  getById(id: number) {
    let pacoteVendidoSearch: PacoteVendido =  new PacoteVendido();
    pacoteVendidoSearch.codigo = id;
    this.pacoteVendidoService.buscar(pacoteVendidoSearch).then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.pacoteVendido = listagem[0];
      }
    }).catch(erro => {
      console.log("Erro ao buscar por ID");
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
