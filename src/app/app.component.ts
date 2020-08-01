import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CarService } from './services/carservice';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Car } from './domain/car';
import { ESPNService } from './services/espnservice';

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

  cars: Car[];
  carList: any;
  selectedCar: Car;
  cols: any[];

  selectedYear: number;
  selectedWeek: number;
  selectedType: number;

  selectedGame: any;
  gameCols: any[];
  gameTimes: any[];

  weekSchedule;

  constructor(private carService: CarService, private readonly espnService: ESPNService) {}

  ngOnInit() {
    this.selectedYear = 2020;
    this.selectedWeek = 1;
    this.selectedType = 2;
    this.weekSchedule = [];
    this.gameTimes = [];

    this.espnService.getSchedules(this.selectedWeek, this.selectedYear, this.selectedType).then((schedule: any) => {
      this.weekSchedule = schedule.events;
      console.log(schedule.events);

      schedule.events.forEach((e) => (this.gameTimes.indexOf(e.date) === -1 ? this.gameTimes.push(e.date) : null));
    });

    this.gameCols = [
      { field: 'name', header: 'Name' },
      { field: 'id', header: 'ID' },
    ];

    this.carList = [];

    this.cities1 = [
      { label: 'Select City', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } },
    ];

    //   this.carService.getCarsSmall().then((cars) => {
    //     this.cars = cars;
    //     this.carList.push(this.cars);
    //     this.carList.push(this.cars);
    //   });

    //   this.cols = [
    //     { field: 'vin', header: 'Vin' },
    //     { field: 'year', header: 'Year' },
    //     { field: 'brand', header: 'Brand' },
    //     { field: 'color', header: 'Color' },
    //   ];
  }

  gamesByDateTime(time: string) {
    return this.weekSchedule.filter((week) => week.date === time);
  }

  formatDateTime(dateTime: string) {
    const options = {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'America/Chicago',
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTime));
  }
}
