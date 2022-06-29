import Company from 'App/Models/Company'

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    company: Company | null
  }
}