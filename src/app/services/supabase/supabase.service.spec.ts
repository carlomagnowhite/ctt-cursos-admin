import { TestBed } from '@angular/core/testing';

import { SupabaseService } from './supabase.service';

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseService);
  });

  it('Instanciación correcta del servicio de Supabase.', () => {
    expect(service).toBeTruthy();
  });
});
