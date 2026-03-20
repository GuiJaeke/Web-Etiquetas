import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SetorService } from '../../services/setor.service';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  setorForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private setorService: SetorService
  ) {
    this.setorForm = this.fb.group({
      setor: [''],
    });


    this.setorService.OnInit()
  }
  setSetor() {
    this.setorService.setSetor(this.setorForm.value.setor)
  }
  

}
