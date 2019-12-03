import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { HttpClientModule } from "@angular/common/http";
import { ForecastItemComponent } from "./components/forecast-item/forecast-item.component";
import { NumberInputDirective } from "./directives/number-input.directive";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ForecastItemComponent,
    NumberInputDirective
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
