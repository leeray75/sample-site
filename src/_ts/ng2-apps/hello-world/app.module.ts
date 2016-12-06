import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { HelloWorldComponent } from './hello-world.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    HelloWorldComponent
  ],
  bootstrap: [ HelloWorldComponent ]
})
export class AppModule { }
