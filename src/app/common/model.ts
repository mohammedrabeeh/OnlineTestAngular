export class Recipe{
    recipeId: string;
    recipeTitle: string;
    dateAdded: string;
    image1: string;
    image2: string;
    image3: string;
    levelName: string;
    steps: Steps[];
    ingrediets: Ingredients[];
}

export class Steps{
    stepsId: string;
    stepName: string;
}

export class Ingredients{
    ingredientId: string;
    ingredientName: string;
}

export class Levels{
    levelId: string;
    levelName: string;
}

export class RecipeVMClass{
    recipeID: string;
    recipeTitle: string;
    levelID: string;
    steps:[{
      stepName: string;
    }];
    ingredients:[{
      ingredientName: string;
    }];
    image1: string;
    image2: string;
    image3: string;
}