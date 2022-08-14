import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { TableService } from '../../services/table.service';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let fakeTableService: TableService;

  const Arrpokemons = [
    {
      "id": 2659,
      "name": "Pikachu",
      "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
      "attack": 31,
      "defense": 64,
      "hp": 100,
      "type": "Unknown",
      "id_author": 1
    }
  ]

  const pokemon = {
    "id": 2659,
    "name": "Pikachu",
    "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    "attack": 31,
    "defense": 64,
    "hp": 100,
    "type": "Unknown",
    "id_author": 1
  }

  const deleteRes = {
    "success": true,
    "type": "pokemon_removed",
    "data": []
  }

  beforeEach(async () => {

     fakeTableService = jasmine.createSpyObj<TableService>('TableService', {
      getAllPokemons: of(Arrpokemons),
      getPokemonById : of(pokemon),
      getNPokemons : of(Arrpokemons),
      updatePokemon : of(pokemon),
      postPokemon : of(pokemon),
      deletePokemon: of(deleteRes)
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ TableComponent,
       ],
       imports: [
        HttpClientTestingModule
       ],
      providers: [
        {provide:TableService, useValue: fakeTableService}
        
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all pokemons', () => {
    expect(fakeTableService.getAllPokemons).toHaveBeenCalled();
  })
});
