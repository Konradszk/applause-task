import {MigrationInterface, QueryRunner} from "typeorm";
import {readFileSync} from "fs";

export class LoadDataMigration implements MigrationInterface {
  name = 'migrate1656675152555'

  async up(queryRunner: QueryRunner): Promise<any> {
    const deviceData = this._loadFile('data/devices.csv');
    await this._loadDevices(deviceData, queryRunner);
    const testersData = this._loadFile('data/testers.csv');
    await this._loadTesters(testersData, queryRunner);
    const bugsData = this._loadFile('data/bugs.csv');
    await this._loadBugs(bugsData, queryRunner);
    const testerDeviceData = this._loadFile('data/tester_device.csv')
    await this._loadTesterDevice(testerDeviceData, queryRunner);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.clearTable('testers_devices_devices')
    await queryRunner.clearTable('bugs')
    await queryRunner.clearTable('testers')
    await queryRunner.clearTable('devices')
  }

  private _loadFile(filename: string) {
      const cvsFile = readFileSync(filename);
      return  cvsFile.toString();
  }
  private async _loadDevices(data: string, queryRunner: QueryRunner){
    const splitedRowsData = data.split(/\r\r\r\n/).map(row => row.split(','));
    splitedRowsData.shift();
    const parsedData = splitedRowsData.map(([id, desc]) => {
      return [+this._removeQuotes(id), this._removeQuotes(desc)];
    });
    await parsedData.forEach(([id, desc]) =>
       queryRunner.query(`
      INSERT INTO \`devices\` (\`deviceId\`, \`description\`)
      VALUES (${id}, "${desc}")
    `))
  }

  private _removeQuotes(value: string): string {
    return value?.replace('"', '')?.replace('"', '')
  }

  private async _loadTesters(data: string, queryRunner: QueryRunner) {
    const parsedData = data.split(/\r\r\r\n/).map(row => row.split(',')).map(
      ([id, name, surname, country, timeStamp]) => [+this._removeQuotes(id), this._removeQuotes(name), this._removeQuotes(surname), this._removeQuotes(country), this._removeQuotes(timeStamp)]);
    parsedData.shift();
    await parsedData.forEach(([id, name, surname, country, timeStamp]) => queryRunner.query(`
    INSERT INTO \`testers\` (\`testerId\`, \`firstName\`, \`lastName\`,\`country\`,\`lastLogin\`)
      VALUES (${id}, "${name}", "${surname}", "${country}", "${timeStamp}")
    `))
  }

  private async _loadBugs(data: string, queryRunner: QueryRunner) {
    const parsedData = data.split(/\r\r\r\n/).map(row => row.split(',')).map(
      ([id, deviceId, testerId]) => [+this._removeQuotes(id), +this._removeQuotes(deviceId), +this._removeQuotes(testerId)]
    );
    parsedData.shift();
    parsedData.pop();
    await parsedData.forEach(([id, deviceId, testerId]) => queryRunner.query(`
      INSERT INTO \`bugs\` (\`bugId\`,\`deviceDeviceId\`, \`testerTesterId\`)
      VALUES (${id}, ${deviceId}, ${testerId})
    `))
  }

  private async _loadTesterDevice(data: string, queryRunner: QueryRunner) {
    const parsedData = data.split(/\r\r\r\n/).map(row => row.split(',')).map(
      ([testerId, deviceId ]) => [+this._removeQuotes(testerId), +this._removeQuotes(deviceId)]
    );
    parsedData.shift();
    await parsedData.forEach( ([testerId, deviceId ]) => queryRunner.query(`
     INSERT INTO \`testers_devices_devices\` (\`testersTesterId\`,\`devicesDeviceId\`)
      VALUES (${testerId}, ${deviceId} )
    `))
  }
}
