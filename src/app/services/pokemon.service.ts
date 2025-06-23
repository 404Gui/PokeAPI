import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  private allPokemonNames: { name: string; url: string }[] = [];

  constructor(private http: HttpClient) {}

  getPokemons(offset = 0, limit = 20): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${name}`);
  }

  //*p/ carregar todos os nomes uma unica vez*//
  loadAllPokemonNames(): Observable<{ name: string; url: string }[]> {
    if (this.allPokemonNames.length > 0) {
      return of(this.allPokemonNames);
    }

    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=1010`).pipe(
      map((res) => {
        this.allPokemonNames = res.results;
        return this.allPokemonNames;
      })
    );
  }

  //* busca parcial pelo nome local do pokemon *//
  searchPokemonByNameFragment(fragment: string): Observable<{ name: string; url: string }[]> {
    const query = fragment.toLowerCase();
    const filtered = this.allPokemonNames.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query)
    );
    return of(filtered);
  }
}
