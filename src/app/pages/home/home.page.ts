import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemons(this.offset, this.limit).subscribe((res) => {
      const requests = res.results.map((pokemon: any) =>
        this.pokemonService.getPokemonDetails(pokemon.name)
      );

      Promise.all(requests.map((r: any) => r.toPromise())).then((detailedPokemons) => {
        this.pokemons = [...this.pokemons, ...detailedPokemons];
      });
    });
  }

  loadMore() {
    this.offset += this.limit;
    this.loadPokemons();
  }
}
