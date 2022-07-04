import {DeviceQuery} from "../../../application/port/primary/device.query";

class DeviceAttributes {
  constructor(public readonly name: string) {
  }
}

class DeviceJsonData {
  public readonly type = 'device';

  constructor(
    public readonly id: number,
    public readonly attributes: DeviceAttributes
  ) {
  }
}

export class DeviceCollectionJsonApi {
  public data: DeviceJsonData[];

  static fromQueries(queries: DeviceQuery[]): DeviceCollectionJsonApi {
    const response = new DeviceCollectionJsonApi();
    response.data = queries.map(query => new DeviceJsonData(query.id, new DeviceAttributes(query.name)));
    return response;
  }
}
