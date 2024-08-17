import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSubcategoryComponent } from './card-subcategory.component';

describe('CardSubcategoryComponent', () => {
  let component: CardSubcategoryComponent;
  let fixture: ComponentFixture<CardSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSubcategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
