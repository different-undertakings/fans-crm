import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3308,
  username: 'nestjs_user', // Match with MYSQL_USER in docker-compose.yml
  password: 'nestjs_password', // Match with MYSQL_PASSWORD in docker-compose.yml
  database: 'nestjs_db', // Match with MYSQL_DATABASE in docker-compose.yml
  autoLoadModels: true,
  synchronize: true,
};
