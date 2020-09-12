import { Levels, Steps, Ingredients, RecipeVMClass } from './../common/model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  levels: Levels[];
  private routeSub: Subscription;
  
  RecipeVM: RecipeVMClass = {
    recipeID: '',
    recipeTitle: '',
    levelID: '',
    steps:[{
      stepName: ''
    }],
    ingredients:[{
      ingredientName: ''
    }],
    image1: '',
    image2: '',
    image3: ''
};

  constructor(private httpService: HttpClient, private _snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {

    this.httpService.get<Levels[]>('https://localhost:44368/Levels/GetLevel').subscribe(  
      data => {  
       this.levels = data;  
      }  
    ); 

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id

      if(params['id'] != undefined)
      {

          this.httpService.get<RecipeVMClass>('https://localhost:44368/Recipes/GetRecipe/' + params['id']).subscribe(  
            data => {  
              this.RecipeVM = data;  
              console.log(data);
              console.log(this.RecipeVM);
            }  
          ); 
      }
    });

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSubmit(){
    //console.log(this.RecipeVM);
    this.httpService.post('https://localhost:44368/Recipes/PostRecipe', this.RecipeVM).subscribe(
      data => {
        if(data["recipeId"] != "")
        {
          this.openSnackBar("Data saved. Recipe ID: " + data["recipeId"]);
        }
      }
    )
    //console.log(this.model);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 2000,
    });
  }


  addstep() {
    this.RecipeVM.steps.push({
      stepName: ''
    });
  }

  removestep(i: number) {
    this.RecipeVM.steps.splice(i, 1);
  }


  addIngredient() {
    this.RecipeVM.ingredients.push({
      ingredientName: ''
    });
  }

  removeIngredient(i: number) {
    this.RecipeVM.ingredients.splice(i, 1);
  }

  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.httpService.post('https://localhost:44368/Recipes/Upload', formData)
      .subscribe(event => {
        this.RecipeVM.image1 = event["fileName"];
      });
  }

  uploadFile2 = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.httpService.post('https://localhost:44368/Recipes/Upload', formData)
      .subscribe(event => {
        this.RecipeVM.image2 = event["fileName"];
      });
  }

  uploadFile3 = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.httpService.post('https://localhost:44368/Recipes/Upload', formData)
      .subscribe(event => {
        this.RecipeVM.image3 = event["fileName"];
      });
  }

}
