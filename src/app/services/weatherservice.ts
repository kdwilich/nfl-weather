import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './open-weather-api.config';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string, state?: string, country?: string) {
    return this.http
      .get(`${config.endpoint}/weather?q=${city},${state}&appid=${config.apikey}`)
      .toPromise()
      .then((res: any) => console.log(res))
      .catch((err) => console.error(err));
  }
}
