import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class JogadoresService {

    
    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    private readonly logger = new Logger(JogadoresService.name);

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador>{
        
        const {email} = criarJogadorDto;

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(jogadorEncontrado){
            throw new BadRequestException(`Jogador com e-mail já cadastrado`)
        }
        
        
        const jogadorCriado = new this.jogadorModel(criarJogadorDto)

        return await jogadorCriado.save();
        
    }

    async atualizarJogador(_id: string,criarJogadorDto: CriarJogadorDto): Promise<void>{
        
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com o id ${_id} não encontrado`)
        }

        await this.jogadorModel.findOneAndUpdate({_id},{$set: criarJogadorDto}).exec();

    }


    async consultarTodosJogadores(): Promise<Jogador[]>{

        return await this.jogadorModel.find().exec();
    }

    async deletarJogador(email): Promise<any>{

      return await this.jogadorModel.deleteOne({email}).exec();

    }

    async consultarJogadorPorEmail(email: string): Promise<Jogador>{

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com o email ${email} não encontrado`);
        }

        return jogadorEncontrado
        
       


    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador>{

        const jogadorCriado = new this.jogadorModel(criarJogadorDto)

        return await jogadorCriado.save();


    }


    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {

       return await this.jogadorModel.findOneAndUpdate({email: criarJogadorDto.email},{$set: criarJogadorDto}).exec();

    }

    

    

}
