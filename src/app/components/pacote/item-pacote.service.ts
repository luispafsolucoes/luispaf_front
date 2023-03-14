import { environment } from './../../../environments/environment';
import { Pacote } from './../../model/Pacote';
import { QueryBuilder } from './../_util/pagination';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemPacoteService {

  private readonly PATH: string = 'itemPacote/';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }


  filtrarPage(queryBuilser: QueryBuilder, pacote: Pacote) {
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
}
