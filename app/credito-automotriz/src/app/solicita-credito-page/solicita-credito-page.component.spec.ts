import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitaCreditoPageComponent } from './solicita-credito-page.component';

describe('SolicitaCreditoPageComponent', () => {
  let component: SolicitaCreditoPageComponent;
  let fixture: ComponentFixture<SolicitaCreditoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitaCreditoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitaCreditoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
