import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TestersListComponent} from './testers-list.component';
import {
  GETS_TESTERS_QUERY_PORT,
  GetsTestersQueryPort
} from "../../../../application/port/primary/gets-testers.query-port";
import {of} from "rxjs";
import {TesterQuery} from "../../../../application/port/primary/tester.query";
import {By} from "@angular/platform-browser";

describe('TestersListComponent', () => {
  let component: TestersListComponent;
  let fixture: ComponentFixture<TestersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestersListComponent],
      providers: [
        {
          provide: GETS_TESTERS_QUERY_PORT,
          useValue: <GetsTestersQueryPort>{
            getTesters: jest.fn(() => of([
              new TesterQuery(10, 'John', 'Rouge'),
              new TesterQuery(50, 'Paule', 'Mutt')
            ]))
          }
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

  it('should display list', () => {
    expect(fixture.debugElement.queryAll(By.css('li'))).toHaveLength(2)
  });
});
