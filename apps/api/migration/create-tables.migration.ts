import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTablesMigration implements MigrationInterface {
    name = 'migrate1656675152252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`devices\` (\`deviceId\` bigint NOT NULL, \`description\` varchar(32) NOT NULL, PRIMARY KEY (\`deviceId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`testers\` (\`testerId\` bigint NOT NULL, \`firstName\` varchar(32) NOT NULL, \`lastName\` varchar(32) NOT NULL, \`country\` varchar(2) NOT NULL, \`lastLogin\` timestamp NULL, PRIMARY KEY (\`testerId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bugs\` (\`bugId\` bigint NOT NULL, \`deviceDeviceId\` bigint NOT NULL, \`testerTesterId\` bigint NOT NULL, PRIMARY KEY (\`bugId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`testers_devices_devices\` (\`testersTesterId\` bigint NOT NULL, \`devicesDeviceId\` bigint NOT NULL, INDEX \`IDX_e014d439d5ec96e3a2f7e5a1a5\` (\`testersTesterId\`), INDEX \`IDX_ac40e212dbdec13c3d47e13afa\` (\`devicesDeviceId\`), PRIMARY KEY (\`testersTesterId\`, \`devicesDeviceId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bugs\` ADD CONSTRAINT \`FK_7084a53df34d404773514b5eac2\` FOREIGN KEY (\`deviceDeviceId\`) REFERENCES \`devices\`(\`deviceId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bugs\` ADD CONSTRAINT \`FK_6b5eb618292b8c70d556c3be414\` FOREIGN KEY (\`testerTesterId\`) REFERENCES \`testers\`(\`testerId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`testers_devices_devices\` ADD CONSTRAINT \`FK_e014d439d5ec96e3a2f7e5a1a53\` FOREIGN KEY (\`testersTesterId\`) REFERENCES \`testers\`(\`testerId\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`testers_devices_devices\` ADD CONSTRAINT \`FK_ac40e212dbdec13c3d47e13afaf\` FOREIGN KEY (\`devicesDeviceId\`) REFERENCES \`devices\`(\`deviceId\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`testers_devices_devices\` DROP FOREIGN KEY \`FK_ac40e212dbdec13c3d47e13afaf\``);
        await queryRunner.query(`ALTER TABLE \`testers_devices_devices\` DROP FOREIGN KEY \`FK_e014d439d5ec96e3a2f7e5a1a53\``);
        await queryRunner.query(`ALTER TABLE \`bugs\` DROP FOREIGN KEY \`FK_6b5eb618292b8c70d556c3be414\``);
        await queryRunner.query(`ALTER TABLE \`bugs\` DROP FOREIGN KEY \`FK_7084a53df34d404773514b5eac2\``);
        await queryRunner.query(`DROP INDEX \`IDX_ac40e212dbdec13c3d47e13afa\` ON \`testers_devices_devices\``);
        await queryRunner.query(`DROP INDEX \`IDX_e014d439d5ec96e3a2f7e5a1a5\` ON \`testers_devices_devices\``);
        await queryRunner.query(`DROP TABLE \`testers_devices_devices\``);
        await queryRunner.query(`DROP TABLE \`bugs\``);
        await queryRunner.query(`DROP TABLE \`testers\``);
        await queryRunner.query(`DROP TABLE \`devices\``);
    }

}
