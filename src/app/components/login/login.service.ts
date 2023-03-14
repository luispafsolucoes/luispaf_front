import { LocalStorageService } from 'src/app/components/localStorage/local-storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Usuario } from './../../model/Usuario';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly PATH: string = 'usuario/';

  constructor(
    private snackBar: MatSnackBar, 
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService
    ) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  logar(usuario: Usuario) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "logar", usuario, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  deslogar(usuario: Usuario) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "deslogar", usuario, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  validarLogin(usuario: Usuario) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "validarLogin", usuario, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  getUsuario(usuario: Usuario) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "getUsuario", usuario, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  /**
   * Se o usuario não tiver logado ele é jogado na tela de login
  */
  public usuarioLogado() {
    if (localStorage.getItem("idUsuarioLogado") != null) {
      let usuario: Usuario = new Usuario();
      usuario.codigo = Number(localStorage.getItem("idUsuarioLogado"));
      this.validarLogin(usuario).then((usuario: Usuario)  => {
        if (usuario.codigo == null || usuario.codigo == 0) {
          this.localStorage.remove("idUsuarioLogado");
          this.router.navigate(['/login']);
        } 
    }).catch(erro => {
      this.showMessage(erro);
    });
    } else {
      this.localStorage.remove("idUsuarioLogado");
      this.router.navigate(['/login']);
    } 
  }

  validausuarioparaagendar(usuario: Usuario) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "validausuarioparaagendar", usuario, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }
}
