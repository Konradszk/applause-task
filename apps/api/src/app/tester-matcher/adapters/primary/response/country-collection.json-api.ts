import {CountryQuery} from "../../../application/port/primary/country.query";

class CountryAttributes {
  constructor(public readonly name: string) {
  }
}

class CountryJsonData {
  id: string;
  type = 'countries';
  attributes: CountryAttributes
}

export class CountryCollectionJsonApi {
  public data: CountryJsonData[];

  static fromQueries(queries: CountryQuery[]): CountryCollectionJsonApi {
    const response = new CountryCollectionJsonApi();

    response.data = queries.map(query => {
      const data = new CountryJsonData();
      data.id = query.name;
      data.attributes = new CountryAttributes(query.name)
      return data
    })

    return response;
  }
}
