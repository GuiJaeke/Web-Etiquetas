import { Component, inject } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { EtiquetasService } from '../../services/etiquetas.service';
import { SetorService } from '../../services/setor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-codbarras',
  standalone: false,
  
  templateUrl: './codbarras.component.html',
  styleUrl: './codbarras.component.css'
})
export class CodbarrasComponent {
  codForm!: FormGroup
  erro: string = ''
  setor: string | null
  readonly dialog = inject(MatDialog);
  
    openDialog(mensagem: string): Promise<boolean> {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '26em',
        data: mensagem
      });
  
      return dialogRef.afterClosed().toPromise()
    }

  constructor(private fb: FormBuilder, private etqService: EtiquetasService, private setorService: SetorService, private snackBar: MatSnackBar) {
    this.codForm = this.fb.group({
      codigo: [],
      qtd: [0]
    })
    this.setor = this.setorService.OnInit()
  }
  async print() {
    if (this.codForm.value.qtd > 50) {
      const dialogResult = await this.openDialog(`Você deseja imprimir ${this.codForm.value.qtd} etiquetas de Código de Barras?`)
      if (!dialogResult) {
        return
      }
    }
    this.etqService.codbarrasETQ(this.codForm.value.codigo, this.codForm.value.qtd, this.setor).subscribe((item) => {
      if(!item) {
        this.snackBar.open(`Item não encontrado`, 'Fechar', { duration:3000});
      }
    })
  }
}
