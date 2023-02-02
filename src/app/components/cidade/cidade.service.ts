import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cidade } from '../../model/Cidade';
import { QueryBuilder } from '../_util/pagination';
import { environment } from './../../../environments/environment';
import { PaginationType } from './../_util/PaginationType';

type PageReturn = {
  results: Cidade[];
  pagination: PaginationType;
};
@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private readonly PATH: string = 'cidade/';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  buscar(cidade: Cidade) {
    debugger;
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "filtrar", cidade, {}).subscribe(
        (listagem: any) => {
          debugger;
          retorno(listagem);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  filtrarPage(queryBuilser: QueryBuilder, cidade: Cidade) {
    debugger;
    const url = this.getUrlFiltroPage(queryBuilser.pageQuery.pageNumber, 
                            queryBuilser.pageQuery.pageSize, 
                            queryBuilser.sortQuery.property);
    return new Promise((retorno, erro) => {
      this.http.post(url, cidade, {}).subscribe(
        (listagem: any) => {
          debugger;
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
    debugger;
    const url = this.getUrl(queryBuilser.pageQuery.pageNumber, 
                            queryBuilser.pageQuery.pageSize, 
                            queryBuilser.sortQuery.property);

    return new Promise((retorno, erro) => {
      this.http.get(url).subscribe(
        (listagem: any) => {
          debugger;
          retorno(listagem);
        },
        (error: any) => {
          erro(error.error)
        });
    })   
  }

  salvar(cidade: Cidade) {
    debugger;
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "salvar", cidade, {}).subscribe(
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
    debugger;
    return new Promise((retorno, erro) => {
      this.http.delete( environment.baseUrl + `cidade/${id}`).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  getUrl(page: number, size: number, sortValue: string): string {
    return environment.baseUrl + this.PATH + `todos?page=${page}&size=${size}&sort=${sortValue}`
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

validaCampos(cidade: Cidade) {
    let ret = true;
    if (!cidade.nome) {
      this.showMessage("Nome é obrigatório!");
      return false;
    }

    if (!cidade.uf) {
      this.showMessage("UF é obrigatório!");
      return false;
    }
    return true;
  }
}
