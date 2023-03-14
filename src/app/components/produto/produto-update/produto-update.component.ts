import { LoginService } from './../../login/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from './../../../model/Produto';
import { Status } from './../../../model/Status';
import { ProdututoService } from './../prodututo.service';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {

  produto: Produto =  new Produto();
  idParaAlterar: number;

  constructor(
    private produtoService: ProdututoService, 
    private router: Router, 
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado(); 
    this.idParaAlterar = Number( this.route.snapshot.paramMap.get('id'));
    this.getById(this.idParaAlterar);
  }

  getById(id: number) {
    let produtoSearch: Produto =  new Produto();
    produtoSearch.codigo = id;
    this.produtoService.buscar(produtoSearch).then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.produto = listagem[0];
      }
    }).catch(erro => {
      console.log("Erro ao buscar por ID");
    });
  }

  atualizar() {
    if (this.produtoService.validaCampos(this.produto)) {
      this.setarStatusDataInativacao(this.produto);
      this.produtoService.atualizar(this.produto).then(resposta => {  
        this.router.navigate(['/produto']);
      this.produtoService.showMessage("Registro alterado com sucesso!");      
      }).catch(error => {
        this.produtoService.showMessage("Erro ao alterar registro: " + error);
      });
    }
  }

  setarStatusDataInativacao(produto: Produto) {
    produto.dataInativacao = new Date();
    produto.status = "INATIVO";
  }

  cancelar() {
    this.router.navigate(['/produto']);
  }

}
