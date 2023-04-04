import { CaixaService } from './../../components/caixa/caixa.service';
import { Usuario } from './../../model/Usuario';
import { LoginComponent } from './../../components/login/login/login.component';
import { LoginService } from './../../components/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/components/localStorage/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {

  dataAtual: Date = new Date();
  dataAtualBack: string;
  usuario: Usuario =  new Usuario();

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private caixaService: CaixaService) {}

  ngOnInit(): void {
    debugger;
    this.loginService.usuarioLogado();
    this.getDataAtual();
    this.getUsuario();
  } 

  getDataAtual() {
    this.caixaService.getDataAtual().then((dataAtual: string)  => {
      this.dataAtualBack = dataAtual
    }).catch(erro => {
      this.caixaService.showMessage("Falha ao buscar total pacote do dia!");
    });
  }

  getUsuario() {
    debugger;
    let usuarioFind: Usuario = new Usuario();
    usuarioFind.codigo = Number(localStorage.getItem("idUsuarioLogado"));
    this.loginService.getUsuario(usuarioFind).then((usuario: Usuario)  => {
      this.usuario = usuario;
    }).catch(erro => {
      this.localStorage.clear();
      this.loginService.showMessage(erro);
    }); 
  }
}
