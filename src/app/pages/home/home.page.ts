import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  searchTerm: string = '';
  isSearching = false;
  offset = 0;
  limit = 20;

  constructor(
    private pokemonService: PokemonService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.loadInitialPokemons();
    this.pokemonService.loadAllPokemonNames().subscribe();
  }

  loadInitialPokemons() {
    this.offset = 0;
    this.pokemonService
      .getPokemons(this.offset, this.limit)
      .subscribe((res) => {
        const requests = res.results.map((p: any) =>
          this.pokemonService.getPokemonDetails(p.name).toPromise()
        );

        Promise.all(requests).then((detailed) => {
          this.pokemons = detailed;
        });
      });
  }

  loadMore() {
    this.offset += this.limit;
    this.pokemonService
      .getPokemons(this.offset, this.limit)
      .subscribe((res) => {
        const requests = res.results.map((p: any) =>
          this.pokemonService.getPokemonDetails(p.name).toPromise()
        );

        Promise.all(requests).then((detailed) => {
          this.pokemons = [...this.pokemons, ...detailed];
        });
      });
  }

  onSearch() {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.isSearching = false;
      this.loadInitialPokemons();
      return;
    }

    this.isSearching = true;
    this.pokemonService
      .searchPokemonByNameFragment(term)
      .subscribe((results) => {
        const limitedResults = results.slice(0, 20);

        const requests = limitedResults.map((p) =>
          this.pokemonService.getPokemonDetails(p.name).toPromise()
        );

        Promise.all(requests).then((detailed) => {
          this.pokemons = detailed;
        });
      });
  }

  isFavorite(name: string): boolean {
    return this.favoriteService.isFavorite(name);
  }

  toggleFavorite(name: string, event: Event): void {
    event.stopPropagation();
    this.favoriteService.toggleFavorite(name);
  }
}
