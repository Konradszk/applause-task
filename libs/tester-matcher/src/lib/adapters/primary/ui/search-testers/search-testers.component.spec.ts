import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchTestersComponent} from './search-testers.component';
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
import {
  GETS_COUNTRIES_QUERY_PORT,
  GetsCountriesQueryPort
} from "../../../../application/port/primary/gets-countries.query-port";
import {CountryQuery} from "../../../../application/port/primary/country.query";
import {
  SEARCHES_TESTERS_COMMAND_PORT,
  SearchesTestersCommandPort
} from "../../../../application/port/primary/searches-testers.command-port";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatSelectHarness} from "@angular/material/select/testing";
import {MatButtonHarness} from "@angular/material/button/testing";
import {SearchTestersCommand} from "../../../../application/port/primary/search-testers.command";

describe('SearchTestersComponent', () => {
  let component: SearchTestersComponent;
  let fixture: ComponentFixture<SearchTestersComponent>;
  let harnessLoader: HarnessLoader;
  let searchesCommandPort: SearchesTestersCommandPort;

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
          useValue: <GetsAllDevicesQueryPort>{getAllDevices: jest.fn(() => of([
            new DeviceQuery('10', 'Iphone 13'),
            new DeviceQuery('11', 'Iphone 12'),
            ]))}
        },
        {
          provide: GETS_COUNTRIES_QUERY_PORT,
          useValue: <GetsCountriesQueryPort>{getCountries: jest.fn(() => of([new CountryQuery('US')]))}
        },
        {
          provide: SEARCHES_TESTERS_COMMAND_PORT,
          useValue: <SearchesTestersCommandPort>{search: jest.fn(() => of(void 0))}
        }
      ]
    }).compileComponents();

    searchesCommandPort = TestBed.inject(SEARCHES_TESTERS_COMMAND_PORT);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTestersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    harnessLoader = TestbedHarnessEnvironment.loader(fixture)
  });

  it('should select options and search', async () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    const deviceSelect = await harnessLoader.getHarness(MatSelectHarness.with({selector: '.device-select'}));
    const countrySelect = await harnessLoader.getHarness(MatSelectHarness.with({selector: '.country-select'}));
    const button = await harnessLoader.getHarness(MatButtonHarness);

    await (await countrySelect.host()).click();
    await (await countrySelect.getOptions())[0].click();

    await (await deviceSelect.host()).click();
    await (await deviceSelect.getOptions())[0].click();
    await (await deviceSelect.host()).click();
    await (await deviceSelect.getOptions())[1].click();

    await button.click();

    expect(searchesCommandPort.search).toHaveBeenCalledWith(new SearchTestersCommand(['10', '11'], ['US']))
  });


});
