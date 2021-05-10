import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaAbonoComponent } from './ficha-abono.component';

describe('FichaAbonoComponent', () => {
  let component: FichaAbonoComponent;
  let fixture: ComponentFixture<FichaAbonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaAbonoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
