export class SearchTestersCommand {
  constructor(
    public readonly deviceId: string[],
    public readonly countryId: string[]
  ) {
  }
}
