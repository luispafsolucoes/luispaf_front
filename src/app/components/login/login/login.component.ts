import { Usuario } from './../../../model/Usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../localStorage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  idLogado: number;

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute) {}


  ngOnInit(): void {} 

  logar() {
    debugger;
    this.loginService.logar(this.usuario).then((usuario: Usuario)  => {
       this.localStorage.set('idUsuarioLogado', usuario.codigo);
       this.router.navigate(['/telaPrincipal']);
    }).catch(erro => {
      this.localStorage.clear();
      this.loginService.showMessage(erro);
    });
  }  

  agendar() {
    this.loginService.validausuarioparaagendar(this.usuario).then((usuario: Usuario)  => {
      this.localStorage.set('idUsuarioAgenda', usuario.codigo);
      this.router.navigate(['agendamento']);
    }).catch(erro => {
      this.loginService.showMessage(erro);
    });    
  }
}
