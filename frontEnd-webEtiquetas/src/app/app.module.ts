import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { VolumeComponent } from './components/volume/volume.component';
import { FragilComponent } from './components/fragil/fragil.component';
import { SegurancaComponent } from './components/seguranca/seguranca.component';
import { LadoComponent } from './components/lado/lado.component';
import { CorreioComponent } from './components/correio/correio.component';
import { ExcessoComponent } from './components/excesso/excesso.component';
import { LocacaoComponent } from './components/locacao/locacao.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { GarantiaComponent } from './components/garantia/garantia.component';
import { PneuComponent } from './components/pneu/pneu.component';
import { CodbarrasComponent } from './components/codbarras/codbarras.component';
import { MaxxComponent } from './components/maxx/maxx.component';
import { ConfComponent } from './components/conf/conf.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LocacaoOrleonComponent } from './components/locacao-orleon/locacao-orleon.component';

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VolumeComponent,
    FragilComponent,
    SegurancaComponent,
    LadoComponent,
    CorreioComponent,
    ExcessoComponent,
    LocacaoComponent,
    ConsultaComponent,
    GarantiaComponent,
    PneuComponent,
    CodbarrasComponent,
    MaxxComponent,
    ConfComponent,
    DialogComponent,
    LocacaoOrleonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
