import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ProdutoImagem from '#models/produto_imagens'

export default class ProdutoImagemSeeder extends BaseSeeder {
    public async run() {
        await ProdutoImagem.createMany([
            // Produto 1 - 3 imagens
            {
                produtoId: 1,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766853096/produtos/produtos/1_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 1,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766853097/produtos/produtos/1_2.jpg', 
                ordem: 2
            },
            {
                produtoId: 1,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766853098/produtos/produtos/1_3.jpg', 
                ordem: 3
            },

            // Produto 2 - 1 imagem
            {
                produtoId: 2,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766853175/produtos/produtos/2_1.webp', 
                ordem: 1
            },

            // Produto 3 - 5 imagens
            {
                produtoId: 3,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766848529/produtos/produtos/3_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 3,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766848530/produtos/produtos/3_2.jpg', 
                ordem: 2
            },
            {
                produtoId: 3,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766848531/produtos/produtos/3_3.jpg', 
                ordem: 3
            },
            {
                produtoId: 3,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766848532/produtos/produtos/3_4.jpg', 
                ordem: 4
            },
            {
                produtoId: 3,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766848533/produtos/produtos/3_5.jpg', 
                ordem: 5
            },

            // Produto 4 - 2 imagens
            {
                produtoId: 4,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766848731/produtos/produtos/4_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 4,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766848733/produtos/produtos/4_2.jpg', 
                ordem: 2
            },
            {
                produtoId: 4,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766848735/produtos/produtos/4_3.webp', 
                ordem: 3
            },
            {
                produtoId: 4,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766848737/produtos/produtos/4_4.webp', 
                ordem: 4
            },
            {
                produtoId: 4,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766848738/produtos/produtos/4_5.jpg', 
                ordem: 5
            },

            // Produto 5 - 4 imagens
            {
                produtoId: 5,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766849275/produtos/produtos/5_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 5,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766849277/produtos/produtos/5_2.jpg', 
                ordem: 2
            },
            {
                produtoId: 5,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766849280/produtos/produtos/5_3.jpg', 
                ordem: 3
            },
            {
                produtoId: 5,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766849282/produtos/produtos/5_4.jpg', 
                ordem: 4
            },

            // Produto 6 - 1 imagem
            {
                produtoId: 6,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766849385/produtos/produtos/6_1.jpg', 
                ordem: 1
            },

            // Produto 7 - 3 imagens
            {
                produtoId: 7,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766849530/produtos/produtos/7_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 7,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766849532/produtos/produtos/7_2.jpg', 
                ordem: 2
            },
            {
                produtoId: 7,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766849534/produtos/produtos/7_3.jpg', 
                ordem: 3
            },

            // Produto 8 - 2 imagens
            {
                produtoId: 8,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766849712/produtos/produtos/8_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 8,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766849714/produtos/produtos/8_2.jpg', 
                ordem: 2
            },

            // Produto 9 - 4 imagens
            {
                produtoId: 9,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766852330/produtos/produtos/9_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 9,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766852332/produtos/produtos/9_2.jpg', 
                ordem: 2
            },
            {
                produtoId: 9,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766852333/produtos/produtos/9_3.jpg', 
                ordem: 3
            },
            {
                produtoId: 9,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766852334/produtos/produtos/9_4.jpg', 
                ordem: 4
            },

            // Produto 10 - 5 imagens
            {
                produtoId: 10,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766852535/produtos/produtos/10_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 10,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766852536/produtos/produtos/10_2.jpg', 
                ordem: 2
            },
            {
                produtoId: 10,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766852537/produtos/produtos/10_3.jpg', 
                ordem: 3
            },
            {
                produtoId: 10,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766852538/produtos/produtos/10_4.jpg', 
                ordem: 4
            },
            {
                produtoId: 10,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766852539/produtos/produtos/10_5.jpg', 
                ordem: 5
            },

            // Produto 11 - 1 imagem
            {
                produtoId: 11,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766853000/produtos/produtos/11_1.jpg', 
                ordem: 1
            },

            // Produto 12 - 2 imagens
            {
                produtoId: 12,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766853423/produtos/produtos/12_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 12,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766853425/produtos/produtos/12_2.jpg', 
                ordem: 2
            },

            // Produto 13 - 3 imagens
            {
                produtoId: 13,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766853577/produtos/produtos/13_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 13,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766853579/produtos/produtos/13_2.jpg', 
                ordem: 2
            },
            {
                produtoId: 13,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766853580/produtos/produtos/13_3.jpg', 
                ordem: 3
            },

            // Produto 14 - 4 imagens
            {
                produtoId: 14,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766853784/produtos/produtos/14_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 14,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766853785/produtos/produtos/14_2.jpg', 
                ordem: 2
            },
            {
                produtoId: 14,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766853786/produtos/produtos/14_3.jpg', 
                ordem: 3
            },
            {
                produtoId: 14,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766853787/produtos/produtos/14_4.jpg', 
                ordem: 4
            },

            // Produto 15 - 5 imagens
            {
                produtoId: 15,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854042/produtos/produtos/15_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 15,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854043/produtos/produtos/15_2.jpg', 
                ordem: 2
            },
            {
                produtoId: 15,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854044/produtos/produtos/15_3.jpg', 
                ordem: 3
            },

            // Produto 16 - 2 imagens
            {
                produtoId: 16,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854160/produtos/produtos/16_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 16,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854161/produtos/produtos/16_2.jpg', 
                ordem: 2
            },

            // Produto 17 - 3 imagens
            {
                produtoId: 17,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854284/produtos/produtos/17_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 17,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854285/produtos/produtos/17_2.jpg', 
                ordem: 2
            },
            {
                produtoId: 17,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854286/produtos/produtos/17_3.jpg', 
                ordem: 3
            },

            // Produto 18 - 1 imagem
            {
                produtoId: 18,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854457/produtos/produtos/18_1.png', 
                ordem: 1
            },

            // Produto 19 - 4 imagens
            {
                produtoId: 19,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854568/produtos/produtos/19_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 19,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854569/produtos/produtos/19_2.jpg', 
                ordem: 2
            },
            {
                produtoId: 19,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854570/produtos/produtos/19_3.jpg', 
                ordem: 3
            },
            {
                produtoId: 19,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854571/produtos/produtos/19_4.jpg',
                ordem: 4
            },

            // Produto 20 - 5 imagens
            {
                produtoId: 20,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854830/produtos/produtos/20_1.jpg', 
                ordem: 1
            },
            {
                produtoId: 20,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854832/produtos/produtos/20_2.jpg', 
                ordem: 2
            },
            {
                produtoId: 20,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854833/produtos/produtos/20_3.jpg', 
                ordem: 3
            },
            {
                produtoId: 20,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854834/produtos/produtos/20_4.jpg', 
                ordem: 4
            },
            {
                produtoId: 20,
                imagemUrl: 'https://res.cloudinary.com/dapcd8spu/image/upload/v1766854836/produtos/produtos/20_5.jpg', 
                ordem: 5
            },
        ])
    }
}