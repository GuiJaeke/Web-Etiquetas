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
  descrForm!: FormGroup
  consulta!: Consulta
  consultas!: Consulta[]
  consultaBoolean!: boolean
  erro: string = ''
  @ViewChild('meuInput') inputRef!: ElementRef;
  @ViewChild('meuInputDescr') descrRef!: ElementRef;

  constructor(private fb: FormBuilder, private etqService: EtiquetasService, private snackBar: MatSnackBar) {
    this.itemForm = this.fb.group({
      codigo: [],
      filtro: []
    })
    this.descrForm = this.fb.group({
      descr: []
    })
  }
  onSubmit() {
    this.etqService.consulta(this.itemForm.value.codigo, this.itemForm.value.filtro).subscribe((Item) => {
      if (Item) {
        console.log(Item)
        this.consultas = Item
        setTimeout(() => {
          this.inputRef.nativeElement.focus();
          this.inputRef.nativeElement.select();
        }, 3000);
      } else {
        let snackBarRef = this.snackBar.open(`Item não encontrado`, 'Fechar', { duration: 3000 });
        this.consultas = []
      }
    }
    )
  }
  onSubmitDescr() {
    this.etqService.consultaDescr(this.descrForm.value.descr).subscribe((Items) => {
      if (Items) {
        this.consultas = Items
        this.descrRef.nativeElement.focus();       
      } else {
        this.consultas = Items
      }
    }
    )
  }
  onKeyup() {
    if (this.itemForm.value.codigo.length >= 1) {
      this.onSubmit()
    }
  }
  onKeyupDescr() {
    if (this.descrForm.value.descr.length >= 1 || this.descrForm.value.descr.length < 1) {
      this.onSubmitDescr()
    }
  }
}
