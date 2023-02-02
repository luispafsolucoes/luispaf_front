import { LoginService } from './../../login/login.service';
import { LocalStorageService } from 'src/app/components/localStorage/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

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
