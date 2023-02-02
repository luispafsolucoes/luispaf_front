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

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
  } 
}
