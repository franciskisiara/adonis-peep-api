import { string } from '@ioc:Adonis/Core/Helpers'

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TechnologyCategory from 'App/Models/TechnologyCategory'

export default class extends BaseSeeder {
  public async run () {
    const categories = [
      { display_name: 'Programming language' },
      { display_name: 'Operating system' },
      { display_name: 'Libraries and frameworks' },
      { display_name: 'Databases' },
      { display_name: 'Message queues' },
      { display_name: 'Containers and container orchestration' },
      { display_name: 'Cloud Providers' },
      { display_name: 'Mobile' },
      { display_name: 'Open source tools' },
      { display_name: 'Dev tools' },
      { display_name: 'CI/CD tools' },
      { display_name: 'UX tools' },
      { display_name: 'Productivity tools' },
      { display_name: 'Design tools' },
    ]

    for (let i=0; i<categories.length; i++) {
      const category = categories[i]
      await TechnologyCategory.updateOrCreate({
        operational_name: string.dashCase(category.display_name)
      }, category)
    }
  }
}
