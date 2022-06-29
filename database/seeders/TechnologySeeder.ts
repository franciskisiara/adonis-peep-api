import { string } from '@ioc:Adonis/Core/Helpers'
import { map } from 'lodash'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TechnologyCategory from 'App/Models/TechnologyCategory'

export default class TechnologySeeder extends BaseSeeder {
  public getTechnologies () {
    return {
      'Programming languages': [
        'Javascript', 'Typescript', 'Python', 'MATLAB', 'PHP', 'Perl', 'Ruby','HTML', 'CSS',
        'Java', 'Kotlin', 'Scala', 'SQL', 'Swift', 'C#', 'C++', 'C', 'Rust', 'Go', 'Dart',
      ],

      'Operating systems': [
        'LINUX', 'MacOs', 'Windows'
      ],

      'Libraries and frameworks': [
        'JQuery', 'Vue', 'React', 'Angular', 'Svelte', 'Nuxt', 'Next',
        'NodeJs', 'ExpressJs', 'AdonisJs', 'NestJs', 'SailsJs', 'MeteorJs',
        'Flask', 'Django', 'CodeIgniter', 'Laravel', 'Symfony', 'Yii', 'Rails',
        'Spring', 'Hibernate', 'Quarkus', 'Akka', 'Struts', '.NET', 'Gin',
      ],

      'Datastores': [
        'MySQL', 'Postgres', 'Firebase', 'MongoDB', 'Redis', 'Cassandra', 
      ],

      'Message queues': [
        'Kafka', 'RabbitMQ'
      ],

      'Containers and virtualization': [
        'Docker', 'VMWare', 'Virtual box',
      ],

      'Cloud providers': [
        'Amazon web services', 'Google cloud platform', 'Azure'
      ],

      'Protocol': [
        'GraphQl', 'REST', 'gRPC'
      ],

      'Mobile': [
        'Android', 'iOS', 'React native', 'Cordova', 'Flutter', 'Electron', 'Ionic'
      ],

      'Dev tools': [
        'Composer', 'Webpack', 'JVM', 'Git'
      ],

      'CI/CD tools': [
        'CircleCI', 'Jenkins', 'Github actions'
      ],

      'Productivity tools': [
        'Jira', 'Trello',
      ],
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

      const tech = map(technologies[categoryName], (name) => { 
        return { name }
      })
      await category.related('technologies')
        .updateOrCreateMany(tech, 'name')
    }
  }
}
