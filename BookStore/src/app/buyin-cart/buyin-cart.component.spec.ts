import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyinCartComponent } from './buyin-cart.component';

describe('BuyinCartComponent', () => {
  let component: BuyinCartComponent;
  let fixture: ComponentFixture<BuyinCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyinCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyinCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
