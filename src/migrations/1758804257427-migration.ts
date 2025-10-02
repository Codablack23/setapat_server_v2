import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1758804257427 implements MigrationInterface {
    name = 'Migration1758804257427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`designer_profiles\` (\`id\` varchar(36) NOT NULL, \`role\` enum ('DESIGNER', 'SUPER_DESIGNER', 'SUPERVISOR') NOT NULL DEFAULT 'DESIGNER', \`rank\` enum ('JUNIOR', 'MID', 'SENIOR') NOT NULL DEFAULT 'JUNIOR', \`designer_specifications\` json NOT NULL, \`working_days\` json NOT NULL, \`resume_link\` text NOT NULL, \`portfolio_link\` text NOT NULL, \`opens_at\` time NOT NULL, \`closes_at\` time NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`supervisorId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_assignments\` (\`id\` varchar(36) NOT NULL, \`status\` enum ('PENDING', 'ACCEPTED', 'WITHDRAWN') NOT NULL DEFAULT 'PENDING', \`withdrawn_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`orderId\` varchar(36) NULL, \`designerId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`designer_applications\` (\`id\` varchar(36) NOT NULL, \`firstname\` longtext NOT NULL, \`lastname\` longtext NOT NULL, \`email\` longtext NOT NULL, \`gender\` enum ('MALE', 'FEMALE') NULL, \`phone_number\` longtext NOT NULL, \`avatar\` longtext NULL, \`telegram_handle\` longtext NULL, \`rank\` enum ('JUNIOR', 'MID', 'SENIOR') NOT NULL DEFAULT 'JUNIOR', \`designer_specifications\` json NOT NULL, \`resume_link\` text NOT NULL, \`portfolio_link\` text NOT NULL, \`working_days\` json NOT NULL, \`opens_at\` time NOT NULL, \`closes_at\` time NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order_resize_extras\` DROP FOREIGN KEY \`FK_d5548982ea4b9918af86b32496e\``);
        await queryRunner.query(`ALTER TABLE \`order_resize_extras\` CHANGE \`orderId\` \`orderId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_brief_attachments\` DROP FOREIGN KEY \`FK_4e5dc810a0b73080f5786e9ce4d\``);
        await queryRunner.query(`ALTER TABLE \`order_brief_attachments\` CHANGE \`audio_length\` \`audio_length\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_brief_attachments\` CHANGE \`orderId\` \`orderId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_pages\` DROP FOREIGN KEY \`FK_a84c556870d8dac48c3a725bec3\``);
        await queryRunner.query(`ALTER TABLE \`order_pages\` CHANGE \`orderId\` \`orderId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_submissions\` DROP FOREIGN KEY \`FK_68be5262b7406640f1be5115a77\``);
        await queryRunner.query(`ALTER TABLE \`order_submissions\` CHANGE \`design_page\` \`design_page\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`order_submissions\` CHANGE \`file_size\` \`file_size\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`order_submissions\` CHANGE \`orderId\` \`orderId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_692a909ee0fa9383e7859f9b406\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_fe1b8ba550e73f84ff228401aab\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`orderId\` \`orderId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`design_assets\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`design_assets\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`design_preferences\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`design_preferences\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`design_samples\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`design_samples\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`delivery_date\` \`delivery_date\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`started_at\` \`started_at\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`commenced_at\` \`commenced_at\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`completed_at\` \`completed_at\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`last_edited_at\` \`last_edited_at\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('MALE', 'FEMALE') NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`reason\` \`reason\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`telegram_handle\` \`telegram_handle\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`order_resize_extras\` ADD CONSTRAINT \`FK_d5548982ea4b9918af86b32496e\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_brief_attachments\` ADD CONSTRAINT \`FK_4e5dc810a0b73080f5786e9ce4d\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_pages\` ADD CONSTRAINT \`FK_a84c556870d8dac48c3a725bec3\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_submissions\` ADD CONSTRAINT \`FK_68be5262b7406640f1be5115a77\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_692a909ee0fa9383e7859f9b406\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_fe1b8ba550e73f84ff228401aab\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`designer_profiles\` ADD CONSTRAINT \`FK_8169e8caaff9118647202e0a122\` FOREIGN KEY (\`supervisorId\`) REFERENCES \`designer_profiles\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_assignments\` ADD CONSTRAINT \`FK_be2c5ad5e40bd737781a9b6c2c4\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_assignments\` ADD CONSTRAINT \`FK_714cf1a4b607de57389f65753fb\` FOREIGN KEY (\`designerId\`) REFERENCES \`designer_profiles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``);
        await queryRunner.query(`ALTER TABLE \`order_assignments\` DROP FOREIGN KEY \`FK_714cf1a4b607de57389f65753fb\``);
        await queryRunner.query(`ALTER TABLE \`order_assignments\` DROP FOREIGN KEY \`FK_be2c5ad5e40bd737781a9b6c2c4\``);
        await queryRunner.query(`ALTER TABLE \`designer_profiles\` DROP FOREIGN KEY \`FK_8169e8caaff9118647202e0a122\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_fe1b8ba550e73f84ff228401aab\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_692a909ee0fa9383e7859f9b406\``);
        await queryRunner.query(`ALTER TABLE \`order_submissions\` DROP FOREIGN KEY \`FK_68be5262b7406640f1be5115a77\``);
        await queryRunner.query(`ALTER TABLE \`order_pages\` DROP FOREIGN KEY \`FK_a84c556870d8dac48c3a725bec3\``);
        await queryRunner.query(`ALTER TABLE \`order_brief_attachments\` DROP FOREIGN KEY \`FK_4e5dc810a0b73080f5786e9ce4d\``);
        await queryRunner.query(`ALTER TABLE \`order_resize_extras\` DROP FOREIGN KEY \`FK_d5548982ea4b9918af86b32496e\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`telegram_handle\` \`telegram_handle\` longtext NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` longtext NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`reason\` \`reason\` longtext NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('USER', 'DESIGNER', 'BILLERS', 'ADMIN') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`last_edited_at\` \`last_edited_at\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`completed_at\` \`completed_at\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`commenced_at\` \`commenced_at\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`started_at\` \`started_at\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`delivery_date\` \`delivery_date\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`design_samples\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`design_samples\` longtext CHARACTER SET "utf8mb4" COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`design_preferences\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`design_preferences\` longtext CHARACTER SET "utf8mb4" COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`design_assets\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`design_assets\` longtext CHARACTER SET "utf8mb4" COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`orderId\` \`orderId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_fe1b8ba550e73f84ff228401aab\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_692a909ee0fa9383e7859f9b406\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_submissions\` CHANGE \`orderId\` \`orderId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_submissions\` CHANGE \`file_size\` \`file_size\` bigint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_submissions\` CHANGE \`design_page\` \`design_page\` bigint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_submissions\` ADD CONSTRAINT \`FK_68be5262b7406640f1be5115a77\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_pages\` CHANGE \`orderId\` \`orderId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_pages\` ADD CONSTRAINT \`FK_a84c556870d8dac48c3a725bec3\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_brief_attachments\` CHANGE \`orderId\` \`orderId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_brief_attachments\` CHANGE \`audio_length\` \`audio_length\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_brief_attachments\` ADD CONSTRAINT \`FK_4e5dc810a0b73080f5786e9ce4d\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_resize_extras\` CHANGE \`orderId\` \`orderId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_resize_extras\` ADD CONSTRAINT \`FK_d5548982ea4b9918af86b32496e\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`designer_applications\``);
        await queryRunner.query(`DROP TABLE \`order_assignments\``);
        await queryRunner.query(`DROP TABLE \`designer_profiles\``);
    }

}
