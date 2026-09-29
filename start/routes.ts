import Route from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AuthController from '#controllers/auth_controller'
import UserController from '#controllers/users_controller'

Route.get('/', async () => {
    return { hello: 'world' }
})

//login e logout
Route.group(() => {
    Route.post('/login', [AuthController, 'login'])
    Route.post('/logout', [AuthController, 'logout'])
})

//usuarios
Route.group(() => {
    Route.post('/create/usuarios', [UserController, 'createUser'])
    Route.patch('/update/usuarios', [UserController, 'updateUser']).use(middleware.auth())
    Route.get('/info/usuarios', [UserController, 'userInfo']).use(middleware.auth())
})
