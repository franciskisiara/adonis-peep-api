import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KnowlegeScaleValidator from 'App/Validators/KnowlegeScaleValidator'

export default class KnowlegeScalesController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(KnowlegeScaleValidator)

    response.created({})
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
