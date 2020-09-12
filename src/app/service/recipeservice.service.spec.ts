import { TestBed } from '@angular/core/testing';

import { RecipeserviceService } from './recipeservice.service';

describe('RecipeserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeserviceService = TestBed.get(RecipeserviceService);
    expect(service).toBeTruthy();
  });
});
