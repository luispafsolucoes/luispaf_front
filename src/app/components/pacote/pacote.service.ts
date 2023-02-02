import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../../environments/environment';
import { Pacote } from './../../model/Pacote';
import { QueryBuilder } from './../_util/pagination';

@Injectable({
  providedIn: 'root'
})
export class PacoteService {

  private readonly PATH: string = 'pacote/';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  buscar(pacote: Pacote) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "filtrar", pacote, {}).subscribe(
        (listagem: any) => {
          retorno(listagem);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

    filtrarPage(queryBuilser: QueryBuilder, pacote: Pacote) {
    debugger;
    const url = this.getUrlFiltroPage(queryBuilser.pageQuery.pageNumber, 
                            queryBuilser.pageQuery.pageSize, 
                            queryBuilser.sortQuery.property);
    return new Promise((retorno, erro) => {
      this.http.post(url, pacote, {}).subscribe(
        (listagem: any) => {
          retorno(listagem);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  getUrlFiltroPage(page: number, size: number, sortValue: string): string {
    return environment.baseUrl + this.PATH + `filtrarPage?page=${page}&size=${size}&sort=${sortValue}`
  }

  
  listar(queryBuilser: QueryBuilder) {
    const url = this.getUrl(queryBuilser.pageQuery.pageNumber, 
                            queryBuilser.pageQuery.pageSize, 
                            queryBuilser.sortQuery.property);

    return new Promise((retorno, erro) => {
      this.http.get(url).subscribe(
        (listagem: any) => {
          retorno(listagem);
        },
        (error: any) => {
          erro(error.error)
        });
    })   
  }

   getUrl(page: number, size: number, sortValue: string): string {
    return environment.baseUrl + this.PATH + `todos?page=${page}&size=${size}&sort=${sortValue}`
  }

  salvar(pacote: Pacote) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "salvar", pacote, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  inativarPacote(pacote: Pacote) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "inativar", pacote, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  
  public deletar(id: number) {
    return new Promise((retorno, erro) => {
      this.http.delete( environment.baseUrl + this.PATH + id).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  public listarPacotesAtivosOrdenadoPornome() {
    debugger;
    return new Promise((retorno, erro) => {
      this.http.get(environment.baseUrl + this.PATH + "listarPacotesAtivosOrdenadoPornome").subscribe(
        (listagem: any) => {
          retorno(listagem);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  validaCampos(pacote: Pacote) {
    let ret = true;
    if (!pacote.nome) {
      this.showMessage("Nome é obrigatório!");
      return false;
    }

    if (!pacote.valor) {
      this.showMessage("Valor é obrigatório!");
      return false;
    }

    if (!pacote.status) {
      this.showMessage("Status é obrigatório!");
      return false;
    }

    if (pacote.produtos.length == 0) {
      this.showMessage("Insira um produto no pacote!");
      return false;
    }
    return true;
  }
}
