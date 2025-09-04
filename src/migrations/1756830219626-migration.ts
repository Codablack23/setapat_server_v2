import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1756830219626 implements MigrationInterface {
    name = 'Migration1756830219626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`firstname\` longtext NOT NULL, \`lastname\` longtext NOT NULL, \`email\` longtext NOT NULL, \`user_type\` enum ('USER', 'DESIGNER', 'BILLERS', 'ADMIN') NOT NULL DEFAULT 'USER', \`password\` longtext NOT NULL, \`phone_number\` longtext NOT NULL, \`telegram_handle\` longtext NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
