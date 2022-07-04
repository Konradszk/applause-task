import {Test, TestingModule} from "@nestjs/testing";
import {of} from "rxjs";
import {GetsAllDevicesQueryHandler} from "./gets-all-devices.query-handler";
import {GETS_ALL_DEVICES_DTO_PORT, GetsAllDevicesDtoPort} from "../port/secondary/gets-all-devices.dto-port";
import {DeviceQuery} from "../port/primary/device.query";

describe('GetsAllDevicesQueryHandler', () => {
  let handler: GetsAllDevicesQueryHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: GETS_ALL_DEVICES_DTO_PORT,
        useValue: <GetsAllDevicesDtoPort>{getAllDevices: jest.fn(() => of([{id: 10, name: 'HTC One'}]))}
      },
        GetsAllDevicesQueryHandler]
    }).compile();

    handler = module.get<GetsAllDevicesQueryHandler>(GetsAllDevicesQueryHandler);
  });

  describe('GET', () => {
    it('should return countries in json-api', (done) => {
      handler.getAllDevices().subscribe(result => {
        expect(result).toEqual(expect.arrayContaining([expect.any(DeviceQuery)]))
        done();
      })
    })
  })
});
