import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestersListComponent } from './testers-list.component';
import {
  GETS_TESTERS_QUERY_PORT,
  GetsTestersQueryPort
} from "../../../../application/port/primary/gets-testers.query-port";
import {of} from "rxjs";

describe('TestersListComponent', () => {
  let component: TestersListComponent;
  let fixture: ComponentFixture<TestersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestersListComponent ],
      providers: [
        {
          provide: GETS_TESTERS_QUERY_PORT,
          useValue: <GetsTestersQueryPort>{getTesters: jest.fn(() => of([]))}
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
