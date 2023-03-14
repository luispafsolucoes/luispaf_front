import { LoginService } from './../../login/login.service';
import { FiltroDTO } from './../../../model/FiltroDTO';
import { RelatorioService } from './../relatorio.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/Cliente';
import { RelatorioPorPeriodoDTO } from './../../../model/RelatorioPorPeriodoDTO';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../localStorage/local-storage.service';
import { ClienteService } from '../../cliente/cliente.service';

@Component({
  selector: 'app-relatorio-read',
  templateUrl: './relatorio-read.component.html',
  styleUrls: ['./relatorio-read.component.css']
})
export class RelatorioReadComponent implements OnInit {

  public relatorioPorPeriodoDTO: RelatorioPorPeriodoDTO = new RelatorioPorPeriodoDTO();
  public clientes: Cliente[] = [];
  public clienteSelecionado: Cliente = new Cliente();
  public filtroDTO: FiltroDTO =  new FiltroDTO();
  listRel: RelatorioPorPeriodoDTO[] = [];

  displayedColumns = ['qtdeProduto','totalproduto','qtdePacote','totalpacote','totalcaixa'];

  constructor(
    private relatorioService: RelatorioService,
    private router: Router,
    private localStorage: LocalStorageService,
    private clienteService: ClienteService,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
    this.buscarClientesSearch();   
  }  
  
  limparFiltro() {
    this.filtroDTO =  new FiltroDTO();
    this.listRel = [];
  }

  desabilitaLimparFiltra() {
    if (!this.filtroDTO.codigoCliente && !this.filtroDTO.dataFim && !this.filtroDTO.dataInicio && this.listRel.length == 0) {
        return false;
    }
    return true;
  }

  buscarClientesSearch() {
    this.clienteService.listarTodos().then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.clientes = listagem;
      } else {
        this.clientes = [];
      }
    }).catch(erro => {
      this.relatorioService.showMessage("Falfa ao listar clientes: " + erro);
    });
  }

  limparDataInicio() {
    this.filtroDTO.dataInicio = null;
  }

  limparDataFim() {
    this.filtroDTO.dataFim = null;
  }

  buscar() {
    if (this.validaCampos(this.filtroDTO)) {
      this.relatorioService.relatorioPorPeriodo(this.filtroDTO).then((listagem: RelatorioPorPeriodoDTO[])  => {
        if (listagem && listagem.length > 0) {
          this.listRel = listagem;
        } else {
          this.listRel = [];
        }
      }).catch(erro => {
        this.relatorioService.showMessage("Falfa ao gerar relatorio: " + erro);
      });
    }
  }

  validaCampos(filtro: FiltroDTO) {
    let ret = true;
    if (!filtro.dataInicio) {
      this.relatorioService.showMessage("Data Inicio é obrigatório!");
      return false;
    }

    if (!filtro.dataFim) {
      this.relatorioService.showMessage("Data Fim é obrigatório!");
      return false;
    }

    return true;
  }

}
