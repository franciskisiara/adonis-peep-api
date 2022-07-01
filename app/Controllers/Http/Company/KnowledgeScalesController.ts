import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import KnowlegeScale from 'App/Models/KnowledgeScalee'
import StoreKnowlegeScaleValidator from 'App/Validators/StoreKnowlegeScaleValidator'
import UpdateKnowlegeScaleValidator from 'App/Validators/UpdateKnowlegeScaleValidator'

export default class KnowlegeScalesController {
  public async index({ params, request, response }: HttpContextContract) {
    const { 
      page,
      status,
      relationships 
    } = request.qs()

    const knowledgeScales = await KnowlegeScale.query()
      .if(status, (builder) => {
        builder.where('is_active', Boolean(status))
      })
      .if(relationships, (builder) => {
        const load = relationships.split('|').filter(Boolean)
        builder
          .if(load.includes('company'), (builder) => {
            builder.preload('company')
          })
      })
      .where('company_id', params.companyId)
      .orderBy('id', 'desc')
      .paginate(page || 1, 25)


    return response.ok(knowledgeScales)
  }

  public async store({ i18n, params, request, response }: HttpContextContract) {
    const payload = await request.validate(StoreKnowlegeScaleValidator)
    const knowledgScale = await KnowlegeScale.create({
      ...payload,
      company_id: params.companyId
    })

    return response.created({
      data: knowledgScale,
      message: i18n.formatMessage('resources.persisted', {
        resource: 'Knowledge scale'
      })
    })
  }

  public async update({ i18n, params, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateKnowlegeScaleValidator)

    const knowledgScale = await KnowlegeScale.query()
      .where('company_id', params.companyId)
      .andWhere('id', params.id)
      .first()

    response.abortIf(!knowledgScale, i18n.formatMessage('errors.unavailable', {
      resource: 'knowledge scale'
    }), 404)

    await knowledgScale?.merge(payload).save()

    return response.ok({
      data: knowledgScale,
      message: i18n.formatMessage('resources.persisted', {
        resource: 'Knowledge scale'
      })
    })
  }
}
