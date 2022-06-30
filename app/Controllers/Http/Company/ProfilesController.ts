import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreProfileValidator from 'App/Validators/StoreProfileValidator'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
  public async index({}: HttpContextContract) {}

  public async store({ i18n, params, request, response }: HttpContextContract) {
    const payload = await request.validate(StoreProfileValidator)
    const profile = await Profile.create({
      ...payload,
      company_id: params.companyId,
    })

    return response.created({
      data: profile,
      message: i18n.formatMessage('resources.persisted', {
        resource: 'Profile'
      })
    })
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
