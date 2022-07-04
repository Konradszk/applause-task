import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterMatcherPageComponent } from './tester-matcher-page.component';

describe('TesterMatcherPageComponent', () => {
  let component: TesterMatcherPageComponent;
  let fixture: ComponentFixture<TesterMatcherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesterMatcherPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterMatcherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
