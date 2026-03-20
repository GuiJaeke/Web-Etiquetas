import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Volume } from '../volume';
import { item } from '../item';
import { Consulta } from '../consulta';
import { MatSnackBar } from '@angular/material/snack-bar';
import { env } from 'process';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EtiquetasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  //Functions do volume
  findPed(numped: string) {
    return this.http.get<Volume>(`${this.apiUrl}/volume/${numped}`)
  }
  ETQ(qtdInicial: number, qtdFinal: number | null,  qtdVolume: number | null, numped: string, unicaETQ: string, interval: string, setor: string | null) {
    this.snackBar.open(`Etiqueta impressa com sucesso!`, 'Fechar', { duration:3000});
    return this.http.get(`${this.apiUrl}/volume/print/${qtdInicial}/${qtdFinal}/${qtdVolume}/${numped}/${unicaETQ}/${interval}/${setor}`)
  }
  pneuETQ(qtdInicial: number, qtdFinal: number | null,  qtdVolume: number | null , numped: string, unicaETQ: string, interval: string, setor: string | null) {
    this.snackBar.open(`Etiqueta impressa com sucesso!`, 'Fechar', { duration:3000});
    return this.http.get(`${this.apiUrl}/volume/pneu/print/${qtdInicial}/${qtdFinal}/${qtdVolume}/${numped}/${unicaETQ}/${interval}/${setor}`)
  }
  // fim volume

  //etiqueta Fragil
  fragilETQ(qtd: number, setor: string | null) {
    this.snackBar.open(`Etiqueta impressa com sucesso!`, 'Fechar', { duration:3000});
    return this.http.get(`${this.apiUrl}/unique/fragil/${qtd}/${setor}`)
  }
  //fim
  
  //etiqueta segurança
  segurancaETQ(qtd: number, setor: string | null) {
    this.snackBar.open(`Etiqueta impressa com sucesso!`, 'Fechar', { duration:3000});
    return this.http.get(`${this.apiUrl}/unique/seguranca/${qtd}/${setor}`)
  }
  //fim

  //etiqueta lado para cima
  ladoETQ(qtd: number, setor: string | null) {
    this.snackBar.open(`Etiqueta impressa com sucesso!`, 'Fechar', { duration:3000});
    return this.http.get(`${this.apiUrl}/unique/lado/${qtd}/${setor}`)
  }
  //fim

  //etiqueta correio
  correioETQ(qtd: number, setor: string | null) {
    this.snackBar.open(`Etiqueta impressa com sucesso!`, 'Fechar', { duration:3000});
    return this.http.get(`${this.apiUrl}/unique/correio/${qtd}/${setor}`)
  }
  //fim

  //etiqueta excesso
  findLocs(word: string) {
    return this.http.get(`${this.apiUrl}/loc/${word}`)
  }

  volumeETQ(loc: string, setor: string | null) {
    this.snackBar.open(`Etiqueta impressa com sucesso!`, 'Fechar', { duration:3000});
    return this.http.get(`${this.apiUrl}/loc/print/${loc}/${setor}`)
  }
  //fim

  //Etiqueta locação
  preencher(codigo: string, filial: number) {
    return this.http.get<item>(`${this.apiUrl}/locacao/${codigo}/${filial}`)
  }
  locacaoETQ(codigo: string, filial: number, setor: string | null) {
    this.snackBar.open(`Etiqueta impressa com sucesso!`, 'Fechar', { duration:3000});
    return this.http.get<item>(`${this.apiUrl}/locacao/print/${codigo}/${filial}/${setor}`)
  }
  locacaoOrleonETQ(codigo: string, locacao: number, setor: string | null) {
    this.snackBar.open(`Etiqueta impressa com sucesso!`, 'Fechar', { duration:3000});
    return this.http.get<item>(`${this.apiUrl}/locacao/printOrleon/${codigo}/${locacao}/${setor}`)
  }
  // fim

  //Consulta
  consulta(codigo: string, filtro: boolean) {
    return this.http.get<Consulta[]>(`${this.apiUrl}/unique/consulta/${codigo}/${filtro}`)
  }
  //fim

  //etiqueta segurança
  garantiaETQ(qtd: number, setor: string | null) {
    this.snackBar.open(`Etiqueta impressa com sucesso!`, 'Fechar', { duration:3000});
    return this.http.get(`${this.apiUrl}/unique/garantia/${qtd}/${setor}`)
  }
  //fim

  //Código de barras
  codbarrasETQ(codigo: string, qtd: number, setor: string | null) {
    this.snackBar.open(`Etiqueta impressa com sucesso!`, 'Fechar', { duration:3000});
    return this.http.get(`${this.apiUrl}/unique/codbarras/${codigo}/${qtd}/${setor}`)
  }
  maxxbrETQ(codigo: string, qtd: number, setor: string | null) {
    this.snackBar.open(`Etiqueta impressa com sucesso!`, 'Fechar', { duration:3000});
    return this.http.get(`${this.apiUrl}/unique/maxxbr/${codigo}/${qtd}/${setor}`)
  }
  //fim

  // Volume/Conferente
  findConferentes() {
    return this.http.get(`${this.apiUrl}/unique/conf`)
  }
  printConferentes(pedido: string, pag: number, conferente: string, qtd: number, setor: string | null) {
    this.snackBar.open(`Etiqueta impressa com sucesso!`, 'Fechar', { duration:3000});
    return this.http.get(`${this.apiUrl}/unique/conf/${pedido}/${pag}/${conferente}/${qtd}/${setor}`)
  }
  // fim
  
}
