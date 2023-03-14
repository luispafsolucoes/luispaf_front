import { PacoteVendido } from './../../model/PacoteVendido';
import { ItemPacoteVendido } from './../../model/ItemPacoteVendido';
import { environment } from './../../../environments/environment';
import { QueryBuilder } from './../_util/pagination';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemPacoteService {

  private readonly PATH: string = 'itemPacoteVendido/';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  salvar(itemPacoteVendido: ItemPacoteVendido) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "salvar", itemPacoteVendido, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  buscar(pacoteVendido: PacoteVendido) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "filtrar", pacoteVendido, {}).subscribe(
        (listagem: any) => {
          retorno(listagem);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  filtrarPage(queryBuilser: QueryBuilder, itemPacoteVendido: ItemPacoteVendido) {
    const url = this.getUrlFiltroPage(queryBuilser.pageQuery.pageNumber, 
                            queryBuilser.pageQuery.pageSize, 
                            queryBuilser.sortQuery.property);
    return new Promise((retorno, erro) => {
      this.http.post(url, itemPacoteVendido, {}).subscribe(
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

}
