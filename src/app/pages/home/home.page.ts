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

  constructor(
    private pokemonService: PokemonService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.loadInitialPokemons();
    this.pokemonService.loadAllPokemonNames().subscribe(); 
  }

  loadInitialPokemons() {
    this.pokemonService.getPokemons(0, 20).subscribe((res) => {
      const requests = res.results.map((p: any) =>
        this.pokemonService.getPokemonDetails(p.name).toPromise()
      );

      Promise.all(requests).then((detailed) => {
        this.pokemons = detailed;
      });
    });
  }

  loadMore() {
    
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
