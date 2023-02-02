import { MatDatepickerModule } from '@angular/material/datepicker';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorIntlPtBr } from './components/_util/paginator-ptbr-i8n';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RedDirective } from './diretives/red.directive';
import { HomeComponent } from './views/home/home.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'; //usado para formatar virgulas no dinheiro
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CidadeCreateComponent } from './components/cidade/cidade-create/cidade-create.component';
import { CidadeDeleteComponent } from './components/cidade/cidade-delete/cidade-delete.component';
import { CidadeReadComponent } from './components/cidade/cidade-read/cidade-read.component';
import { CidadeUpdateComponent } from './components/cidade/cidade-update/cidade-update.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteReadComponent } from './components/cliente/cliente-read/cliente-read.component';
import { ClienteUpdadeComponent } from './components/cliente/cliente-updade/cliente-updade.component';
import { LoginComponent } from './components/login/login/login.component';
import { PacoteCreateComponent } from './components/pacote/pacote-create/pacote-create.component';
import { PacoteReadComponent } from './components/pacote/pacote-read/pacote-read.component';
import { PacoteUpdateComponent } from './components/pacote/pacote-update/pacote-update.component';
import { ProdutoCreateComponent } from './components/produto/produto-create/produto-create.component';
import { ProdutoReadComponent } from './components/produto/produto-read/produto-read.component';
import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';
import { VprodutoCreateComponent } from './components/vproduto/vproduto-create/vproduto-create.component';
import { VprodutoReadComponent } from './components/vproduto/vproduto-read/vproduto-read.component';
import { VprodutoUpdateComponent } from './components/vproduto/vproduto-update/vproduto-update.component';
import { VpacoteComponent } from './components/vpacote/vpacote-read/vpacote.component';
import { VpacoteCreateComponent } from './components/vpacote/vpacote-create/vpacote-create.component';
import { MatNativeDateModule } from '@angular/material/core';
import { VpacoteItensComponent } from './components/vpacote/vpacote-itens/vpacote-itens.component';
import { CaixaCreateComponent } from './components/caixa/caixa-create/caixa-create.component';
import { RelatorioReadComponent } from './components/relatorio/relatorio-read/relatorio-read.component';
import { LogoutComponent } from './components/logout/logout/logout.component';
import { AgendamentoComponent } from './components/agendamentos/agendamento/agendamento.component';
import { AgendamentoReadComponent } from './components/agendamentos/agendamento-read/agendamento-read.component';

registerLocaleData(localePt);                       //usado para formatar virgulas no dinheiro



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    RedDirective,
    CidadeCreateComponent,
    CidadeReadComponent,
    CidadeDeleteComponent,
    CidadeUpdateComponent,
    ClienteCreateComponent,
    ClienteReadComponent,
    ClienteDeleteComponent,
    ClienteUpdadeComponent,
    LoginComponent,
    ProdutoReadComponent,
    ProdutoCreateComponent,
    ProdutoUpdateComponent,
    PacoteReadComponent,
    PacoteUpdateComponent,
    PacoteCreateComponent,
    VprodutoCreateComponent,
    VprodutoReadComponent,
    VprodutoUpdateComponent,
    VpacoteComponent,
    VpacoteCreateComponent,
    VpacoteItensComponent,
    CaixaCreateComponent,
    RelatorioReadComponent,
    LogoutComponent,
    AgendamentoComponent,
    AgendamentoReadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  providers: [MatDatepickerModule,{
    provide: LOCALE_ID, //usado para formatar virgulas no dinheiro
    useValue: 'pt-BR'   //usado para formatar virgulas no dinheiro   
    },
    { provide: MatPaginatorIntl,     // Usado para traduzir a paginação usando a class util.paginator-ptbr-i8n.ts
      useClass: MatPaginatorIntlPtBr // Usado para traduzir a paginação usando a class util.paginator-ptbr-i8n.ts
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
