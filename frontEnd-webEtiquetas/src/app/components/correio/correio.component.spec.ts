import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreioComponent } from './correio.component';

describe('CorreioComponent', () => {
  let component: CorreioComponent;
  let fixture: ComponentFixture<CorreioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorreioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorreioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
