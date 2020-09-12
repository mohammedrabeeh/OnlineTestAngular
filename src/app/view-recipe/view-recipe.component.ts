
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../common/model';
import { MatPaginator, Sort } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent {
  displayedColumns: string[] = ['recipeId', 'recipeTitle', 'dateAdded', 'levelName', 'steps', 'ingredients', 'images', 'edit'];
  
  recipes: Recipe[];
  dataSource: MatTableDataSource<Recipe>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private httpService: HttpClient) { 
    this.httpService.get<Recipe[]>('https://localhost:44368/Recipes/GetRecipe').subscribe(  
      data => {  
       this.recipes = data;  
       this.recipes = this.recipes.slice();
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
      }  
    ); 
  }
  ngAfterViewInit() {
  }
  

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  isAscTitle:boolean = true;
  sortbyTitle()
  {
    const data = this.recipes.slice();
    this.recipes = data.sort((a, b) => {
       
      return compare(a.recipeTitle.toLowerCase(), b.recipeTitle.toLowerCase(), this.isAscTitle);
    });
    
    this.dataSource = new MatTableDataSource(this.recipes);
    this.dataSource.paginator = this.paginator;
    this.isAscTitle = !this.isAscTitle;
  }
  isAscDate:boolean = true;
  sortbyDate()
  {
    const data = this.recipes.slice();
    this.recipes = data.sort((a, b) => {
       
      return compare(a.dateAdded.toLowerCase(), b.dateAdded.toLowerCase(), this.isAscDate);
    });
    this.dataSource = new MatTableDataSource(this.recipes);
    this.dataSource.paginator = this.paginator;
    this.isAscDate = !this.isAscDate;
  }
  sortData(sort: Sort) {
    const data = this.recipes.slice();
    if (!sort.active || sort.direction === '') {
      this.recipes = data;
      return;
    }

    this.recipes = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'recipeId': return compare(a.recipeId, b.recipeId, isAsc);
        case 'recipeTitle': return compare(a.recipeTitle.toLowerCase(), b.recipeTitle.toLowerCase(), isAsc);
        case 'dateAdded': return compare(a.dateAdded, b.dateAdded, isAsc);
        case 'levelName': return compare(a.levelName, b.levelName, isAsc);
        default: return 0;
      }
    });
    
    this.dataSource = new MatTableDataSource(this.recipes);
    this.dataSource.paginator = this.paginator;
  }

  


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
