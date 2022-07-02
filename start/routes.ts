import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'LoginController.login')
}).namespace('App/Controllers/Http/Auth')


// Route.group(() => {
//   // Route.resource('knowledge-scales', 'KnowlegeScalesController').only([
//   //   'index', 'store', 'update',
//   // ])

//   Route.resource('listings', 'ListingsController').only([
//     'index', 'store', 'update', 'destroy'
//   ])
// })
//   .namespace('App/Controllers/Http/Company')
//   .middleware(['auth:api', 'company'])
//   .prefix('companies/:companyId')