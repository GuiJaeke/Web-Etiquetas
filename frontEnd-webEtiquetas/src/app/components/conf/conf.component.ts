import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EtiquetasService } from '../../services/etiquetas.service';
import { SetorService } from '../../services/setor.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-conf',
  standalone: false,

  templateUrl: './conf.component.html',
  styleUrl: './conf.component.css'
})
export class ConfComponent {
  volumeForm!: FormGroup
  conferentes: any = []
  setor: string | null
  readonly dialog = inject(MatDialog);
  openDialog(mensagem: string): Promise<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '26em',
      data: mensagem
    });

    return dialogRef.afterClosed().toPromise()
  }
  constructor(private fb: FormBuilder, private etqService: EtiquetasService, private setorService: SetorService) {
    this.volumeForm = this.fb.group({
      pedido: [],
      pagina: [],
      conferente: [],
      qtd: []
    })
    this.catchConferentes()
    this.setor = this.setorService.OnInit()
  }
  catchConferentes() {
    this.etqService.findConferentes().subscribe((conferentes) => (this.conferentes = conferentes))
  }
  async onSubmit() {
    if (this.volumeForm.value.qtd > 30) {
      const dialogResult = await this.openDialog(`Você deseja imprimir ${this.volumeForm.value.qtd} etiquetas de volume/conferente`)
      if (!dialogResult) {
        return
      }
    }
    this.etqService.printConferentes(this.volumeForm.value.pedido, this.volumeForm.value.pagina, this.volumeForm.value.conferente, this.volumeForm.value.qtd, this.setor).subscribe()
  }
}
