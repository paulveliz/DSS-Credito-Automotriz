import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarAutomovilComponent } from './comprar-automovil.component';

describe('ComprarAutomovilComponent', () => {
  let component: ComprarAutomovilComponent;
  let fixture: ComponentFixture<ComprarAutomovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprarAutomovilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprarAutomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
