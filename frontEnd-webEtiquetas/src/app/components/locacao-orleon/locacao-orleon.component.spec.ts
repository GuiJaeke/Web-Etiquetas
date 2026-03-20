import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacaoOrleonComponent } from './locacao-orleon.component';

describe('LocacaoOrleonComponent', () => {
  let component: LocacaoOrleonComponent;
  let fixture: ComponentFixture<LocacaoOrleonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocacaoOrleonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocacaoOrleonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
