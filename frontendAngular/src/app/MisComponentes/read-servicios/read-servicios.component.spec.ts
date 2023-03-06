import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadServiciosComponent } from './read-servicios.component';

describe('ReadServiciosComponent', () => {
  let component: ReadServiciosComponent;
  let fixture: ComponentFixture<ReadServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadServiciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
