import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3308,
  username: 'nestjs_user',
  password: 'nestjs_password',
  database: 'nestjs_db',
  autoLoadModels: true,
  synchronize: true,
};
