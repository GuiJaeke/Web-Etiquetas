import { Component } from '@angular/core';
import { SetorService } from './services/setor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  setor!: string | null
  orleon!: boolean
  constructor(private setorService: SetorService, private snackBar: MatSnackBar) {
    this.setor = this.setorService.OnInit()
    if(this.setor == '9' || this.setor == '10' || this.setor == '11' ||this.setor == '99') {
      this.orleon = true
    }
  }
  links = ['volume', 'pneu', 'locacao'];
  activeLink = this.links[0];
  title = 'frontEnd-webEtiquetas';
  
}
