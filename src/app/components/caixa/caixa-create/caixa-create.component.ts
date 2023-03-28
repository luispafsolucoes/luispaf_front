import { LoginService } from './../../login/login.service';
import { Caixa } from './../../../model/Caixa';
import { Router, ActivatedRoute } from '@angular/router';
import { CaixaService } from './../caixa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caixa-create',
  templateUrl: './caixa-create.component.html',
  styleUrls: ['./caixa-create.component.css']
})
export class CaixaCreateComponent implements OnInit {

  caixa: Caixa = new Caixa();
  caixas: Caixa[] = [];

  displayedColumns = ['totalProduto', 'totalPacote', 'totalCaixa', 'dataAbertura', 'status', 'action'];

  constructor(
    private caixaService: CaixaService, 
    private router: Router, 
    private route: ActivatedRoute,
    private loginService: LoginService) {}

  ngOnInit(): void { 
    this.loginService.usuarioLogado();
    this.getCaixaAbertoDoDia();    
    this.getCaixasBertoDatasAnteriores();
  }

  fecharCaixaDatasAnteriores($event) {
    let caixa: Caixa = $event;
    caixa.dataFechamento = new Date();
    caixa.status = "FECHADO";
    this.caixaService.fecharCaixaDiasAnteriores(caixa).then((caixa: Caixa)  => {
      this.getCaixasBertoDatasAnteriores();
      this.caixaService.showMessage("Caixa fecado com sucesso!");
    }).catch(erro => {
      this.caixaService.showMessage("Falha ao fechar caixas de datas anteriores: " + erro);
    });
  }

  getTotalPacoteDoDia() {
    debugger;
    this.caixaService.getTotalPacoteDoDia().then((total: number)  => {
      if (total >= 0) {
        this.caixa.totalPacote = total
      } 
    }).catch(erro => {
      this.caixaService.showMessage("Falha ao buscar total pacote do dia!");
    });
  }

  getTotalprodutoDoDia() {
    this.caixaService.getTotalprodutoDoDia().then((total: number)  => {
      if (total >= 0) {
        this.caixa.totalProduto = total
      } 
    }).catch(erro => {
      this.caixaService.showMessage("Falha ao buscar total produto do dia!");
    });
  }

  getTotalcaixaDoDia() {
    this.caixaService.getTotalcaixaDoDia().then((total: number)  => {
      if (total >= 0) {
        this.caixa.totalCaixa = total
      } 
    }).catch(erro => {
      this.caixaService.showMessage("Falha ao buscar total caixa do dia!");
    });
  }

  getCaixaAbertoDoDia() {
    this.caixaService.getCaixaAbertoDoDia().then((caixa: Caixa)  => {
      this.caixa.status = "Não existe caixa criado para a data atual" ;
      if (caixa != null) {
        this.caixa = caixa;
      }      
      this.getTotalPacoteDoDia();
      this.getTotalprodutoDoDia();
      this.getTotalcaixaDoDia();
    }).catch(erro => {
      this.caixaService.showMessage("Falha ao buscar caixa do dia!");
    });
  }

  abrirCaixa() {
    this.caixa.dataAbertura = new Date();
    this.caixa.status = "ABERTO";
    this.caixaService.salvar(this.caixa).then((caixa: Caixa) => { 
      this.caixa = caixa;
      this.caixaService.showMessage("Caixa aberto com sucesso!");      
    }).catch(error => {
      this.caixaService.showMessage("Falha ao abrir caixa: " + error);
      this.getCaixaAbertoDoDia();
    });
  }

  getCaixasBertoDatasAnteriores() {
    this.caixaService.getCaixasBertoDatasAnteriores().then((caixas: Caixa[])  => {
      if (caixas.length >= 0) {
        this.caixas = caixas;
      } 
    }).catch(erro => {
      this.caixaService.showMessage("Falha ao buscar caixas abertos dias anteriores!");
    });
  }

  getClasStatus() {
    if (this.caixa.status == "ABERTO") {
      return "blue_negrito_larger";
    } else {
      return "red";
    }    
  } 

  fecharCaixaDoDia() {
    if (this.caixa.status == "ABERTO") {
      this.caixa.dataFechamento = new Date();
      this.caixa.status = "FECHADO";
      this.caixaService.fecharCaixaDoDia(this.caixa).then((caixa: Caixa)  => {
        if (caixa != null) {
          this.caixa = caixa;
          this.caixaService.showMessage("Caixa do dia Fechado com sucesso!");
        } 
      }).catch(erro => {
        this.caixaService.showMessage("Falha ao fechar caixa do dia: " + erro);
        this.getCaixaAbertoDoDia();
      });
    } else {
      this.caixaService.showMessage("O caixa não esta aberto!");
    }    
  }

}
