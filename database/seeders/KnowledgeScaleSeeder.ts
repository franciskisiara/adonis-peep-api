import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import KnowledgeScale from 'App/Models/KnowledgeScale'

export default class extends BaseSeeder {
  public async run () {
    const knowledgeScales = [
      { name: 'Clueless', description: 'I either have no idea what this is, or I only know the name/abbreviation but do not have any experience with it.', },
      { name: 'Potential', description: 'I have just started learning/using/doing this. I did not get very far yet, but I am sure I will reach at least the Beginner level soon.', },
      { name: 'Beginner', description: 'I have read the book(s) and/or attended some relevant training(s) and/or have had sufficient practise. I already had some hands-on experience with/in this.', },
      { name: 'Standard', description: 'I know enough to complete common tasks in/with this within a standard timeframe (I have completed some real work already). I know/suspect there is still plenty to learn for me. I know the available documentation and other information sources about this and I know how to use them.', },
      { name: 'Experienced', description: 'I know a lot about this. I have completed several bigger-scale real-business tasks in/with this. I rarely need to look-up answers for questions in this area. I could bring others up to the Standard level without much preparation.', },
      { name: 'Guru', description: 'I know all about this. I have worked with/in this really a lot. I know all the related technologies, most of them very well. I am 100% up-to-date in this area. I have seen all the aspects of this and I could foresee and prevent, or at least solve, all the imaginable problems. Overwhelming majority of people I consider to be Experts in this area think I am VERY good, and they occasionally come to ask for help. I have it / would love to have it at home (if applicable).', },
    ]
    
    for (let index = 0; index < knowledgeScales.length; index++) {
      const knowledgeScale = knowledgeScales[index];
      await KnowledgeScale.updateOrCreate({
        name: knowledgeScale.name,
      }, knowledgeScale)
    }
  }
}
