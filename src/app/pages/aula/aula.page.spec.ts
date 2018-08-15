import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaPage } from './aula.page';

describe('AulaPage', () => {
  let component: AulaPage;
  let fixture: ComponentFixture<AulaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AulaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AulaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
