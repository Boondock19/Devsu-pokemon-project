import { TestBed } from '@angular/core/testing';

import { NewPokemonService } from './new-pokemon.service';

describe('NewPokemonService', () => {
  let service: NewPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
