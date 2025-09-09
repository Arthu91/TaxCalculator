import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { TaxController } from './tax/tax.controller';
import { TaxService } from './tax/tax.service';
import { TaxModule } from './tax/tax.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Arran30', 
      database: 'test2',          
      autoLoadEntities: true,     
      synchronize: true,         
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
    }),

    UsersModule,
    GroupsModule,
    TaxModule,
  ],
  controllers: [AppController, TaxController],
  providers: [AppService, TaxService],
})
export class AppModule {}