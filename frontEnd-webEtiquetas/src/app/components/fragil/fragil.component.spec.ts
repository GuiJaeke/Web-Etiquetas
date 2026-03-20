import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragilComponent } from './fragil.component';

describe('FragilComponent', () => {
  let component: FragilComponent;
  let fixture: ComponentFixture<FragilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FragilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FragilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
