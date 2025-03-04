type Gender = 'male' | 'female';

export type People = {
  count: number;
  next: string;
  previous: string;
  results: Person[];
};

export type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;
  url: string;
  films: string[];
  vehicles: string[];
  starships: string[];
};
