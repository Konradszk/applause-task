import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {BugsEntity} from "./bugs.entity";

@Entity('devices')
export class DevicesEntity {
  @PrimaryColumn({type: 'bigint'})
  deviceId: number;

  @Column({type: "varchar", length: 32})
  description: string;

  @OneToMany(() => BugsEntity, bug => bug.device)
  bugs: BugsEntity[];
}
