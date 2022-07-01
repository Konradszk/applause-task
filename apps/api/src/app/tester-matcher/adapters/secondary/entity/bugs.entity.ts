import {Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {DevicesEntity} from "./devices.entity";
import {TestersEntity} from "./testers.entity";

@Entity({name: 'bugs'})
export class BugsEntity {
  @PrimaryColumn({type: 'bigint'})
  bugId: number;

  @ManyToOne(() => DevicesEntity, device => device.bugs, {nullable: false})
  device: DevicesEntity;

  @ManyToOne(() => TestersEntity, tester => tester.bugs, {nullable: false})
  tester: TestersEntity;
}
