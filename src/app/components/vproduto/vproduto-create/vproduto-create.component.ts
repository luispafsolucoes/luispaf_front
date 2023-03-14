import { LoginService } from './../../login/login.service';
import { MatTable } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { Produto } from './../../../model/Produto';
import { ProdututoService } from './../../produto/prodututo.service';
import { PageEvent } from '@angular/material/paginator';
import { Page, PageRequest } from 'src/app/components/_util/pagination';
import { Router } from '@angular/router';
import { ClienteService } from './../../cliente/cliente.service';
import { VprodutoService } from './../vproduto.service';
import { Cliente } from './../../../model/Cliente';
import { PedidoVendido } from './../../../model/PedidoVendido';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-vproduto-create',
  templateUrl: './vproduto-create.component.html',
  styleUrls: ['./vproduto-create.component.css']
})
export class VprodutoCreateComponent implements OnInit {

  pedidoVendido: PedidoVendido = new PedidoVendido();
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  produtosSelecionados: Produto[] = [];
  produtoSelecionado: Produto;

  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns = ['nome', 'valor', 'status', 'action'];

  constructor(
    private vprodutoService: VprodutoService,
    private produtoService: ProdututoService,
    private clienteService: ClienteService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
    this.listarClientes();
    this.listarProdutosAtivos();
  }  

  removerDaLista(produto: Produto) {
    this.pedidoVendido.valor = this.pedidoVendido.valor - produto.valor;
    var index = this.produtosSelecionados.indexOf(produto);
    this.produtosSelecionados.splice(index, 1);    
    this.table.renderRows();
  }

  listarProdutosAtivos() {
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

  listarClientes() {
    this.clienteService.listarTodos().then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.clientes = listagem;
      } else {
        this.vprodutoService.showMessage("Nenhum cliente cadastrado!");
      }
    }).catch(erro => {
      this.vprodutoService.showMessage("Erro ao listar clientes: " + erro);
    });
  }

  salvarPedido() {
    this.pedidoVendido.dataCriacao = new Date();
    this.pedidoVendido.produtos = this.produtosSelecionados;
    this.pedidoVendido.status = "ABERTO";
    if (this.vprodutoService.validaCampos(this.pedidoVendido)) {
      this.salvar(this.pedidoVendido);
    }
  }

  finalizarVenda() {
    this.pedidoVendido.dataCriacao = new Date();
    this.pedidoVendido.produtos = this.produtosSelecionados;
    this.pedidoVendido.status = "RECEBIDO";    
    this.pedidoVendido.dataFinalizacao = new Date();
    if (this.vprodutoService.validaCampos(this.pedidoVendido)) {
      this.salvar(this.pedidoVendido);
    }
  }

  salvar(pedidoVendido: PedidoVendido) {
    this.vprodutoService.salvar(pedidoVendido).then(resposta => {  
      this.pedidoVendido = new PedidoVendido();
      this.produtoSelecionado = new Produto();
      this.produtosSelecionados = [];
      this.produtoService.showMessage("Pedido salvo com sucesso!");      
    }).catch(error => {
      this.produtoService.showMessage("Erro ao salvar Pedido: " + error);
    });
  }

  cancelar() {
    this.router.navigate(['/vproduto']);
  }

  adicionar() {
    if (this.produtoSelecionado) {
      this.pedidoVendido.valor = this.pedidoVendido.valor ? Number(this.pedidoVendido.valor) + this.produtoSelecionado.valor :  this.produtoSelecionado.valor;
      this.produtosSelecionados.push(this.produtoSelecionado);
      this.changeDetectorRefs.detectChanges();
      this.table.renderRows();
    } else {
      this.vprodutoService.showMessage("Selecione um produto!");
    } 
  }

}
