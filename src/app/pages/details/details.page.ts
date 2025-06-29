import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  standalone: false,
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  pokemon: any;
  isLoading = true;
  isFavorite = false;
  pokemonName = '';
  evolutionChain: { name: string; image: string }[] = [];
  pokemonDescription: string | null  = null;
  evolutionDetails: { [name: string]: { pokemon: any; description: string | null } } = {};

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('id');
    if (name) {
      this.pokemonName = name;
      this.isFavorite = this.favoriteService.isFavorite(name);
      this.loadPokemonData(name);
    }
  }

  loadPokemonData(name: string) {
    this.isLoading = true;
    this.pokemonService.getPokemonDetails(name).subscribe((data) => {
      this.pokemon = data;
      this.isFavorite = this.favoriteService.isFavorite(name);
      this.pokemonName = name;

      this.pokemonService.getPokemonDescription(name).subscribe((desc) => {
        this.pokemonDescription = desc;
        this.evolutionDetails[name] = {
          pokemon: data,
          description: desc ?? null,
        };
        this.isLoading = false;
      });
    });

    this.loadEvolutionChain(name);
  }

  loadEvolutionChain(name: string) {
    this.pokemonService.getPokemonSpecies(name).subscribe((speciesData) => {
      const evolutionUrl = speciesData.evolution_chain?.url;
      if (!evolutionUrl) return;

      this.pokemonService.getEvolutionChain(evolutionUrl).subscribe(async (evoData) => {
        const chain = evoData.chain;
        const evolutionList: { name: string; image: string }[] = [];

        let current = chain;
        while (current) {
          const evoName = current.species.name;

          if (!this.evolutionDetails[evoName]) {
            const details = await this.pokemonService.getPokemonDetails(evoName).toPromise();
            const desc = await this.pokemonService.getPokemonDescription(evoName).toPromise();
            this.evolutionDetails[evoName] = {
              pokemon: details,
              description: desc ?? null,
            };

            evolutionList.push({
              name: evoName,
              image: details.sprites.front_default,
            });
          } else {
            evolutionList.push({
              name: evoName,
              image: this.evolutionDetails[evoName].pokemon.sprites.front_default,
            });
          }

          current = current.evolves_to?.[0];
        }

        this.evolutionChain = evolutionList;
      });
    });
  }

  loadFromEvolution(name: string) {
    const cached = this.evolutionDetails[name];
    if (cached) {
      this.pokemon = cached.pokemon;
      this.pokemonDescription = cached.description;
      this.pokemonName = name;
      this.isFavorite = this.favoriteService.isFavorite(name);
    } else {
      this.loadPokemonData(name);
    }
  }

  get basicInfo(): { label: string; value: string }[] {
    if (!this.pokemon) return [];

    return [
      { label: 'ID', value: String(this.pokemon.id) },
      { label: 'Altura', value: `${this.pokemon.height / 10} m` },
      { label: 'Peso', value: `${this.pokemon.weight / 10} kg` },
      {
        label: 'Tipos',
        value: this.pokemon.types.map((t: any) => t.type.name).join(', '),
      },
      {
        label: 'Experiência Base',
        value: String(this.pokemon.base_experience),
      },
    ];
  }

  get skillsInfo(): { label: string; value: string }[] {
    if (!this.pokemon) return [];

    return [
      {
        label: 'Habilidades',
        value: this.pokemon.abilities
          .map((a: any) => a.ability.name)
          .join(', '),
      },
    ];
  }

  get statsInfo(): { label: string; value: string }[] {
    if (!this.pokemon) return [];

    return this.pokemon.stats.map((s: any) => ({
      label: s.stat.name.replace('-', ' '),
      value: String(s.base_stat),
    }));
  }

  get primaryType(): string {
    return this.pokemon?.types?.[0]?.type?.name ?? 'normal';
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.favoriteService.removeFavorite(this.pokemonName);
    } else {
      this.favoriteService.addFavorite(this.pokemonName);
    }

    this.isFavorite = !this.isFavorite;
  }
}
