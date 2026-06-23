import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { item } from '../../item';
import { EtiquetasService } from '../../services/etiquetas.service';
import { SetorService } from '../../services/setor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-locacao-orleon',
  standalone: false,
  
  templateUrl: './locacao-orleon.component.html',
  styleUrl: './locacao-orleon.component.css'
})
export class LocacaoOrleonComponent {
  itemForm!: FormGroup
    item!: item
    erro: string = ''
    setor!: string | null
    constructor(private fb: FormBuilder, private etqService: EtiquetasService, private setorService: SetorService, private snackBar: MatSnackBar) {
        this.itemForm = this.fb.group({
          codigo: [],
          locacao: []
        })
        this.setor = this.setorService.OnInit()
      }
      onSubmit() {
        this.etqService.preencher(this.itemForm.value.codigo).subscribe((Item) => {
          if (Item) {
            this.item = Item
          } else {
            this.snackBar.open(`Item não encontrado`, 'Fechar', { duration:3000});
            this.item = Item  
          }
        })
        document.getElementById('print-button')?.focus()
      }
    print() {
      this.etqService.locacaoOrleonETQ(this.itemForm.value.codigo, this.itemForm.value.locacao, this.setor).subscribe((Item) => {
        if (Item) {
          this.itemForm.get('codigo')?.reset();
          document.getElementById('codigo')?.focus()
        } else {
          this.snackBar.open(`Item não encontrado`, 'Fechar', { duration:3000});
          this.item = Item  
        }
      }
      )
    }
    onKeyup() {
      if (this.itemForm.value.codigo.length == 6) {
        this.onSubmit()
      }
    }
}
