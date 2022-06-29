import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor () {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    const errors = error.messages?.errors
    const messageParts = error.message.split(': ')

    ctx.response.status(error.status).send({
      ...(errors && { errors }),
      message: messageParts[1],
    })
  }
}
