import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
    const table = getElementByTestId('pokemons-table-rows',fixture)
    /**
     * Verificamos que si este renderizando la tabla contando la cantidad de nodos hijo.
     * Si es 2 Quiere decir que renderizo la tabla con nuestro objeto dummy en caso contrario fallo.
     * Cuenta como 2 porque contabiliza la directiva de ng-for-of
     */
    expect(table.childNodes.length).toBe(2);
    expect(fakeTableService.getAllPokemons).toHaveBeenCalled();
  })

});


const getElementByTestId = (testId:string, fixture: ComponentFixture<any>) => {
  const element = fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
  return element;
}