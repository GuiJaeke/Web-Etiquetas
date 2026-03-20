import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtiquetasService } from '../../services/etiquetas.service';
import { item } from '../../item';
import { SetorService } from '../../services/setor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-locacao',
  standalone: false,
  
  templateUrl: './locacao.component.html',
  styleUrl: './locacao.component.css'
})
export class LocacaoComponent {
  itemForm!: FormGroup
  item!: item
  erro: string = ''
  setor!: string | null

  constructor(private fb: FormBuilder, private etqService: EtiquetasService, private setorService: SetorService, private snackBar: MatSnackBar) {
    this.itemForm = this.fb.group({
      codigo: [],
      filial: [60]
    })
    this.setor = this.setorService.OnInit()
  }
  onSubmit() {
    this.etqService.preencher(this.itemForm.value.codigo, this.itemForm.value.filial).subscribe((Item) => {
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
    console.log(this.setor)
    this.etqService.locacaoETQ(this.itemForm.value.codigo, this.itemForm.value.filial, this.setor).subscribe((Item) => {
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
