import { pick } from 'lodash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  async register ({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)
    
    const user = await User.firstOrCreate({
      email: payload.email,
    }, pick(payload, ['email', 'password']))

    //1. register the user
    //2. add the user to the

    response.created({

    })
  }

  async login ({}: HttpContextContract) {
    
  }
}
