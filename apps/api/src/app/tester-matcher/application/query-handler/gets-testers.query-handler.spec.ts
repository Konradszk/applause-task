import {GetsTestersQueryHandler} from "./gets-testers.query-handler";
import {Test, TestingModule} from "@nestjs/testing";
import {of} from "rxjs";
import {GETS_TESTERS_DTO_PORT, GetsTestersDtoPort} from "../port/secondary/gets-testers.dto-port";
import {VALIDATES_COUNTRIES_DTO_PORT, ValidatesCountriesDtoPort} from "../port/secondary/validates-countries.dto-port";
import {VALIDATES_DEVICES_DTO_PORT, ValidatesDevicesDtoPort} from "../port/secondary/validates-devices.dto-port";
import {TesterQuery} from "../port/primary/tester.query";
import {BadRequestException} from "@nestjs/common";

describe('GetsTestersQueryHandler', () => {
  let handler: GetsTestersQueryHandler;
  let validator: ValidatesDevicesDtoPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: GETS_TESTERS_DTO_PORT,
        useValue: <GetsTestersDtoPort>{
          getsTesters: jest.fn(() => of([
            {firstName: 'John', lastName: 'Pope', score: 10, id: 1},
            {firstName: 'Mike', lastName: 'Dushe', score: 50, id: 2}
          ]))
        }
      },
        {
          provide: VALIDATES_COUNTRIES_DTO_PORT,
          useValue: <ValidatesCountriesDtoPort>{checkIds: jest.fn(() => of(true))}
        },
        {
          provide: VALIDATES_DEVICES_DTO_PORT,
          useValue: <ValidatesDevicesDtoPort>{
            checkIds: jest.fn(() => of(true))
          }
        },
        GetsTestersQueryHandler]
    }).compile();

    handler = module.get<GetsTestersQueryHandler>(GetsTestersQueryHandler);
    validator = module.get<ValidatesDevicesDtoPort>(VALIDATES_DEVICES_DTO_PORT);
  });

  it('should return queries in order', done => {
    handler.getTesters({countries: [], deviceIds: []}).subscribe(result => {
      expect(result).toEqual(expect.arrayContaining([expect.any(TesterQuery)]));
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(expect.objectContaining({id: 2}))
      done();
    })
  });

  it('should throw error when receive invalid data', done => {
    jest.spyOn(validator, 'checkIds').mockReturnValue(of(false));
    handler.getTesters({countries: [], deviceIds: []}).subscribe({
      error: err => {
        expect(err).toEqual(expect.any(BadRequestException));
        done();
      }
    })
  });
})
