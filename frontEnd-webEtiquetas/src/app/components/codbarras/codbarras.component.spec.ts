import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodbarrasComponent } from './codbarras.component';

describe('CodbarrasComponent', () => {
  let component: CodbarrasComponent;
  let fixture: ComponentFixture<CodbarrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodbarrasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodbarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
