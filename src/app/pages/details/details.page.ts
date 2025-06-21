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

  get typeNames(): string {
    return this.pokemon?.types?.map((t: any) => t.type.name).join(', ') ?? '';
  }

  get abilityNames(): string {
    return (
      this.pokemon?.abilities?.map((a: any) => a.ability.name).join(', ') ?? ''
    );
  }

  get statsFormatted(): string {
    return (
      this.pokemon?.stats
        ?.map((s: any) => `${s.stat.name}: ${s.base_stat}`)
        .join(', ') ?? ''
    );
  }
}
