import { LoginService } from './../../login/login.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Page, PageRequest } from 'src/app/components/_util/pagination';
import { Pacote } from './../../../model/Pacote';
import { Produto } from './../../../model/Produto';
import { ProdututoService } from './../../produto/prodututo.service';
import { PacoteService } from './../pacote.service';

@Component({
  selector: 'app-pacote-create',
  templateUrl: './pacote-create.component.html',
  styleUrls: ['./pacote-create.component.css']
})
export class PacoteCreateComponent implements OnInit {

  pacote: Pacote = new Pacote();
  produtos: Produto[] = [];
  produtoSelecionado: Produto;
  proutosSelecionados: Produto[] = [];

  page: Page<Produto> = new Page([], 0);
  public carregando: boolean = false;
  public pageEvent: PageEvent | undefined;
  sortEvent: Sort | undefined;

  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns = ['nome', 'valor', 'action'];

  constructor(
    private pacoteservice: PacoteService,
    private router: Router,
    private produtoService: ProdututoService,
    private changeDetectorRefs: ChangeDetectorRef,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
    this.listarProdutosAtivos();
  }  

  listarProdutosAtivos() {
    debugger;
    let produtoFind = new Produto();
    produtoFind.status = "ATIVO";
    this.produtoService.buscar(produtoFind).then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.produtos = listagem;
      } else {
        this.produtoService.showMessage("Nenhuma produto cadastrada!");
      }
    }).catch(erro => {
      this.produtoService.showMessage("Erro ao listar produtos: " + erro);
    });
  }

  removerDaLista(produto: Produto) {
    this.pacote.valor = this.pacote.valor - produto.valor;
    var index = this.proutosSelecionados.indexOf(produto);
    this.proutosSelecionados.splice(index, 1);
    if (this.proutosSelecionados.length == 0) {
      this.pacote.valor = 0;
    }
    this.table.renderRows();
  }
  
  salvar() {
    debugger;
    this.pacote.dataCriacao = new Date();
    this.pacote.status = "ATIVO"
    this.pacote.produtos = this.proutosSelecionados;
    
    if (this.pacoteservice.validaCampos(this.pacote)) {      
      this.pacoteservice.salvar(this.pacote).then(resposta => {  
      this.pacote = new Pacote(); 
      this.proutosSelecionados = [];
      this.produtoSelecionado = new Produto();
      this.pacoteservice.showMessage("Registro salvo com sucesso!");      
    }).catch(error => {
      this.pacoteservice.showMessage("Erro ao salvar registro: " + error.message);
    });
    }
  }

  desabilitaValor(): boolean {
    debugger;
    return true;
  }

  cancelar() {
    this.router.navigate(['/pacote']);
  }

  uperCaseAndTrim_nome(value: string) {
    this.pacote.nome = value.trim().toUpperCase();
  }

  adicionar() {
    debugger;
    if (this.produtoSelecionado) {
      this.pacote.valor = this.pacote.valor ? Number(this.pacote.valor) + this.produtoSelecionado.valor :  this.produtoSelecionado.valor;
      this.proutosSelecionados.push(this.produtoSelecionado);
      this.changeDetectorRefs.detectChanges();
      this.table.renderRows();
    } else {
      this.pacoteservice.showMessage("Selecione um produto!");
    }    
  }

  /*
    retorna apenas numeros e ponto para formar valor de real
  */
    onKeypressEvent(event: any): boolean {
      debugger;
      if ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)) {
        return true;
      }
      return false;
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
