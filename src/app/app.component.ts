import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  constructor(){
    console.log("On App Component constrcutor");
  }
  ngOnInit(): void {
    console.log(this.title);
    throw new Error('Method not implemented.');
  }
}
