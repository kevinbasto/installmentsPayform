import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CardComponent } from './form/card/card.component';
import { PlansComponent } from './form/plans/plans.component';
import { GreetingsComponent } from './form/greetings/greetings.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlansComponent,
    GreetingsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
