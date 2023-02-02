import { LoginService } from './../../login/login.service';
import { Router } from '@angular/router';
import { ProdututoService } from './../prodututo.service';
import { Status } from './../../../model/Status';
import { Produto } from './../../../model/Produto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produto: Produto = new Produto();

  constructor(
    private produtoService: ProdututoService,
    private router: Router,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
  }  

  salvar() {
    debugger;
    this.produto.dataCadastro = new Date();
    this.produto.status = "ATIVO"
    
    if (this.produtoService.validaCampos(this.produto)) {      
      this.produtoService.salvar(this.produto).then(resposta => {  
        this.produto = new Produto(); 
        this.produtoService.showMessage("Registro salvo com sucesso!");      
      }).catch(error => {
        this.produtoService.showMessage("Erro ao salvar registro: " + error);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/produto']);
  }

  uperCaseAndTrim_nome(value: string) {
    this.produto.nome = value.trim().toUpperCase();
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
}
