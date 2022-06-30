declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    accountGroup(): Rule,
    maximumScale(companyId): Rule,
  }
}