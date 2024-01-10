import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'], // specify the path to your environment file
      isGlobal: true, // make the configuration global
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
