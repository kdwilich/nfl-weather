import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';

import { AppComponent } from './app.component';
import { DropdownModule } from 'primeng/dropdown';
import { ESPNService } from './services/espnservice';
import { WeatherService } from './services/weatherservice';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    AccordionModule,
  ],
  providers: [WeatherService, ESPNService],
  bootstrap: [AppComponent],
})
export class AppModule {}
