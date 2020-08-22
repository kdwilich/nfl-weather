import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CarService } from './services/carservice';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GameData, TeamData } from './domain/game';
import { ESPNService } from './services/espnservice';
import { WeatherService } from './services/weatherservice';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state(
        'void',
        style({
          transform: 'translateX(-10%)',
          opacity: 0,
        })
      ),
      state(
        'active',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
})
export class AppComponent implements OnInit {
  cities1: SelectItem[];
  cities2: City[];
  selectedCity1: City;

  selectedYear: number;
  selectedWeek: number;
  selectedType: number;

  selectedGame: any;
  gameCols: any[];
  gameTimes: any[];

  weekSchedule: GameData[];
  weeks = [];
  constructor(private weatherService: WeatherService, private readonly espnService: ESPNService) {}

  ngOnInit() {
    this.espnService.getWeeks().then((weeks) => (this.weeks = weeks));

    this.selectedYear = 2019;
    this.selectedWeek = 1;
    this.selectedType = 2;
    this.weekSchedule = [];
    this.gameTimes = [];

    this.espnService.getSchedules(this.selectedWeek, this.selectedYear, this.selectedType).then((week: any) => {
      const games = week.events;
      games.forEach((game) => {
        this.weekSchedule.push(this.getGameData(game));
        this.gameTimes.indexOf(game.date) === -1 ? this.gameTimes.push(game.date) : null;
      });
      // console.log(week.events);
      // console.log(this.weekSchedule);
    });

    this.gameCols = [
      { field: 'name', header: 'Name' },
      { field: 'id', header: 'ID' },
    ];

    this.cities1 = [
      { label: 'Select City', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } },
    ];
  }

  getGameData(game): GameData {
    const competitions = game.competitions[0];
    return {
      date: game.date,
      id: game.id,
      name: game.name,
      shortName: game.shortName,
      venue: competitions.venue,
      homeTeam: this.getTeamData(competitions.competitors[0]),
      awayTeam: this.getTeamData(competitions.competitors[1]),
      broadcasts: competitions.broadcasts[0].names[0],
    };
  }

  getTeamData(data): TeamData {
    return {
      record: data.records[0].summary,
      name: data.team.name,
      abbreviation: data.team.abbreviation,
      displayName: data.team.displayName,
      shortDisplayName: data.team.shortDisplayName,
      location: data.team.location,
      logo: data.team.logo,
      color: data.team.color,
      altColor: data.team.alternateColor,
    };
  }

  gamesByDateTime(time: string) {
    return this.weekSchedule.filter((week) => week.date === time);
  }

  formatDateTime(dateTime: string, type: 'date' | 'time') {
    const options = {
      date: {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      },
      time: {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'America/Chicago',
        timeZoneName: 'short',
      },
    };
    return new Intl.DateTimeFormat('en-US', options[type]).format(new Date(dateTime));
  }

  getCurrentTemperature(location: any) {
    return this.weatherService.getCurrentWeather(location.city, location.state);
  }
}
