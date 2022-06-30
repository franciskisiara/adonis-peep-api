import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
})


Route.group(() => {
  Route.resource('knowledge-scales', 'KnowlegeScalesController').only([
    'index', 'store', 'update',
  ])
})
  .namespace('App/Controllers/Http/Company')
  .middleware(['auth:api', 'company'])
  .prefix('companies/:companyId')