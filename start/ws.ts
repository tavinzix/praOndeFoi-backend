import app from '@adonisjs/core/services/app'
import wsService from '#services/WsService'

app.ready(() => {
    wsService.boot()
})