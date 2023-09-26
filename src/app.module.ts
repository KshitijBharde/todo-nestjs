import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [TaskModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
