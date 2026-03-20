import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxxComponent } from './maxx.component';

describe('MaxxComponent', () => {
  let component: MaxxComponent;
  let fixture: ComponentFixture<MaxxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaxxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
