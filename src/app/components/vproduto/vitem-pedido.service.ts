import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../../environments/environment';
import { ItemPedidoVendido } from './../../model/ItemPedidoVendido';
import { PedidoVendido } from './../../model/PedidoVendido';
import { QueryBuilder } from './../_util/pagination';

@Injectable({
  providedIn: 'root'
})
export class VitemPedidoService {

  private readonly PATH: string = 'itemPedidoVendido/';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  } 

  salvar(itemPedidoVendido: ItemPedidoVendido) {
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "salvar", itemPedidoVendido, {}).subscribe(
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
  
  getItensPedidoVenda(queryBuilser: QueryBuilder, entity: PedidoVendido) {
    const url = this.getUrlFiltroPage(queryBuilser.pageQuery.pageNumber, 
                            queryBuilser.pageQuery.pageSize, 
                            queryBuilser.sortQuery.property);
    return new Promise((retorno, erro) => {
      this.http.post(url, entity, {}).subscribe(
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
    return environment.baseUrl + this.PATH + `itensPedidoVenda?page=${page}&size=${size}&sort=${sortValue}`
  }
}
