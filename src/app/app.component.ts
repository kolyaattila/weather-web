import { Component } from "@angular/core";
import * as moment from "moment";
import { WeatherApiService } from "./service/weather-api.service";
import { ForecastModel } from "./models/forecast";
import { catchError } from "rxjs/operators";
import { handleError } from "./errorHandler";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  moment = moment;
  title = "weather-app";
  forecast: ForecastModel = new ForecastModel();
  date = moment().format(`hh:mm - dddd, D MMM 'YY`);
  menuOpen = false;

  clear = 'clear';
  brokenClouds='clouds';
  rain='rain';
  thunderstorm='thunderstorm';
  snow='snow';
  mist='mist';

  constructor(private weatherService: WeatherApiService) {}

  ngOnInit() {
    this.weatherService
      .getForecast(!!navigator.geolocation)
      .pipe(catchError(handleError))
      .subscribe(forecast => (this.forecast = forecast));
  }

  getWeatherData(form) {
    this.weatherService
      .getForecast(false, { name: form.form.value.name })
      .pipe(catchError(handleError))
      .subscribe(forecast => (this.forecast = forecast));
  }

  countCelsius() {
    return Math.round((this.forecast.list[0].temp.day - 32) * 5 / 9);
  }
  
  countFarenheit() {
    return Math.round(this.forecast.list[0].temp.day);
  }
  
  getClass(){
    var description = this.forecast.list[0].weather[0].description;
      if(description.includes(this.clear))
        return "parralax-image-clear";
      else if(description.includes(this.snow))
        return "parralax-image-snow";
      else if(description.includes(this.mist))
        return "parralax-image-mist";
      else if(description.includes(this.rain))
          return "parralax-image-rain";
      else if(description.includes(this.thunderstorm))
        return "parralax-image-storm";
      else
        return "parralax-image-clouds";
  }

}
