import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private storageKey = 'favoritePokemons';

  getFavorites(): string[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addFavorite(name: string): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(name)) {
      favorites.push(name);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(name: string): void {
    const favorites = this.getFavorites().filter(n => n !== name);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  isFavorite(name: string): boolean {
    return this.getFavorites().includes(name);
  }

  toggleFavorite(name: string): void {
    if (this.isFavorite(name)) {
      this.removeFavorite(name);
    } else {
      this.addFavorite(name);
    }
  }
}
