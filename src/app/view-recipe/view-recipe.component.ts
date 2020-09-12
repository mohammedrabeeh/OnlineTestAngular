import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../common/model';


@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  displayedColumns: string[] = ['recipeId', 'recipeTitle', 'dateAdded', 'levelName', 'steps', 'ingredients', 'images', 'edit'];
  
  recipes: Recipe[];
  constructor(private httpService: HttpClient) { 
  }

  ngOnInit() {
    this.httpService.get<Recipe[]>('https://localhost:44368/Recipes/GetRecipe').subscribe(  
      data => {  
       this.recipes = data;  
      }  
    ); 
  }

}
