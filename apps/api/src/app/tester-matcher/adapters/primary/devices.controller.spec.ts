import {Test, TestingModule} from '@nestjs/testing';
import {DevicesController} from './devices.controller';
import {
  GETS_ALL_DEVICES_QUERY_PORT,
  GetsAllDevicesQueryPort
} from "../../application/port/primary/gets-all-devices.query-port";
import {of} from "rxjs";
import {DeviceQuery} from "../../application/port/primary/device.query";
import {DeviceCollectionJsonApi} from "./response/device-collection.json-api";

describe('DevicesController', () => {
  let controller: DevicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [
        {
          provide: GETS_ALL_DEVICES_QUERY_PORT,
          useValue: <GetsAllDevicesQueryPort>{
            getAllDevices: jest.fn(() => of([
              new DeviceQuery(10, 'Nokia 3310'),
              new DeviceQuery(12, 'Iphone X'),
            ]))
          }
        }
      ]
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
  });

  describe('GET', () => {
    it('should return devices in JSON-API', done => {
      controller.getAllDevices().subscribe(result => {
        expect(result).toEqual(expect.any(DeviceCollectionJsonApi));
        expect(result.data).toHaveLength(2);
        expect(result.data).toEqual(expect.arrayContaining([
          expect.objectContaining({
            type: 'device',
            id: 10,
            attributes: {
              name: 'Nokia 3310'
            }
          })]
        ));
        done();
      })
    })
  });
});
