import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('id');
    if (name) {
      this.pokemonService.getPokemonDetails(name).subscribe((data) => {
        this.pokemon = data;
        this.isLoading = false;
      });
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
        value: this.pokemon.types.map((t: any) => t.type.name).join(', ')
      },
      { label: 'Experiência Base', value: String(this.pokemon.base_experience) }
    ];
  }

  get skillsInfo(): { label: string; value: string }[] {
    if (!this.pokemon) return [];

    return [
      {
        label: 'Habilidades',
        value: this.pokemon.abilities.map((a: any) => a.ability.name).join(', ')
      }
    ];
  }

  get statsInfo(): { label: string; value: string }[] {
    if (!this.pokemon) return [];

    return this.pokemon.stats.map((s: any) => ({
      label: s.stat.name.replace('-', ' '),
      value: String(s.base_stat)
    }));
  }

  get primaryType(): string {
    return this.pokemon?.types?.[0]?.type?.name ?? 'normal';
  }
}
