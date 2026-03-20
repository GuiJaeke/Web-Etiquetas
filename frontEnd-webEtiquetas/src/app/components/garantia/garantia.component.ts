import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EtiquetasService } from '../../services/etiquetas.service';
import { SetorService } from '../../services/setor.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-garantia',
  standalone: false,

  templateUrl: './garantia.component.html',
  styleUrl: './garantia.component.css'
})
export class GarantiaComponent {
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
    private setorService: SetorService
  ) {
    this.qtdForm = this.fb.group({
      qtd: [1]
    })
    this.setor = this.setorService.OnInit()
  }
  async onSubmit() {
    if (this.qtdForm.value.qtd > 30) {
      const dialogResult = await this.openDialog(`Você deseja imprimir ${this.qtdForm.value.qtd} etiquetas de selo de garantia?`)
      if (!dialogResult) {
        return
      }
    }
    this.etqService.garantiaETQ(this.qtdForm.value.qtd, this.setor).subscribe({})
  }
}
