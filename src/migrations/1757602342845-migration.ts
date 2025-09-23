import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1757602342845 implements MigrationInterface {
    name = 'Migration1757602342845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order_resize_extras\` (\`id\` varchar(36) NOT NULL, \`design_type\` text NOT NULL, \`unit\` enum ('mm', 'cm', 'inch', 'px', 'ft') NOT NULL, \`design_page\` int NOT NULL, \`amount\` bigint NOT NULL, \`page\` int NOT NULL, \`width\` int NOT NULL, \`height\` int NOT NULL, \`orderId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_brief_attachments\` (\`id\` varchar(36) NOT NULL, \`type\` enum ('IMAGE', 'AUDIO', 'VIDEO', 'DOCUMENT') NOT NULL, \`name\` text NOT NULL DEFAULT '', \`extension\` text NOT NULL DEFAULT 'png', \`file_size\` int NOT NULL, \`audio_length\` int NULL, \`file_url\` text NOT NULL, \`orderId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_pages\` (\`id\` varchar(36) NOT NULL, \`is_default\` tinyint NOT NULL DEFAULT 0, \`design_type\` text NOT NULL, \`paper_size\` text NOT NULL, \`paper_type\` text NOT NULL, \`unit\` enum ('mm', 'cm', 'inch', 'px', 'ft') NOT NULL, \`orientation\` enum ('PORTRAIT', 'LANDSCAPE') NOT NULL, \`page_number\` bigint NOT NULL, \`width\` bigint NOT NULL, \`height\` bigint NOT NULL, \`orderId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_submissions\` (\`id\` varchar(36) NOT NULL, \`type\` enum ('ORDER', 'EDIT') NOT NULL DEFAULT 'ORDER', \`page_type\` enum ('PAGE', 'RESIZE') NOT NULL DEFAULT 'PAGE', \`design_page\` bigint NULL, \`export_format\` enum ('PNG', 'JPEG', 'PDF', 'SVG', 'AI') NOT NULL, \`page\` bigint NOT NULL, \`file_url\` longtext NOT NULL, \`file_name\` longtext NOT NULL, \`file_size\` bigint NULL, \`file_type\` enum ('IMAGE', 'AUDIO', 'VIDEO', 'DOCUMENT') NOT NULL, \`file_extension\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`orderId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` varchar(36) NOT NULL, \`design_class\` enum ('A1', 'A', 'B', 'C', 'D') NOT NULL DEFAULT 'A', \`order_id\` longtext NOT NULL, \`design_brief\` longtext NOT NULL, \`design_package\` enum ('BASIC', 'STANDARD', 'PREMIUM') NOT NULL DEFAULT 'BASIC', \`type\` enum ('ONE_OFF', 'CUSTOMIZED') NOT NULL DEFAULT 'ONE_OFF', \`design_type\` longtext NOT NULL, \`design_assets\` json NULL, \`design_preferences\` json NULL, \`design_samples\` json NULL, \`status\` enum ('DRAFT', 'PENDING', 'COMPLETED', 'IN_PROGRESS', 'EDIT') NOT NULL DEFAULT 'DRAFT', \`amount\` bigint NOT NULL, \`confidential\` tinyint NOT NULL DEFAULT 0, \`quick_delivery\` tinyint NOT NULL DEFAULT 0, \`delivery_date\` date NULL, \`started_at\` date NULL, \`commenced_at\` date NULL, \`completed_at\` date NULL, \`last_edited_at\` date NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_cad55b3cb25b38be94d2ce831d\` (\`order_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`telegram_handle\` \`telegram_handle\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`order_resize_extras\` ADD CONSTRAINT \`FK_d5548982ea4b9918af86b32496e\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_brief_attachments\` ADD CONSTRAINT \`FK_4e5dc810a0b73080f5786e9ce4d\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_pages\` ADD CONSTRAINT \`FK_a84c556870d8dac48c3a725bec3\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_submissions\` ADD CONSTRAINT \`FK_68be5262b7406640f1be5115a77\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_submissions\` DROP FOREIGN KEY \`FK_68be5262b7406640f1be5115a77\``);
        await queryRunner.query(`ALTER TABLE \`order_pages\` DROP FOREIGN KEY \`FK_a84c556870d8dac48c3a725bec3\``);
        await queryRunner.query(`ALTER TABLE \`order_brief_attachments\` DROP FOREIGN KEY \`FK_4e5dc810a0b73080f5786e9ce4d\``);
        await queryRunner.query(`ALTER TABLE \`order_resize_extras\` DROP FOREIGN KEY \`FK_d5548982ea4b9918af86b32496e\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`telegram_handle\` \`telegram_handle\` longtext NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` longtext NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_cad55b3cb25b38be94d2ce831d\` ON \`orders\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`order_submissions\``);
        await queryRunner.query(`DROP TABLE \`order_pages\``);
        await queryRunner.query(`DROP TABLE \`order_brief_attachments\``);
        await queryRunner.query(`DROP TABLE \`order_resize_extras\``);
    }

}
