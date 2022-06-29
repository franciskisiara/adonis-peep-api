import { pick } from 'lodash'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/RegisterValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import Company from 'App/Models/Company'
import User from 'App/Models/User'
import AccountGroup from 'App/Models/AccountGroup'

export default class AuthController {
  async register ({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = await Database.transaction(async (trx) => {
      const account = await AccountGroup.findByOrFail('name', 'company')

      const company = await Company.create({
        name: payload.company_name
      }, { client: trx })

      const user = await User.firstOrCreate({
        email: payload.email,
      }, pick(payload, ['email', 'password']), {
        client: trx
      })

      await user.related('accountGroups').sync({
        [account.id]: {
          account_group_unit_uid: company.id
        }
      }, false)

      return user
    })

    const token = await auth.use('api').generate(user, {
      expiresIn: '30mins'
    })

    return response.created({
      data: token
    })
  }

  async login ({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        email: schema.string({}, [
          rules.trim(),
          rules.email()
        ]),
        password: schema.string()
      })
    })

    try {
      const token = await auth.use('api').attempt(payload.email, payload.password, {
        expiresIn: '30mins'
      })
      return response.ok({
        data: token
      })
    } catch {
      return response.unauthorized({
        message: 'Invalid credentials'
      })
    }
  }
}
