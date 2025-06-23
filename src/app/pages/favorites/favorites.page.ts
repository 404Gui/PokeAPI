import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  standalone: false,
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoriteNames: string[] = [];
  pokemons: any[] = [];
  currentIndex = 0;
  batchSize = 10;
  isLoading = true;

  constructor(
    private favoriteService: FavoriteService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.favoriteNames = this.favoriteService.getFavorites();
    this.loadNextBatch();
  }

  loadNextBatch(event?: any) {
    const nextBatch = this.favoriteNames.slice(
      this.currentIndex,
      this.currentIndex + this.batchSize
    );

    Promise.all(
      nextBatch.map((name) =>
        this.pokemonService.getPokemonDetails(name).toPromise()
      )
    ).then((results) => {
      this.pokemons = [...this.pokemons, ...results];
      this.currentIndex += this.batchSize;
      this.isLoading = false;
      if (event) event.target.complete();
    });
  }

  removeFromFavorites(name: string) {
    this.favoriteService.removeFavorite(name);

    this.favoriteNames = this.favoriteService.getFavorites();
    this.pokemons = [];
    this.currentIndex = 0;
    this.isLoading = true;
    this.loadNextBatch();
  }

  hasMore(): boolean {
    return this.currentIndex < this.favoriteNames.length;
  }
}
