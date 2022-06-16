import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_USER,
    { useNewUrlParser: true, useUnifiedTopology: true}),

    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
