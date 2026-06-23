import { Component, inject } from '@angular/core';
import { Volume } from '../../volume';
import { FormBuilder, FormGroup, MaxValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EtiquetasService } from '../../services/etiquetas.service';
import { SetorService } from '../../services/setor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-volume',
  standalone: false,

  templateUrl: './volume.component.html',
  styleUrl: './volume.component.css'
})
export class VolumeComponent {
  volume!: Volume;
  volumeForm: FormGroup;
  qtdForm: FormGroup;
  True: boolean = true
  data = new Date();
  interval: boolean = false
  unique: boolean = false
  setor!: string | null
  disabledButton: boolean = false
  Result: boolean = false
  readonly dialog = inject(MatDialog);

  openDialog(mensagem: string): Promise<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '26em',
      data: mensagem
    });

    return dialogRef.afterClosed().toPromise()
  }

  onCheckboxChange() {
    if (this.interval) {
      this.unique = false;
    }

    if (this.unique) {
      this.interval = false;
    }
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private etqService: EtiquetasService,
    private setorService: SetorService,
    private snackBar: MatSnackBar
  ) {
    this.volumeForm = this.fb.group({
      numped: [''],
    });
    this.qtdForm = this.fb.group({
      qtdInicial: [1],
      qtdFinal: [],
      unicaETQ: [],
      qtdVolume: []
    });
    this.setor = this.setorService.OnInit()
  }
  onSubmit() {
    this.qtdForm.get('qtdFinal')?.reset();
    this.qtdForm.get('qtdVolume')?.reset();
    this.etqService.findPed(this.volumeForm.value.numped).subscribe({
      next: (pedido) => {

        if (pedido) {
          console.log(pedido)
          this.volume = pedido

        } else {
          this.snackBar.open(`Pedido não encontrado`, 'Fechar', { duration: 3000 });
          this.volume = pedido
        }

      }
    })
  }
  onKeyup() {
    if (this.volumeForm.value.numped.length == 6) {
      this.onSubmit()
    }
  }
  async printETQ() {
    let interval = 'false'
    let unicaETQ = 'false'
    let totalVolume = 0
    this.disabledButton = true
    setTimeout(() => {
      this.disabledButton = false
    }, 1000)
    if(this.interval) {
      totalVolume = this.qtdForm.value.qtdFinal - this.qtdForm.value.qtdInicial + 1
    } else {
      totalVolume = this.qtdForm.value.qtdVolume - this.qtdForm.value.qtdInicial + 1
    }
    if (totalVolume > 50) {
      const dialogResult = await this.openDialog(`Você deseja imprimir ${totalVolume} etiquetas de CAIXAS?`)
      if (!dialogResult) {
        return
      }
    }

    if (this.qtdForm.value.unicaETQ) {
      unicaETQ = 'true'
    }
    if (!this.qtdForm.value.qtdVolume) {
      if (this.interval) {
        interval = 'true'
        this.etqService.ETQ(this.qtdForm.value.qtdInicial, this.qtdForm.value.qtdFinal, this.volume.QTD, this.volumeForm.value.numped, unicaETQ, interval, this.setor).subscribe((erro) => {
          if (erro) {
            this.snackBar.open(`Primeiro volume não pode ser maior que o ultimo!`, 'Fechar', { duration: 3000 });
          }
        })
      } else {
        this.etqService.ETQ(this.qtdForm.value.qtdInicial, this.volume.QTD, this.volume.QTD, this.volumeForm.value.numped, unicaETQ, interval, this.setor).subscribe((erro) => {
          if (erro) {
            this.snackBar.open(`Primeiro volume não pode ser maior que o ultimo!`, 'Fechar', { duration: 3000 });
          }
        })
      }
    } else {
      if (this.interval) {
        interval = 'true'
        this.etqService.ETQ(this.qtdForm.value.qtdInicial, this.qtdForm.value.qtdFinal, this.qtdForm.value.qtdVolume, this.volumeForm.value.numped, unicaETQ, interval, this.setor).subscribe((erro) => {
          if (erro) {
            this.snackBar.open(`Primeiro volume não pode ser maior que o ultimo!`, 'Fechar', { duration: 3000 });
          }
        })
      } else {
        this.etqService.ETQ(this.qtdForm.value.qtdInicial, this.qtdForm.value.qtdVolume, this.qtdForm.value.qtdVolume, this.volumeForm.value.numped, unicaETQ, interval, this.setor).subscribe((erro) => {
          if (erro) {
            this.snackBar.open(`Primeiro volume não pode ser maior que o ultimo!`, 'Fechar', { duration: 3000 });
          }
        })
      }
    }
  }
}
