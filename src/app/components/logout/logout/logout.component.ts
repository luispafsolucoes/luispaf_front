import { Usuario } from './../../../model/Usuario';
import { LoginService } from './../../login/login.service';
import { LocalStorageService } from 'src/app/components/localStorage/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    debugger;
    this.getUsuarioLogado();    
  } 

  getUsuarioLogado() {
    let usuario: Usuario = new Usuario();
    usuario.codigo = Number(localStorage.getItem("idUsuarioLogado"));
    this.loginService.getUsuario(usuario).then((usuario: Usuario)  => {
      this.deslogar(usuario);
    }).catch(erro => {
      this.loginService.showMessage(erro);
    });
  }

  deslogar(usuario: Usuario) {
    this.loginService.deslogar(usuario).then((usuario: Usuario)  => {
      this.localStorage.clear();
      this.router.navigate(['/header']);
      this.router.navigate(['/login']);
    }).catch(erro => {
      this.loginService.showMessage(erro);
    }); 
  }
}
