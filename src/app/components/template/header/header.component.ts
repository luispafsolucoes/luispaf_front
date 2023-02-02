import { LoginService } from './../../login/login.service';
import { LocalStorageService } from './../../localStorage/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public head: string = "Bem vindo";

  constructor(
    private localStorage: LocalStorageService,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {  
  } 

  usuarioLogado() {
    if (localStorage.getItem("idUsuarioLogado") != null) {
      return true;
    } else {
      return false;
    } 
  } 
}
