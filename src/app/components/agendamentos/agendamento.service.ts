import { environment } from 'src/environments/environment';
import { Agenda } from '../../model/Agenda';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { QueryBuilder } from '../_util/pagination';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private readonly PATH: string = 'agenda/';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  salvar(agenda: Agenda) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "salvar", agenda, {}).subscribe(
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

  filtrarPage(queryBuilser: QueryBuilder, agenda: Agenda) {
    const url = this.getUrlFiltroPage(queryBuilser.pageQuery.pageNumber, 
                                      queryBuilser.pageQuery.pageSize, 
                                      queryBuilser.sortQuery.property);
    return new Promise((retorno, erro) => {
      this.http.post(url, agenda, {}).subscribe(
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
    return environment.baseUrl + this.PATH + `filtrarPorData?page=${page}&size=${size}&sort=${sortValue}`
  }
}
