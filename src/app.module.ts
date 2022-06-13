import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dbUser:@1q2w3e#@cluster0.lourp.gcp.mongodb.net/smartranking?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex: true, useFindAndModify:false, useUnifiedTopology: true }),
    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
