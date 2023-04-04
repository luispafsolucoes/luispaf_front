import { Usuario } from './../../../model/Usuario';
import { LoginService } from './../../login/login.service';
import { LocalStorageService } from './../../localStorage/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(
    private localStorage: LocalStorageService,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {     
    this.usuarioLogado();
    } 

  usuarioLogado() {
    if (localStorage.getItem("idUsuarioLogado") != null) {      
      return true;
    } else {
      return false;
    } 
  } 
}
