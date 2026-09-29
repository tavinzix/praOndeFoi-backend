import Users from '#models/users'
import VerificacaoEmail from '#models/verificacao_email'
import { DateTime } from 'luxon'
import mail from '@adonisjs/mail/services/main'
import env from '#start/env'

export function geraCodigoRecuperacao(tamanho = 6): string {
    const digitos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';

    for (let i = 0; i < tamanho; i++) {
        const indice = Math.floor(Math.random() * digitos.length);
        codigo += digitos[indice];
    }

    return codigo;
}

export function geraCodigoVerificacao(tamanho = 6): string {
    const digitos = '0123456789';
    let codigo = '';

    for (let i = 0; i < tamanho; i++) {
        const indice = Math.floor(Math.random() * digitos.length);
        codigo += digitos[indice];
    }

    return codigo;
}

export default class EnvioEmail {
    public static async enviarCodigoVerificacao(usuario: Users) {
        await VerificacaoEmail.query().where('user_id', usuario.id).delete()

        const codigo = geraCodigoVerificacao()
        const expiresAt = DateTime.now().plus({ minutes: 30 })

        await VerificacaoEmail.create({
            userId: usuario.id,
            codigo,
            expiresAt
        })

        await mail.send((message) => {
            message
                .to(usuario.email)
                .from(env.get('SMTP_USERNAME')!)
                .subject('Código de Verificação de Email - Iconst')
                .html(`
                    <!DOCTYPE html>
                    <html lang="pt-BR">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }
                            body {
                                font-family: 'Roboto', Arial, sans-serif;
                                line-height: 1.6;
                                color: #333;
                                background-color: #f5f5f5;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                border-radius: 8px;
                                overflow: hidden;
                                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                background: linear-gradient(135deg, #FF6B00 0%, #e55f00 100%);
                                padding: 40px 20px;
                                text-align: center;
                            }
                            .header h1 {
                                color: #ffffff;
                                font-size: 28px;
                                font-weight: 600;
                                margin-bottom: 10px;
                            }
                            .header p {
                                color: rgba(255, 255, 255, 0.9);
                                font-size: 14px;
                            }
                            .content {
                                padding: 40px 30px;
                            }
                            .greeting {
                                font-size: 16px;
                                color: #1f2937;
                                margin-bottom: 20px;
                            }
                            .greeting strong {
                                color: #FF6B00;
                            }
                            .description {
                                font-size: 14px;
                                color: #555;
                                line-height: 1.8;
                                margin-bottom: 30px;
                            }
                            .code-container {
                                background-color: #f9fafb;
                                border-left: 4px solid #FF6B00;
                                padding: 25px;
                                border-radius: 6px;
                                margin: 30px 0;
                                text-align: center;
                            }
                            .code-label {
                                font-size: 12px;
                                color: #888;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                                margin-bottom: 12px;
                                display: block;
                            }
                            .code {
                                font-family: 'Courier New', monospace;
                                font-size: 32px;
                                font-weight: bold;
                                color: #FF6B00;
                                letter-spacing: 4px;
                                tracking: wide;
                            }
                            .validity {
                                background-color: #fef3e2;
                                border: 1px solid #ffd699;
                                padding: 15px;
                                border-radius: 6px;
                                margin: 20px 0;
                                font-size: 13px;
                                color: #8b5a00;
                            }
                            .validity strong {
                                color: #FF6B00;
                            }
                            .warning {
                                font-size: 13px;
                                color: #666;
                                margin-top: 30px;
                                padding-top: 20px;
                                border-top: 1px solid #e5e7eb;
                            }
                            .footer {
                                background-color: #f9fafb;
                                padding: 30px;
                                text-align: center;
                                border-top: 1px solid #e5e7eb;
                            }
                            .footer-text {
                                font-size: 12px;
                                color: #888;
                                margin: 5px 0;
                            }
                            .footer-brand {
                                font-size: 18px;
                                font-weight: bold;
                                color: #FF6B00;
                                margin-top: 15px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Verificação de Email</h1>
                                <p>Complete a verificação da sua conta</p>
                            </div>
                            
                            <div class="content">
                                <p class="greeting">Olá, <strong>${usuario.nomeCompleto}</strong>!</p>
                                
                                <p class="description"> Obrigado por se cadastrar no <strong>ICONST</strong>!</p>
                                
                                <p class="description">
                                    Para confirmar seu email e ativar sua conta, use o código abaixo:
                                </p>
                                
                                <div class="code-container">
                                    <span class="code-label">Seu Código de Verificação</span>
                                    <div class="code">${codigo}</div>
                                </div>
                                
                                <div class="validity">
                                    <strong>Válido por 30 minutos</strong> - Este código expirará em 30 minutos. Se não usar neste período, será necessário solicitar um novo código.
                                </div>
                                
                                <p class="description">
                                    Digite este código no aplicativo ou site para verificar sua conta.
                                </p>
                                
                                <p class="warning"> Se você não criou esta conta, ignore este email.</p>
                            </div>
                            
                            <div class="footer">
                                <p class="footer-text">Precisa de ajuda?</p>
                                <p class="footer-text">Entre em contato conosco por esse email</p>
                                <div class="footer-brand">ICONST</div>
                                <p class="footer-text" style="margin-top: 20px; font-size: 11px; color: #aaa;">
                                    © 2026 ICONST. Todos os direitos reservados.
                                </p>
                            </div>
                        </div>
                    </body>
                    </html>
                `)
        })
    }

    public static async enviarCodigoRecuperacao(usuario: Users, codigo: string) {
        await mail.send((message) => {
            message
                .to(usuario.email)
                .from(env.get('SMTP_USERNAME')!)
                .subject('Recuperação de senha - Iconst')
                .html(`
                    <!DOCTYPE html>
                    <html lang="pt-BR">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }
                            body {
                                font-family: 'Roboto', Arial, sans-serif;
                                line-height: 1.6;
                                color: #333;
                                background-color: #f5f5f5;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                border-radius: 8px;
                                overflow: hidden;
                                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                background: linear-gradient(135deg, #FF6B00 0%, #e55f00 100%);
                                padding: 40px 20px;
                                text-align: center;
                            }
                            .header h1 {
                                color: #ffffff;
                                font-size: 28px;
                                font-weight: 600;
                                margin-bottom: 10px;
                            }
                            .header p {
                                color: rgba(255, 255, 255, 0.9);
                                font-size: 14px;
                            }
                            .content {
                                padding: 40px 30px;
                            }
                            .greeting {
                                font-size: 16px;
                                color: #1f2937;
                                margin-bottom: 20px;
                            }
                            .greeting strong {
                                color: #FF6B00;
                            }
                            .description {
                                font-size: 14px;
                                color: #555;
                                line-height: 1.8;
                                margin-bottom: 20px;
                            }
                            .alert-box {
                                background-color: #fef3e2;
                                border: 1px solid #ffd699;
                                border-left: 4px solid #FF6B00;
                                padding: 15px;
                                border-radius: 6px;
                                margin: 20px 0;
                                font-size: 13px;
                                color: #8b5a00;
                            }
                            .alert-box strong {
                                color: #FF6B00;
                            }
                            .code-container {
                                background-color: #f9fafb;
                                border-left: 4px solid #FF6B00;
                                padding: 25px;
                                border-radius: 6px;
                                margin: 30px 0;
                                text-align: center;
                            }
                            .code-label {
                                font-size: 12px;
                                color: #888;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                                margin-bottom: 12px;
                                display: block;
                            }
                            .code {
                                font-family: 'Courier New', monospace;
                                font-size: 32px;
                                font-weight: bold;
                                color: #FF6B00;
                                letter-spacing: 4px;
                                tracking: wide;
                            }
                            .validity {
                                background-color: #fef3e2;
                                border: 1px solid #ffd699;
                                padding: 15px;
                                border-radius: 6px;
                                margin: 20px 0;
                                font-size: 13px;
                                color: #8b5a00;
                            }
                            .validity strong {
                                color: #FF6B00;
                            }
                            .warning {
                                font-size: 13px;
                                color: #d32f2f;
                                background-color: #ffebee;
                                border: 1px solid #ffcdd2;
                                padding: 12px;
                                border-radius: 6px;
                                margin-top: 25px;
                            }
                            .footer {
                                background-color: #f9fafb;
                                padding: 30px;
                                text-align: center;
                                border-top: 1px solid #e5e7eb;
                            }
                            .footer-text {
                                font-size: 12px;
                                color: #888;
                                margin: 5px 0;
                            }
                            .footer-brand {
                                font-size: 18px;
                                font-weight: bold;
                                color: #FF6B00;
                                margin-top: 15px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Recuperação de Senha</h1>
                                <p>Redefina sua senha com segurança</p>
                            </div>
                            
                            <div class="content">
                                <p class="greeting">Olá, <strong>${usuario.nomeCompleto}</strong>!</p>
                                
                                <div class="alert-box">
                                    <strong>Segurança</strong> - Recebemos uma solicitação para recuperação de senha da sua conta no ICONST.
                                </div>
                                
                                <p class="description">
                                    Se foi você quem solicitou isso, use o código abaixo para redefinir sua senha:
                                </p>
                                
                                <div class="code-container">
                                    <span class="code-label">Seu Código de Recuperação</span>
                                    <div class="code">${codigo}</div>
                                </div>
                                
                                <div class="validity">
                                    <strong>Válido por 30 minutos</strong> - Este código expirará em 30 minutos. Após isso, será necessário solicitar um novo código.
                                </div>
                                
                                <p class="description">
                                    Digite este código no aplicativo ou site para criar uma nova senha.
                                </p>
                                
                                <div class="warning">
                                    <strong>Não compartilhe este código com ninguém!</strong> A equipe ICONST nunca pedirá seu código por email ou mensagem. Se você não solicitou esta recuperação de senha, mude sua senha imediatamente.
                                </div>
                            </div>
                            
                            <div class="footer">
                                <p class="footer-text">Precisa de ajuda?</p>
                                <p class="footer-text">Entre em contato conosco por esse email.</p>
                                <div class="footer-brand">ICONST</div>
                                <p class="footer-text" style="margin-top: 20px; font-size: 11px; color: #aaa;">
                                    © 2026 ICONST. Todos os direitos reservados.
                                </p>
                            </div>
                        </div>
                    </body>
                    </html>
                `)
        })
    }
}