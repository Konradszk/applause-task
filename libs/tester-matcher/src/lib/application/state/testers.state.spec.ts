import {TestersState} from "./testers.state";
import {TestBed} from "@angular/core/testing";
import {FINDS_TESTERS_DTO_PORT, FindsTestersDtoPort} from "../port/secondary/finds-testers.dto-port";
import {of} from "rxjs";
import {TESTER_STORAGE, TesterStorage} from "../port/secondary/tester.storage";

describe('TestersState', () => {
  let state: TestersState;
  let storage: TesterStorage;
  let findsTesters: FindsTestersDtoPort;
  const testerStub = {firstName: 'John', lastName: 'Rox', score: 10};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        TestersState,
        {
          provide: FINDS_TESTERS_DTO_PORT,
          useValue: <FindsTestersDtoPort>{
            findTesters: jest.fn(() => of(([testerStub])))
          }
        },
        {
          provide: TESTER_STORAGE,
          useValue: {
            next: jest.fn()
          }
        }]
    });

    state = TestBed.inject(TestersState);
    storage = TestBed.inject(TESTER_STORAGE);
    findsTesters = TestBed.inject(FINDS_TESTERS_DTO_PORT);
  });

  it('should update storage', done => {
    state.search({deviceId: ['ALL'], countryId: ['ALL']}).subscribe(
      () => {
        expect(storage.next).toHaveBeenLastCalledWith([testerStub]);
        expect(findsTesters.findTesters).toHaveBeenCalledWith({
          countryCodes: null,
          deviceIds: null,
        })
        done();
      }
    )
  })

  it('should call port values', done => {
    state.search({deviceId: ['1', '2'], countryId: ['US']}).subscribe(
      () => {
        expect(storage.next).toHaveBeenLastCalledWith([testerStub]);
        expect(findsTesters.findTesters).toHaveBeenCalledWith({
          countryCodes: ['US'],
          deviceIds: ['1', '2'],
        })
        done();
      }
    )
  })
});
