import {GetsAllDeviceQueryHandler} from "./gets-all-device.query-handler";
import {TestBed} from "@angular/core/testing";
import {GETS_ALL_DEVICES_DTO_PORT, GetsAllDevicesDtoPort} from "../port/secondary/gets-all-devices.dto-port";
import {of} from "rxjs";
import {DeviceQuery} from "../port/primary/device.query";

describe('GetsAllDeviceQueryHandler', () => {
  let handler: GetsAllDeviceQueryHandler;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetsAllDeviceQueryHandler,
        {
          provide: GETS_ALL_DEVICES_DTO_PORT,
          useValue: <GetsAllDevicesDtoPort>{
            getsAllDevices: jest.fn(() => of(([{id: '10', name: 'Iphone'}])))
          }
        }]
    });

    handler = TestBed.inject(GetsAllDeviceQueryHandler);
  });

  it('should return devices with ALL option', done => {
    handler.getAllDevices().subscribe(queries => {
      expect(queries).toEqual(expect.arrayContaining([new DeviceQuery('ALL', 'ALL')]))
      done();
    })
  })
});
