"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1757018321430 = void 0;
class Migration1757018321430 {
    name = 'Migration1757018321430';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`avatar\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`telegram_handle\` \`telegram_handle\` longtext NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`telegram_handle\` \`telegram_handle\` longtext NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar\``);
    }
}
exports.Migration1757018321430 = Migration1757018321430;
//# sourceMappingURL=1757018321430-migration.js.map