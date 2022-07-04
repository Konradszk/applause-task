import {Test, TestingModule} from '@nestjs/testing';
import {of} from "rxjs";
import {TestersController} from "./testers.controller";
import {GETS_TESTERS_QUERY_PORT, GetsTestersQueryPort} from "../../application/port/primary/gets-testers.query-port";
import {TesterQuery} from "../../application/port/primary/tester.query";
import {TesterCollectionJsonApi} from "./response/tester-collection.json-api";

describe('TestersController', () => {
  let controller: TestersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestersController],
      providers: [
        {
          provide: GETS_TESTERS_QUERY_PORT,
          useValue: <GetsTestersQueryPort>{
            getTesters: jest.fn(() => of([
              new TesterQuery(10, 'John', 'Rouge', 50),
              new TesterQuery(12, 'Mike', 'Pope', 20),
            ]))
          }
        }
      ]
    }).compile();

    controller = module.get<TestersController>(TestersController);
  });

  describe('GET', () => {
    it('should return devices in JSON-API', done => {
      controller.getTesters(undefined, undefined).subscribe(result => {
        expect(result).toEqual(expect.any(TesterCollectionJsonApi));
        expect(result.data).toHaveLength(2);
        expect(result.data).toEqual(expect.arrayContaining([
          expect.objectContaining({
            type: 'tester',
            id: 10,
            attributes: {
              firstName: 'John',
              lastName: 'Rouge',
              score: 50
            }
          })]
        ));
        done();
      })
    })
  });
});
