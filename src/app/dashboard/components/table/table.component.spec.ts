import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
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
      id: 2743,
      name: 'Metapod',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/011.png',
      attack: 1,
      defense: 100,
      hp: 100,
      type: 'Unknown',
      id_author: 1,
    },
    {
      id: 2745,
      name: 'Weedle',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/013.png',
      attack: 57,
      defense: 71,
      hp: 100,
      type: 'Unknown',
      id_author: 1,
    },
    {
      id: 2746,
      name: 'Kakuna',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/014.png',
      attack: 1,
      defense: 100,
      hp: 100,
      type: 'Unknown',
      id_author: 1,
    },
  ];

  const pokemon = {
    id: 2746,
    name: 'Kakuna',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/014.png',
    attack: 1,
    defense: 100,
    hp: 100,
    type: 'Unknown',
    id_author: 1,
  };

  const updatedPokemon = {
    id: 2746,
    name: 'Updated Name',
    attack: 'Updated Attack',
    defense: 'Updated Defense',
    hp: 'Updated Hp',
    type: 'Updated Type',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/055.png',
    id_author: 1,
  };

  const postedPokemon = {
    id: 3000,
    name: 'Posted Name',
    attack: 'Posted Attack',
    defense: 'Posted Defense',
    hp: 'Posted Hp',
    type: 'Posted Type',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/055.png',
    id_author: 1,
  };

  const deleteRes = {
    success: true,
    type: 'pokemon_removed',
    data: [],
  };

  beforeEach(async () => {
    fakeTableService = jasmine.createSpyObj<TableService>('TableService', {
      getAllPokemons: of(Arrpokemons),
      getPokemonById: of({
        id: 2745,
        name: 'Weedle',
        image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/013.png',
        attack: 57,
        defense: 71,
        hp: 100,
        type: 'Unknown',
        id_author: 1,
      }),
      getNPokemons: of(Arrpokemons.slice(0, 2)),
      updatePokemon: of(updatedPokemon),
      postPokemon: of(postedPokemon),
      deletePokemon: of(deleteRes),
    });

    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [{ provide: TableService, useValue: fakeTableService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all pokemons', () => {
    const table = getElementByTestId('pokemons-table-rows', fixture);
    /**
     * Verificamos que si este renderizando la tabla contando la cantidad de nodos hijo.
     * Si es 4 Quiere decir que renderizo la tabla con nuestro objeto dummy en caso contrario fallo.
     * Cuenta como 4 porque contabiliza la directiva de ng-for-of
     */

    const amountOfpokemons = component.pokemons.length;
    expect(table.childNodes.length).toBe(amountOfpokemons + 1);
    expect(fakeTableService.getAllPokemons).toHaveBeenCalled();
  });

  it('should get pokemon by id', () => {
    spyOn(component, 'getPokemonById').and.callThrough();
    const searchBar = getElementByTestId('search-bar', fixture);

    searchBar.nativeElement.value = '2745';

    const table = getElementByTestId('pokemons-table-rows', fixture);

    searchBar.nativeElement.dispatchEvent(new Event('input'));

    searchBar.triggerEventHandler('keyup.enter', event);
    fixture.detectChanges();

    expect(component.getPokemonById).toHaveBeenCalled();

    /**
     * Verificamos que si este renderizando la tabla contando la cantidad de nodos hijo.
     * Si es 2 Quiere decir que renderizo la tabla con nuestro objeto dummy en caso contrario fallo.
     * Cuenta como 2 porque contabiliza la directiva de ng-for-of
     */

    expect(table.childNodes.length).toBe(2);
  });

  it('should clear search bar and reset pokemon array on reset', () => {
    spyOn(component, 'resetSearch').and.callThrough();
    const searchBar = getElementByTestId('search-bar', fixture);
    const resetButton = getElementByTestId('reset-button', fixture);

    searchBar.nativeElement.value = '2746';

    fixture.detectChanges();

    resetButton.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.resetSearch).toHaveBeenCalled();
    expect(searchBar.nativeElement.value).toBe('');
    expect(component.pokemons).toEqual(Arrpokemons);
  });

  it('Should open new modal form for new pokemon on click', () => {
    spyOn(component, 'openNewModal').and.callThrough();
    const newButton = getElementByTestId('new-button', fixture);

    let modal = getElementByTestId('new-pokemon-modal', fixture);

    newButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    modal = getElementByTestId('new-pokemon-modal', fixture);

    expect(component.openNewModal).toHaveBeenCalled();
    expect(modal).toBeDefined();
  });

  it('Should open new modal and post a new pokemon, close newModal', () => {
    spyOn(component, 'openNewModal').and.callThrough();
    spyOn(component, 'postPokemon').and.callThrough();

    const newButton = getElementByTestId('new-button', fixture);

    let modal = getElementByTestId('new-pokemon-modal', fixture);

    newButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Obtener los valores de los inputs del modal.
    let inputName = getElementByTestId(
      'name-input-post',
      fixture
    ).nativeElement;
    let inputAttack = getElementByTestId(
      'attack-input-post',
      fixture
    ).nativeElement;
    let inputDefense = getElementByTestId(
      'defense-input-post',
      fixture
    ).nativeElement;
    let inputImg = getElementByTestId(
      'image-input-post',
      fixture
    ).nativeElement;
    let inputHp = getElementByTestId('hp-input-post', fixture).nativeElement;
    let inputType = getElementByTestId(
      'type-input-post',
      fixture
    ).nativeElement;

    // Cambiar los valores de los inputs del modal.

    inputName.value = 'Posted Name';
    inputAttack.value = 'Posted Attack';
    inputDefense.value = 'Posted Defense';
    inputImg.value =
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/055.png';
    inputHp.value = 'Posted Hp';
    inputType.value = 'Posted Type';

    const pokemonPostedData = {
      id: 3000,
      name: 'Posted Name',
      attack: 'Posted Attack',
      defense: 'Posted Defense',
      hp: 'Posted Hp',
      type: 'Posted Type',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/055.png',
      id_author: 1,
    };

    fixture.detectChanges();

    const postNewButton = getElementByTestId('submit-post-button', fixture);
    postNewButton.triggerEventHandler('click', null);

    fixture.detectChanges();
    const amountOfpokemons = component.pokemons.length;

    

    expect(component.postPokemon).toHaveBeenCalled();
    expect(component.pokemons[amountOfpokemons - 1]).toEqual(pokemonPostedData);
    expect(modal).toBeNull();
  });

  it('Should open update modal form for update pokemon on click with pokemon values', () => {
    spyOn(component, 'openUpdateModal').and.callThrough();

    const id = component.pokemons.findIndex((pokemon) => pokemon.id == 2746);
    const pokemon = Arrpokemons[id];

    // Verificaremos con el tercer objeto del array de pruebas.
    const newButton = getElementByTestId(`update-button-${id}`, fixture);

    newButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const modal = getElementByTestId('update-modal', fixture);

    // Obtener los valores de los inputs del modal.
    const inputName = getElementByTestId('name-input-update', fixture)
      .nativeElement.value;
    const inputAttack = getElementByTestId('attack-input-update', fixture)
      .nativeElement.value;
    const inputDefense = getElementByTestId('defense-input-update', fixture)
      .nativeElement.value;
    const inputImg = getElementByTestId('image-input-update', fixture)
      .nativeElement.value;
    const inputHp = getElementByTestId('hp-input-update', fixture).nativeElement
      .value;
    const inputType = getElementByTestId('type-input-update', fixture)
      .nativeElement.value;

    // Verificar que los valores sean iguales a los del objeto pokemon.
    const { name, attack, defense, hp, type, image } = pokemon;

    let iguales = false;

    if (
      inputName == name ||
      inputAttack == attack ||
      inputDefense == defense ||
      inputImg == image ||
      inputHp == hp ||
      inputType == type
    )
      iguales = true;

    expect(component.openUpdateModal).toHaveBeenCalled();
    expect(modal).toBeDefined();
    expect(iguales).toBeTruthy();
  });

  it('update pokemon values and table, close updateModal', () => {
    spyOn(component, 'openUpdateModal').and.callThrough();
    spyOn(component, 'updatePokemon').and.callThrough();

    const id = component.pokemons.findIndex((pokemon) => pokemon.id == 2746);

    // Verificaremos con el tercer objeto del array de pruebas.
    const newButton = getElementByTestId(`update-button-${id}`, fixture);

    newButton.triggerEventHandler('click', null);

    fixture.detectChanges();

    // Obtener los valores de los inputs del modal.
    let inputName = getElementByTestId(
      'name-input-update',
      fixture
    ).nativeElement;
    let inputAttack = getElementByTestId(
      'attack-input-update',
      fixture
    ).nativeElement;
    let inputDefense = getElementByTestId(
      'defense-input-update',
      fixture
    ).nativeElement;
    let inputImg = getElementByTestId(
      'image-input-update',
      fixture
    ).nativeElement;
    let inputHp = getElementByTestId('hp-input-update', fixture).nativeElement;
    let inputType = getElementByTestId(
      'type-input-update',
      fixture
    ).nativeElement;

    // Cambiar los valores de los inputs del modal.

    inputName.value = 'Updated Name';
    inputAttack.value = 'Updated Attack';
    inputDefense.value = 'Updated Defense';
    inputImg.value =
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/055.png';
    inputHp.value = 'Updated Hp';
    inputType.value = 'Updated Type';

    const pokemonUpdatedData = {
      id: component.updateId,
      name: 'Updated Name',
      attack: 'Updated Attack',
      defense: 'Updated Defense',
      hp: 'Updated Hp',
      type: 'Updated Type',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/055.png',
      id_author: 1,
    };

    fixture.detectChanges();

    const updateForm = getElementByTestId('submit-update-button', fixture);

    updateForm.triggerEventHandler('click', null);

    fixture.detectChanges();
    const modal = getElementByTestId('update-modal', fixture);
    expect(component.updatePokemon).toHaveBeenCalled();
    expect(component.pokemons[id]).toEqual(pokemonUpdatedData);
    expect(modal).toBeNull();
  });

  it('Should delete pokemon with id', () => {
    spyOn(component, 'deletePokemon').and.callThrough();
    const id = 0;

    const initialLength = component.pokemons.length;
    const table = getElementByTestId('pokemons-table-rows', fixture);
    const initialTableLength = table.childNodes.length;

    const deleteButton = getElementByTestId(`delete-button-${id}`, fixture);

    deleteButton.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.deletePokemon).toHaveBeenCalled();
    expect(component.pokemons.length).toEqual(initialLength - 1);
    expect(table.childNodes.length).toEqual(initialTableLength - 1);
  });

  it('Should get n first pokemons', () => {
    spyOn(component,'changeSelect').and.callThrough();

    const n = 2;
    
    const first2Pokemons = component.pokemons.slice(0, n);

    const select = getElementByTestId('select-input',fixture)
    select.nativeElement.value = n;
    fixture.detectChanges();
    select.triggerEventHandler('change',event)
    fixture.detectChanges();

    

    expect(component.changeSelect).toHaveBeenCalled();
    expect(component.pokemons.length).toEqual(first2Pokemons.length);
  })
});

const getElementByTestId = (testId: string, fixture: ComponentFixture<any>) => {
  const element = fixture.debugElement.query(
    By.css(`[data-testid="${testId}"]`)
  );
  return element;
};
