import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../../environments/environment';
import { PedidoVendido } from './../../model/PedidoVendido';
import { QueryBuilder } from './../_util/pagination';

@Injectable({
  providedIn: 'root'
})
export class VprodutoService {

  private readonly PATH: string = 'pedidoVendido/';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  } 

  salvar(pedidoVendido: PedidoVendido) {
    debugger;
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "salvar", pedidoVendido, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  filtrarPage(queryBuilser: QueryBuilder, entity: PedidoVendido) {
    const url = this.getUrlFiltroPage(queryBuilser.pageQuery.pageNumber, 
                            queryBuilser.pageQuery.pageSize, 
                            queryBuilser.sortQuery.property);
    return new Promise((retorno, erro) => {
      this.http.post(url, entity, {}).subscribe(
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

  listarPedidosDodia(queryBuilser: QueryBuilder, entity: PedidoVendido) {
    debugger;
    const url = this.getUrlListarPedidosDodia(queryBuilser.pageQuery.pageNumber, 
                            queryBuilser.pageQuery.pageSize, 
                            queryBuilser.sortQuery.property);
    return new Promise((retorno, erro) => {
      this.http.post(url, entity, {}).subscribe(
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

  getUrlListarPedidosDodia(page: number, size: number, sortValue: string): string {
    return environment.baseUrl + this.PATH + `listarPedidosDodia?page=${page}&size=${size}&sort=${sortValue}`
  }

  validaCampos(pedidoVendido: PedidoVendido) {
    let ret = true;
    if (!pedidoVendido.codigoCliente) {
      this.showMessage("Cliente é obrigatório!");
      return false;
    }

    if (!pedidoVendido.produtos || pedidoVendido.produtos.length == 0) {
      this.showMessage("Produto é obrigatório!");
      return false;
    }

    if (!pedidoVendido.valor) {
      this.showMessage("Valor é obrigatório!");
      return false;
    }
    return true;
  }

}
