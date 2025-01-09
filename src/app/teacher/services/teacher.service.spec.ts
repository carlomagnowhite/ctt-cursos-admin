import { TestBed } from '@angular/core/testing';

import { TeacherService } from './teacher.service';

describe('TeacherService', () => {
  let service: TeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherService);
  });

  it('Instanciación correcta del servicio.', () => {
    expect(service).toBeTruthy();
  });
});
