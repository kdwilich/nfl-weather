import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './espn-api.config';

@Injectable()
export class ESPNService {
  constructor(private http: HttpClient) {}

  getSchedules(week?: number, year?: number, type?: number) {
    return this.http
      .get(`${config.endpoint3}/year/${year || 2019}/seasontype/${type || 2}/week/${week || 1}?xhr=1`)
      .toPromise()
      .then((res: any) => res.content.sbData)
      .catch((err) => console.error(err));
  }

  getWeeks() {
    return this.http
      .get('assets/data/nfl-weeks.json')
      .toPromise()
      .then((res: any) => res)
      .catch((err) => console.error(err));
  }
}
