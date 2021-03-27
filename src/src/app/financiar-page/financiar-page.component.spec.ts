import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanciarPageComponent } from './financiar-page.component';

describe('FinanciarPageComponent', () => {
  let component: FinanciarPageComponent;
  let fixture: ComponentFixture<FinanciarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanciarPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanciarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
