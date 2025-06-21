export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    [key: string]: string;
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}
