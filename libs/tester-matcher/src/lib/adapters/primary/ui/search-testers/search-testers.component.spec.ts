import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTestersComponent } from './search-testers.component';
import {MatSelectModule} from "@angular/material/select";
import {HarnessLoader} from "@angular/cdk/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {
  GETS_ALL_DEVICES_QUERY_PORT,
  GetsAllDevicesQueryPort
} from "../../../../application/port/primary/gets-all-devices.query-port";
import {ReactiveFormsModule} from "@angular/forms";
import {of} from "rxjs";
import {DeviceQuery} from "../../../../application/port/primary/device.query";

describe('SearchTestersComponent', () => {
  let component: SearchTestersComponent;
  let fixture: ComponentFixture<SearchTestersComponent>;
  let harnessLoader: HarnessLoader;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTestersComponent],
      imports: [
        ReactiveFormsModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: GETS_ALL_DEVICES_QUERY_PORT,
          useValue: <GetsAllDevicesQueryPort>{getAllDevices: jest.fn(()=> of([new DeviceQuery('10', 'Iphone 13')]))}
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTestersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
