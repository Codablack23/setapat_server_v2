import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1757018321430 implements MigrationInterface {
    name = 'Migration1757018321430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`avatar\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`telegram_handle\` \`telegram_handle\` longtext NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`telegram_handle\` \`telegram_handle\` longtext NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar\``);
    }

}
