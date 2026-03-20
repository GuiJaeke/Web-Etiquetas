import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EtiquetasService } from '../../services/etiquetas.service';
import { SetorService } from '../../services/setor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-excesso',
  standalone: false,

  templateUrl: './excesso.component.html',
  styleUrl: './excesso.component.css'
})
export class ExcessoComponent {
  excessoForm!: FormGroup
  locacao!: any
  printed!: any
  setor!: string | null
  date = new Date()
  constructor(private fb: FormBuilder, private etqService: EtiquetasService, private setorService: SetorService, private snackBar: MatSnackBar) {
    this.excessoForm = this.fb.group({
      word: [],
      select: []
    })
    this.catchLocs('')
    this.setor = this.setorService.OnInit()
  }
  onKeyUp() {
    this.catchLocs(this.excessoForm.value.word)
  }
  catchLocs(word: string) {
    this.etqService.findLocs(word).subscribe({
      next: (locs) => {
        this.locacao = locs
      }
    })
  }
  onSubmit() {
    if (!this.excessoForm.value.select) {

      this.etqService.volumeETQ(this.excessoForm.value.word, this.setor).subscribe(
        (okay) => {
          if (!okay) {
            this.snackBar.open(`Locação não encontrada`, 'Fechar', { duration: 3000 });
          }
        }
      )
      document.getElementById('loc')?.focus()
      this.excessoForm.get('word')?.reset()
    } else {
      this.etqService.volumeETQ(this.excessoForm.value.select, this.setor).subscribe(
        (okay) => {
          if (!okay) {
            this.snackBar.open(`Locação não encontrada`, 'Fechar', { duration: 3000 });
          }
        }
      )
    }
  }
}
