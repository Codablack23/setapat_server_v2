"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1756830219626 = void 0;
class Migration1756830219626 {
    name = 'Migration1756830219626';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`firstname\` longtext NOT NULL, \`lastname\` longtext NOT NULL, \`email\` longtext NOT NULL, \`user_type\` enum ('USER', 'DESIGNER', 'BILLERS', 'ADMIN') NOT NULL DEFAULT 'USER', \`password\` longtext NOT NULL, \`phone_number\` longtext NOT NULL, \`telegram_handle\` longtext NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`users\``);
    }
}
exports.Migration1756830219626 = Migration1756830219626;
//# sourceMappingURL=1756830219626-migration.js.map