import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn} from "typeorm";
import {BugsEntity} from "./bugs.entity";
import {DevicesEntity} from "./devices.entity";

@Entity({name: 'testers'})
export class TestersEntity {

  @PrimaryColumn({type: 'bigint'})
  testerId: number;

  @Column({nullable: false, type: 'varchar', length: 32})
  firstName: string;

  @Column({nullable: false, type: "varchar", length: 32})
  lastName: string;

  @Column({nullable: false, type: 'varchar', length: 2})
  country: string;

  @Column({nullable: true, type: 'timestamp'})
  lastLogin: Date;

  @OneToMany(() => BugsEntity, bug => bug.tester)
  bugs: BugsEntity[];

  @ManyToMany(() => DevicesEntity)
  @JoinTable()
  devices: DevicesEntity[]
}
