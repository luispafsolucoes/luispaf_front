import { RelatorioPorPeriodoDTO } from './../../model/RelatorioPorPeriodoDTO';
import { FiltroDTO } from './../../model/FiltroDTO';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private readonly PATH: string = 'caixa/';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }


  relatorioPorPeriodo(filtroDTO: FiltroDTO) {
    debugger;
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "relatorioPorPeriodo", filtroDTO, {}).subscribe(
       (ret: RelatorioPorPeriodoDTO)=> {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }  
}
