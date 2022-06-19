import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {

    constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
                                          private readonly jogadoresService: JogadoresService
                                          ){}

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria>{

        const {categoria} = criarCategoriaDto

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()

        if(categoriaEncontrada){
            throw new BadRequestException(`Categoria ${categoria} já cadastrada`)
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto)

        return await categoriaCriada.save()
    }

    async consultarTodasCategorias(): Promise<Array<Categoria>>{
        return this.categoriaModel.find().populate("jogadores").exec()
    }

    async consultaCategoriaPorId(categoria:string): Promise<Categoria>{

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()

        if(!categoriaEncontrada){
            throw new NotFoundException(`Categoria ${categoria} não encontrada`)
        }

        return categoriaEncontrada
    }

    async atualizarCategoria(atualizarCategoriaDto: AtualizarCategoriaDto, categoria:string): Promise<void>{
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()

        if(!categoriaEncontrada){
            throw new NotFoundException(`Categoria ${categoria} não encontrada`)
        }

        await this.categoriaModel.findOneAndUpdate({categoria},{$set: atualizarCategoriaDto})

    }

    async atribuirCategoriaJogador(params: string[]): Promise<void>{

        const categoria = params['categoria']
        const idJogador = params['idJogador']


        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()

        const jogadorJaCadastrado = await this.jogadoresService.consultarJogadorPorId(idJogador)

        const jogadorJaCadastradoCategoria = await this.categoriaModel.find({categoria}).where('jogadores').in(idJogador).exec()


        if(!categoriaEncontrada){
            throw new BadRequestException(`Categoria ${categoria} não cadastrada`)
        }

        categoriaEncontrada.jogadores.push(idJogador)
        await this.categoriaModel.findOneAndUpdate({categoria}, {$set: categoriaEncontrada}).exec()



    }
}
