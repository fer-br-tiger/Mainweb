import { TestBed } from '@angular/core/testing';

import { IdcursoService } from './idcurso.service';

describe('IdcursoService', () => {
  let service: IdcursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdcursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
