import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcessoComponent } from './excesso.component';

describe('ExcessoComponent', () => {
  let component: ExcessoComponent;
  let fixture: ComponentFixture<ExcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExcessoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
