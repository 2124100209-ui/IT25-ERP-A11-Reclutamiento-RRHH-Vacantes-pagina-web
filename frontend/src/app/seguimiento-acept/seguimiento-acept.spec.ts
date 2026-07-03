import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoAcept } from './seguimiento-acept';

describe('SeguimientoAcept', () => {
  let component: SeguimientoAcept;
  let fixture: ComponentFixture<SeguimientoAcept>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoAcept],
    }).compileComponents();

    fixture = TestBed.createComponent(SeguimientoAcept);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
