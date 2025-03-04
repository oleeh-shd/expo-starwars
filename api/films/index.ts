import { Film, FilmsResponse } from '@/types/films';
import { ApiUrls } from '../api-urls';
import { api } from '../axios';

export class FilmsApi {
  static async getFilms() {
    const { data } = await api.get<FilmsResponse>(ApiUrls.Films);
    return data;
  }

  static async getFilm(id: string) {
    const { data } = await api.get<Film>(`${ApiUrls.Films}/${id}`);
    return data;
  }
}
