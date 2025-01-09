import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { ModalFormCoursesComponent } from '../modal-form-courses/modal-form-courses.component';
import { SharedModule } from '../shared.module';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent, ModalFormCoursesComponent],
      imports: [SharedModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creación del componente.', () => {
    expect(component).toBeTruthy();
  });
});
