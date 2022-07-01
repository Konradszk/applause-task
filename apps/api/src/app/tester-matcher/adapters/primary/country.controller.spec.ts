import {Test, TestingModule} from '@nestjs/testing';
import {CountryController} from './country.controller';
import {
  GETS_COUNTRIES_QUERY_PORT,
  GetsCountriesQueryPort
} from "../../application/port/primary/gets-countries.query-port";
import {CountryQuery} from "../../application/port/primary/country.query";
import {of} from "rxjs";

describe('CountryController', () => {
  let controller: CountryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [{
        provide: GETS_COUNTRIES_QUERY_PORT,
        useValue: {getCountries: jest.fn(() => of([new CountryQuery('US')]))} as GetsCountriesQueryPort
      }]
    }).compile();

    controller = module.get<CountryController>(CountryController);
  });

  describe('GET', () => {
    it('should return countries in json-api', (done) => {
      controller.getCountries().subscribe(result => {
        expect(result.data).toEqual(expect.arrayContaining([expect.objectContaining({
          type: 'countries',
          id: 'US',
          attributes: expect.anything()
        })]))
        done();
      })
    })
  })
});
