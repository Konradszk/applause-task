import {TesterQuery} from "../../../application/port/primary/tester.query";

class TesterAttributes {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly score: number
  ) {
  }
}

class TesterJsonData {
  type = "tester";

  constructor(
    public readonly id: number,
    public readonly attributes: TesterAttributes
  ) {
  }
}

export class TesterCollectionJsonApi {
  public data: TesterJsonData[];

  static fromQueries(queries: TesterQuery[]): TesterCollectionJsonApi {
    const response = new TesterCollectionJsonApi();

    response.data = queries.map(query => new TesterJsonData(query.id, new TesterAttributes(query.firstName, query.lastName, query.score)))
    return response;
  }
}
