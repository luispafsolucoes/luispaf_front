import { Pacote } from './../../model/Pacote';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../../environments/environment';
import { Produto } from './../../model/Produto';
import { QueryBuilder } from './../_util/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProdututoService {

  private readonly PATH: string = 'produto/';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

   showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  buscar(produto: Produto) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "filtrar", produto, {}).subscribe(
        (listagem: any) => {
          retorno(listagem);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  buscarProdutoPacote(pacote: Pacote) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "buscarProdutoPacote", pacote, {}).subscribe(
        (listagem: any) => {
          retorno(listagem);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }  

  filtrarPage(queryBuilser: QueryBuilder, produto: Produto) {
    const url = this.getUrlFiltroPage(queryBuilser.pageQuery.pageNumber, 
                            queryBuilser.pageQuery.pageSize, 
                            queryBuilser.sortQuery.property);
    return new Promise((retorno, erro) => {
      this.http.post(url, produto, {}).subscribe(
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

  getUrlStatus(page: number, size: number, sortValue: string): string {
    return environment.baseUrl + `status/todos?page=${page}&size=${size}&sort=${sortValue}`
  }

  salvar(produto: Produto) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "salvar", produto, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  atualizar(produto: Produto) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "atualizar", produto, {}).subscribe(
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

  validaCampos(produto: Produto) {
    let ret = true;
    if (!produto.nome) {
      this.showMessage("Nome é obrigatório!");
      return false;
    }

    if (!produto.valor) {
      this.showMessage("Valor é obrigatório!");
      return false;
    }

    if (!produto.status) {
      this.showMessage("Status é obrigatório!");
      return false;
    }
    return true;
  }

     /*todos sem paginação usado para os select fields*/
   public listarTodos() {
    return new Promise((retorno, erro) => {
      this.http.get(environment.baseUrl + this.PATH + "listar").subscribe(
        (listagem: any) => {
          retorno(listagem);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }
}
