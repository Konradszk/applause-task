import {Test, TestingModule} from "@nestjs/testing";
import {of} from "rxjs";
import {GetsCountriesQueryHandler} from "./gets-countries.query-handler";
import {GETS_COUNTRIES_DTO_PORT, GetsCountriesDtoPort} from "../port/secondary/gets-countries.dto-port";
import {CountryQuery} from "../port/primary/country.query";

describe('GetsCountriesQueryHandler', () => {
  let handler: GetsCountriesQueryHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: GETS_COUNTRIES_DTO_PORT,
        useValue: {getCountries: jest.fn(() => of([{name: 'US'}]))} as GetsCountriesDtoPort
      },
        GetsCountriesQueryHandler]
    }).compile();

    handler = module.get<GetsCountriesQueryHandler>(GetsCountriesQueryHandler);
  });

  describe('GET', () => {
    it('should return countries in json-api', (done) => {
      handler.getCountries().subscribe(result => {
        expect(result).toEqual(expect.arrayContaining([expect.any(CountryQuery)]))
        done();
      })
    })
  })
});
