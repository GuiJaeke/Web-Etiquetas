import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EtiquetasService } from '../../services/etiquetas.service';
import { SetorService } from '../../services/setor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-fragil',
  standalone: false,

  templateUrl: './fragil.component.html',
  styleUrl: './fragil.component.css'
})
export class FragilComponent {
  qtdForm!: FormGroup
  setor!: string | null
  readonly dialog = inject(MatDialog);
  openDialog(mensagem: string): Promise<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '26em',
      data: mensagem
    });

    return dialogRef.afterClosed().toPromise()
  }
  constructor(
    private fb: FormBuilder,
    private etqService: EtiquetasService,
    private setorService: SetorService,
    private snackBar: MatSnackBar
  ) {
    this.qtdForm = this.fb.group({
      qtd: [1, [Validators.min(1)]]
    })
    this.setor = this.setorService.OnInit()
  }

  async onSubmit() {
    if (this.qtdForm.value.qtd > 30) {
      const dialogResult = await this.openDialog(`Você deseja imprimir ${this.qtdForm.value.qtd} etiquetas de Frágil?`)
      if (!dialogResult) {
        return
      }
    }
    if (this.qtdForm.valid) {
      this.etqService.fragilETQ(this.qtdForm.value.qtd, this.setor).subscribe({})
    } else {
      this.snackBar.open(`Quantidade mínima: 1`, 'Fechar', { duration: 3000 });
    }
  }

}
