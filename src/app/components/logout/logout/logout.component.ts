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
    loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.localStorage.clear();
    this.router.navigate(['/login']);
  } 
}
