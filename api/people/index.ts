import axios from 'axios';
import { ApiUrls } from '../api-urls';
import { api } from '../axios';
import { People, Person } from '@/types/people';
import { Vehicle } from '@/types/vehicles';
import { Starship } from '@/types/starships';

export class PeopleApi {
  static async getPeople() {
    const { data } = await api.get<People>(ApiUrls.People);
    return data;
  }

  static async next(url: string) {
    const { data } = await axios.get<People>(url);
    return data;
  }

  static async getPerson(id: string) {
    const { data } = await api.get<Person>(`${ApiUrls.People}/${id}`);
    return data;
  }

  static async getPersonVehicles(id: string) {
    const { data } = await api.get<Vehicle>(`${ApiUrls.Vehicles}/${id}`);
    return data;
  }
  static async getPersonStarships(id: string) {
    const { data } = await api.get<Starship>(`${ApiUrls.Starships}/${id}`);
    return data;
  }
}
