import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EtiquetasService } from '../../services/etiquetas.service';
import { item } from '../../item';
import { Consulta } from '../../consulta';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consulta',
  standalone: false,

  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent {
  itemForm!: FormGroup
  consulta!: Consulta
  consultas!: Consulta[]
  consultaBoolean!: boolean
  erro: string = ''
  @ViewChild('meuInput') inputRef!: ElementRef;

  constructor(private fb: FormBuilder, private etqService: EtiquetasService, private snackBar: MatSnackBar) {
    this.itemForm = this.fb.group({
      codigo: [],
      filtro: []
    })
  }
  onSubmit() {
    this.etqService.consulta(this.itemForm.value.codigo, this.itemForm.value.filtro).subscribe((Item) => {
      if (Item) {
        console.log(Item)
        this.consultas = Item
        this.inputRef.nativeElement.focus();
        this.inputRef.nativeElement.select();
      } else {
        let snackBarRef = this.snackBar.open(`Item não encontrado`, 'Fechar', { duration: 3000 });
        this.consultas = []
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
