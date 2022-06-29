import { string } from '@ioc:Adonis/Core/Helpers'
import { map } from 'lodash'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TechnologyCategory from 'App/Models/TechnologyCategory'

export default class TechnologySeeder extends BaseSeeder {
  public getTechnologies () {
    return {
      'Programming language': [

      ],

      'Operating system': [

      ],

      'Libraries and frameworks': [

      ],

      'Databases': [

      ],

      'Message queues': [

      ],

      'Containers and container orchestration': [

      ],

      'Cloud providers': [

      ],

      'Mobile': [

      ],

      'Open source tools': [

      ],

      'Dev tools': [

      ],

      'CI/CD tools': [

      ],

      'UX tools': [

      ],

      'Productivity tools': [

      ],

      'Design tools': [

      ]
    }
  }


  public async run () {
    const technologies = this.getTechnologies()
    const categories = Object.keys(technologies)

    for (let i = 0; i < categories.length; i++) {
      const categoryName = categories[i]

      const category = await TechnologyCategory.updateOrCreate({
        operational_name: string.dashCase(categoryName)
      }, {
        display_name: categoryName
      })

      const categoryTechnologies = technologies[categoryName]
      await category.related('technologies')
        .updateOrCreateMany(map(categoryTechnologies, (technologyName) => {
          return {
            display_name: technologyName,
            operational_name: string.dashCase(technologyName),
          }
        }), 'operational_name')
    }
  }
}
