import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Sunburst from 'sunburst-chart';
import * as d3 from 'd3';
import { ApiService } from './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loading: boolean;

  @ViewChild('sbChart', { static: true }) sbChartEl: ElementRef;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getData();
    this.loading = true;
    
    
  }

  getData(){
    this.apiService.get(``).subscribe((data: any)=>{
      console.log("......",data)
      if(data.length){
        const color = d3.scaleOrdinal(d3.schemePaired);
        const mappedData = data.map((country, index) => {
          const newData = {
            name: country.country,
            size:country.cases,
            children:[
              {
                name: "Recovered",
                size: country.recovered
              },
              {
                name: "Deaths",
                size: country.deaths
              },
              {
                name: "Active",
                size: country.active
              }]
          }
          return newData;
        })
        const mainData = {
          name: 'All Countries',
          children: [...mappedData]
        }
        console.log(mainData)
        Sunburst()
          .data(mainData)
          .size('size')
          .height(800)
          .showLabels(true)
          .tooltipContent((d, node) => `Size: <i>${node.value}</i>`)
          //.color(d => color(d.name))(document.getElementById('sbChart'));
          .color(d => color(d.name))(this.sbChartEl.nativeElement);
        this.loading = false;
          }else{
          }
        
  })
  


}
}


