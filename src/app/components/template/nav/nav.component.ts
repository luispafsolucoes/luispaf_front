import { LoginService } from './../../login/login.service';
import { LocalStorageService } from 'src/app/components/localStorage/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private localStorage: LocalStorageService,
    private loginService: LoginService
    ) {}

    ngOnInit(): void {
      this.loginService.usuarioLogado(); 
    } 

  usuarioLogado() {
    if (localStorage.getItem("idUsuarioLogado") != null) {
      return true;
    } else {
      return false;
    } 
  }

}
