import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid'
@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];

    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void>{
        
        const {email} = criarJogadorDto;

        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email);

        if(jogadorEncontrado){
            await this.atualizar(jogadorEncontrado,criarJogadorDto);
        }else{
            await this.criar(criarJogadorDto);
        }

      

    }

    async consultarTodosJogadores(): Promise<Jogador[]>{

        return await this.jogadores;
    }

    private criar(CriarJogadorDto: CriarJogadorDto): void{

        const {email, nome,telefoneCelular} = CriarJogadorDto;

        const jogador: Jogador = {            
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com/foto123.jpg',
        }

        this.logger.log(`Criando ou atualizando o jogador ${JSON.stringify(jogador)}`);

        this.jogadores.push(jogador);

    }


    private atualizar(jogadorEncontrado:Jogador,criarJogadorDto: CriarJogadorDto): void {

        const {nome} = criarJogadorDto;

        jogadorEncontrado.nome = nome;
        

        this.logger.log(`Atualizando o jogador ${JSON.stringify(jogadorEncontrado)}`);

    }

    

}
