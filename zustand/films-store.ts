import { FilmsApi } from '@/api/films';
import { Film } from '@/types/films';
import { create } from 'zustand';

type Store = {
  films: Film[];
  loading: boolean;
  fetchFilms: () => Promise<void>;
};

export const useFilmsStore = create<Store>((set) => ({
  films: [],
  loading: true,
  fetchFilms: async () => {
    try {
      const films = await FilmsApi.getFilms();
      set({ films: films.results });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));
