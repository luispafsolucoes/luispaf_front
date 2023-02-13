import { LoginService } from './../../login/login.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/Cliente';
import { ItemPedidoVendido } from './../../../model/ItemPedidoVendido';
import { PedidoVendido } from './../../../model/PedidoVendido';
import { Produto } from './../../../model/Produto';
import { ProdututoService } from './../../produto/prodututo.service';
import { Page, PageRequest } from './../../_util/pagination';
import { VitemPedidoService } from './../vitem-pedido.service';
import { VprodutoService } from './../vproduto.service';

@Component({
  selector: 'app-vproduto-update',
  templateUrl: './vproduto-update.component.html',
  styleUrls: ['./vproduto-update.component.css']
})
export class VprodutoUpdateComponent implements OnInit {

  idParaAlterar: number;

  page: Page<ItemPedidoVendido> = new Page([], 0);
  public carregando: boolean = false;
  public pageEvent: PageEvent | undefined;
  sortEvent: Sort | undefined;
  itensPedidoVendido: ItemPedidoVendido[] = [];
  pedidoVendido: PedidoVendido = new PedidoVendido();
   produtos: Produto[] = [];
   produtoSelecionado: Produto;

   @ViewChild(MatTable) table: MatTable<any>;

   displayedColumns = ['nome', 'valor', 'status', 'action'];

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private vitemPedidoService: VitemPedidoService,
    private vprodutoService: VprodutoService,
    private produtoService: ProdututoService,
    private changeDetectorRefs: ChangeDetectorRef,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado(); 
    this.pedidoVendido.cliente = new Cliente();
    this.idParaAlterar = Number( this.route.snapshot.paramMap.get('id'));
    this.getPedidoVendido();
    this.getItensPedidoVenda();
    this.listarProdutosAtivos();
  }

  inativarBotoes() {
    if (this.pedidoVendido.status != "ABERTO") {
      return false;
    } 
    return true;
  }

  salvarPedido() {
    if (this.produtoSelecionado && this.pedidoVendido.codigo) {
      let itemPedidoVendido: ItemPedidoVendido = new ItemPedidoVendido();
      itemPedidoVendido.codigoPedidoVendido = this.pedidoVendido.codigo;
      itemPedidoVendido.codigoProduto = this.produtoSelecionado.codigo;
      this.vitemPedidoService.salvar(itemPedidoVendido).then(resposta => { 
        this.produtoSelecionado = new Produto();
        this.getPedidoVendido();   // busca novamente para ajustar os valores
        this.getItensPedidoVenda();
        this.produtoService.showMessage("Pedido salvo com sucesso!");      
      }).catch(error => {
        this.produtoService.showMessage("Erro ao salvar Pedido: " + error);
      });
    } else {
      this.vprodutoService.showMessage("Nenhum produto selecionado!");
    }
  }

  finalizarVenda() {
    debugger;
    this.pedidoVendido.status = "RECEBIDO";    
    this.pedidoVendido.dataFinalizacao = this.pedidoVendido.dataCriacao;
    this.salvarPedidoVendido(this.pedidoVendido);
  }

  salvarPedidoVendido(pedidoVendido: PedidoVendido) {
    debugger;
    this.vprodutoService.salvar(pedidoVendido).then(resposta => { 
      this.router.navigate(['/vproduto']);
      this.produtoService.showMessage("Pedido finalizado com sucesso!");      
    }).catch(error => {
      this.produtoService.showMessage("Erro ao finalizar Pedido: " + error);
    });  
  }

  deletar(item: ItemPedidoVendido) {  
    this.vitemPedidoService.deletar(item.codigo).then(resposta => {
      this.produtoService.showMessage('Registro deletado com sucesso!');
      this.getPedidoVendido();   // busca novamente para ajustar os valores
      this.getItensPedidoVenda();
    }).catch(erro => {
      this.produtoService.showMessage('Erro ao excluir registro: ' + erro);
    });    
    //this.table.renderRows();
  }

  salvar() {
    let itemPedidoVendido: ItemPedidoVendido = new ItemPedidoVendido();
    itemPedidoVendido.codigoPedidoVendido = this.pedidoVendido.codigo;
    itemPedidoVendido.codigoProduto = this.produtoSelecionado.codigo;
    this.vitemPedidoService.salvar(itemPedidoVendido).then(resposta => { 
      this.produtoSelecionado = new Produto();
      this.getPedidoVendido();   // busca novamente para ajustar os valores
      this.getItensPedidoVenda();
      this.produtoService.showMessage("Pedido salvo com sucesso!");      
    }).catch(error => {
      this.produtoService.showMessage("Erro ao salvar Pedido: " + error);
    });
  }

  listarProdutosAtivos() {
    debugger;
    this.produtoService.listarTodos().then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.produtos = listagem;
      } else {
        this.vprodutoService.showMessage("Nenhum produto cadastrado!");
      }
    }).catch(erro => {
      this.vprodutoService.showMessage("Erro ao listar produtos: " + erro);
    });
  }

  getItensPedidoVenda() { 
    this.carregando = true;
    let pedidoVendido: PedidoVendido = new PedidoVendido(); 
    pedidoVendido.codigo = this.idParaAlterar;
    this.vitemPedidoService.getItensPedidoVenda(this.getPageRequest("codigo"), pedidoVendido).then((listagem: any)  => {
      if (listagem && listagem.content.length > 0) {
        this.itensPedidoVendido = listagem.content;
        this.page.totalElements = listagem.totalElements;
      } else {
        this.itensPedidoVendido = [];
        this.page.totalElements = 0;
      }
      this.carregando = false;
    }).catch(erro => {
      this.carregando = false;
    });
  }

  getPedidoVendido() { 
    this.carregando = true;
    let pedidoVendido: PedidoVendido = new PedidoVendido(); 
    pedidoVendido.codigo = this.idParaAlterar;
    this.vprodutoService.filtrarPage(this.getPageRequest("codigo"), pedidoVendido).then((listagem: any)  => {
      if (listagem && listagem.content.length > 0) {
        this.pedidoVendido = listagem.content[0];
      }
    }).catch(erro => {
      this.vprodutoService.showMessage("Falha ao buscar Pedido Vendido: " + erro);
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

  voltar() {
    this.router.navigate(['/vproduto']);
  }
}
