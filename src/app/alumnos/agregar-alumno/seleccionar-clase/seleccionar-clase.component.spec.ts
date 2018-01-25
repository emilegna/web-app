import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarClaseComponent } from './seleccionar-clase.component';

describe('SeleccionarClaseComponent', () => {
  let component: SeleccionarClaseComponent;
  let fixture: ComponentFixture<SeleccionarClaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarClaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
