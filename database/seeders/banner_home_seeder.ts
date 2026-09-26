import { BaseSeeder } from '@adonisjs/lucid/seeders'
import BannerHome from '#models/banner_home'
import { DateTime } from 'luxon'

export default class BannerHomeSeeder extends BaseSeeder {
  public async run() {
    const hoje = DateTime.local()

    await BannerHome.createMany([
      {
        titulo: 'Promoção Especial',
        subtitulo: 'Descontos por tempo limitado',
        imagem: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1200&h=400&fit=crop',
        link: 'https://seusite.com/promocao',
        ordem: 1,
        corTexto: '#FFFFFF',
        corFundo: '#FF6600',
        dtInicio: hoje.minus({ days: 5 }),
        dtFim: hoje.plus({ days: 5 }),
      },
      {
        titulo: 'Grandes Ofertas',
        subtitulo: 'Aproveite agora',
        imagem: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&h=400&fit=crop',
        link: 'https://seusite.com/ofertas',
        ordem: 2,
        corTexto: '#000000',
        corFundo: '#FFD700',
        dtInicio: hoje.minus({ days: 2 }),
        dtFim: hoje.plus({ days: 10 }),
      },
      {
        titulo: 'Novidades da Semana',
        subtitulo: 'Confira os lançamentos',
        imagem: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200&h=400&fit=crop',
        link: 'https://seusite.com/novidades',
        ordem: 3,
        corTexto: '#FFFFFF',
        corFundo: '#008000',
        dtInicio: hoje.minus({ days: 1 }),
        dtFim: hoje.plus({ days: 7 }),
      },
      {
        titulo: 'Super Liquidação',
        subtitulo: 'Últimas unidades',
        imagem: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=400&fit=crop',
        link: 'https://seusite.com/liquidacao',
        ordem: 4,
        corTexto: '#FFFFFF',
        corFundo: '#CC0000',
        dtInicio: hoje.minus({ days: 3 }),
        dtFim: hoje.plus({ days: 3 }),
      },
      {
        titulo: 'Coleção 2026',
        subtitulo: 'Tendências e novidades',
        imagem: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&h=400&fit=crop',
        link: 'https://seusite.com/colecao',
        ordem: 5,
        corTexto: '#FFFFFF',
        corFundo: '#0000FF',
        dtInicio: hoje.minus({ days: 4 }),
        dtFim: hoje.plus({ days: 15 }),
      },

      {
        titulo: 'Black Friday',
        subtitulo: 'Mega descontos',
        imagem: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=1200&h=400&fit=crop',
        link: 'https://seusite.com/blackfriday',
        ordem: 1,
        corTexto: '#FFFFFF',
        corFundo: '#000000',
        dtInicio: hoje.minus({ days: 60 }),
        dtFim: hoje.minus({ days: 30 }),
      },
      {
        titulo: 'Natal Especial',
        subtitulo: 'Ofertas natalinas',
        imagem: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1200&h=400&fit=crop',
        link: 'https://seusite.com/natal',
        ordem: 2,
        corTexto: '#FF0000',
        corFundo: '#FFFFFF',
        dtInicio: hoje.minus({ days: 45 }),
        dtFim: hoje.minus({ days: 20 }),
      },

      {
        titulo: 'Campanha Especial',
        subtitulo: 'Em breve',
        imagem: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=400&fit=crop',
        link: 'https://seusite.com/campanha',
        ordem: 3,
        corTexto: '#FFFFFF',
        corFundo: '#800080',
        dtInicio: hoje.plus({ days: 10 }),
        dtFim: hoje.plus({ days: 20 }),
      },
      {
        titulo: 'Aniversário da Loja',
        subtitulo: 'Descontos exclusivos',
        imagem: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=1200&h=400&fit=crop',
        link: 'https://seusite.com/aniversario',
        ordem: 4,
        corTexto: '#000000',
        corFundo: '#FFA500',
        dtInicio: hoje.plus({ days: 15 }),
        dtFim: hoje.plus({ days: 25 }),
      },
      {
        titulo: 'Verão 2026',
        subtitulo: 'Prepare-se',
        imagem: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&h=400&fit=crop',
        link: 'https://seusite.com/verao',
        ordem: 5,
        corTexto: '#FFFFFF',
        corFundo: '#00CED1',
        dtInicio: hoje.plus({ days: 30 }),
        dtFim: hoje.plus({ days: 45 }),
      },
    ])
  }
}