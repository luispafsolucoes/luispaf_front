import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Caixa } from './../../model/Caixa';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaixaService {

  private readonly PATH: string = 'caixa/';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  salvar(caixa: Caixa) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "salvar", caixa, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  fecharCaixaDiasAnteriores(caixa: Caixa) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "fecharCaixaDiasAnteriores", caixa, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }  

  public getTotalPacoteDoDia() {
    return new Promise((retorno, erro) => {
      this.http.get(environment.baseUrl + this.PATH + "totalPacoteDoDia").subscribe(
        (total: number) => {
          retorno(total);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  public getTotalprodutoDoDia() {
    return new Promise((retorno, erro) => {
      this.http.get(environment.baseUrl + this.PATH + "totalprodutoDoDia").subscribe(
        (total: number) => {
          retorno(total);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  public getTotalcaixaDoDia() {
    return new Promise((retorno, erro) => {
      this.http.get(environment.baseUrl + this.PATH + "totalcaixa").subscribe(
        (total: number) => {
          retorno(total);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  public getCaixasBertoDatasAnteriores() {
    return new Promise((retorno, erro) => {
      this.http.get(environment.baseUrl + this.PATH + "caixasBertoDatasAnteriores").subscribe(
        (caixas: Caixa[]) => {
          retorno(caixas);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  public getCaixaAbertoDoDia() {
    return new Promise((retorno, erro) => {
      this.http.get(environment.baseUrl + this.PATH + "caixaAbertoDoDia").subscribe(
        (caixa: Caixa) => {
          retorno(caixa);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  public fecharCaixaDoDia(caixa: Caixa) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "fecharCaixaDoDia", caixa, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }  
  
  public getDataAtual() {
    return new Promise((retorno, erro) => {
      this.http.get(environment.baseUrl + this.PATH + "getDataAtual").subscribe(
        (dataAtual: string) => {
          retorno(dataAtual);
        },
        (error: any) => {
          retorno(error.error.text);
        }
      );
    });
  }
}
