import {TestBed} from "@angular/core/testing";
import {of} from "rxjs";
import {GetsCountriesQueryHandler} from "./gets-countries.query-handler";
import {CountryQuery} from "../port/primary/country.query";
import {GETS_COUNTRIES_DTO_PORT, GetsCountriesDtoPort} from "../port/secondary/gets-countries.dto-port";

describe('GetsCountriesQueryHandler', () => {
  let handler: GetsCountriesQueryHandler;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetsCountriesQueryHandler,
        {
          provide: GETS_COUNTRIES_DTO_PORT,
          useValue: <GetsCountriesDtoPort>{
            getCountries: jest.fn(() => of(([{code: 'US'}])))
          }
        }]
    });

    handler = TestBed.inject(GetsCountriesQueryHandler);
  });

  it('should return devices with ALL option', done => {
    handler.getCountries().subscribe(queries => {
      expect(queries).toEqual(expect.arrayContaining([new CountryQuery('ALL')]))
      done();
    })
  })
});
