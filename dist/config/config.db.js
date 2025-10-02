"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_env_1 = require("./config.env");
const typeorm_1 = require("typeorm");
function getDBConfig() {
    return {
        database: config_env_1.ENVIRONMENT.DB.NAME,
        password: config_env_1.ENVIRONMENT.DB.PASSWORD,
        username: config_env_1.ENVIRONMENT.DB.USERNAME,
        host: config_env_1.ENVIRONMENT.DB.HOST,
        port: config_env_1.ENVIRONMENT.DB.PORT,
    };
}
function getTypeOrmConfig() {
    const dbConfig = {
        ...getDBConfig(),
        logging: false,
        type: "mysql",
        entities: [__dirname + '/../**/entity.*.{js,ts}'],
        migrations: [__dirname + '/../migrations/*.{js,ts}'],
        synchronize: false,
    };
    return dbConfig;
}
const AppDataSource = new typeorm_1.DataSource({
    ...getTypeOrmConfig()
});
exports.default = AppDataSource;
//# sourceMappingURL=config.db.js.map