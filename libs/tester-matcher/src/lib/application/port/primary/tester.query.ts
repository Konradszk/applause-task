export class TesterQuery {
  public readonly name: string;

  constructor(
    public readonly score: number,
    firstName: string,
    lastName: string
  ) {
    this.name = `${firstName} ${lastName}`;
  }

}
