import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  isBrowser: boolean;
  LocalStorage: string | null = null;
  constructor(private router: Router) { 
    this.isBrowser = typeof window !== 'undefined';
  }

  OnInit() {
    // Se o ambiente for o navegador, tenta acessar o localStorage
    if (this.isBrowser) {
      this.LocalStorage = localStorage.getItem('setor');
      if (!this.LocalStorage) {
        this.router.navigate(['/setor'])
      }
    }
    return this.LocalStorage
  }
  onSetor() {
    
    
  }
  setSetor(setorId: string) {
    if (this.isBrowser) {
      localStorage.setItem('setor', setorId);
      this.LocalStorage = localStorage.getItem('setor'); // Atualiza o valor
    }
    this.router.navigate(['/']);
  }
}
