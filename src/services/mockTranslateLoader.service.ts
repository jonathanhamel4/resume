import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

/* eslint-disable max-len */
export class MockHttpLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return of({
            'TYPEWRITER': [
                'Hi, my name is Jonathan',
                'I\'m a Web Developer',
                'I\'m an Engineer',
                'I\'m a Software Engineer',
                'Here is my interactive resume'],
            'SECTIONS': {
                'ABOUT': 'About Me',
                'EDUCATION': 'Education',
                'WORK': 'Experience',
                'SKILLS': 'Skills',
                'VOLUNTEERING': 'Volunteering'
            },
            'VIEW_MORE': 'View More',
            'VIEW_LESS': 'View Less',
            'EDUCATION': {
                'CONCORDIA': {
                    'SCHOOL': 'Concordia University (2012-2017)',
                    'DESC': 'Co-op Bachelor of Software Engineering. Graduated with distinction. Cumulative GPA 3.78.',
                    'HONOR': 'Honors',
                    'HONORS': '<ul class=\'list compact\'><li>Stan Heaps Scholarship - 2017</li><li>Dean\'s List - 2017</li><li>Dean\'s List - 2016</li><li>Golden Key Honor Society - 2015</li></ul>'
                },
                'CEM': {
                    'SCHOOL': 'Collège Édouard-Montpetit (2010-2012)',
                    'DESC': 'DEC in Pure & Applied Sciences.'
                }
            },
            'SKILLS': {
                'SOFT': 'Soft Skills',
                'HARD': 'Hard Skills',
                'LEADERSHIP': 'Leadership',
                'WORK ETHIC': 'Work Ethic',
                'POSITIVE ATTITUDE': 'Positive Attitude',
                'COMMUNICATION': 'Communication',
                'TIME MANAGEMENT': 'Time Management',
                'PROBLEM-SOLVING SKILLS': 'Problem Solving Skills',
                'TEAM PLAYER': 'Team Player',
                'CONFIDENCE': 'Confidence',
                'LEARN FROM CRITICISM': 'Learn from Criticism',
                'WORK UNDER PRESSURE': 'Work under pressure',
                'ADAPTABILITY': 'Adaptability'
            },
            'VOLUNTEERING': {
                'DIABLOS': {
                    'HEADER': 'Quarterback Football Coach (2015 & 2018)',
                    'DESC': 'Quarterback coach in my hometown football team for the Diablos La Prairie Bantam AAA team. My goals are to make sure that the children are able to reconcile competitive sports and school. A football player has to be dedicated, respectful, organized, perseverent, and much more. That is, our role as football coach, is to lead children to achieve these goals on a football field, and in their personal life. Also, it is to provide a secure environment for football players to enjoy their favorite sport without serious injuries.'
                },
                'HABITAT': {
                    'HEADER': 'Habitat For Humanity (2017)',
                    'DESC': 'Founded in 1985, Habitat for Humanity Canada is a national, nonprofit organization working toward a world where everyone has a decent and affordable place to call home.'
                },
                'MISSION': {
                    'HEADER': 'Welcome Hall Mission (2017)',
                    'DESC': 'Established in 1892, Welcome Hall Mission has become the largest doorway to help for Montrealers in need. Many programs are available to support the homeless, young single mothers, families and at-risk youth. Providing hope through concrete actions and effective solutions.'
                }
            },
            'WORK': [
                {
                    'COMPANY': 'Vigilant, A DRW Company',
                    'POSITION': 'Software Engineer',
                    'DATE': 'May 2017 - Current',
                    'DESCRIPTION': 'Once I finished school, with distinction, I became a full-time employee of Vigilant, A DRW Company in which I gained a lot of knowledge in Linux environment maintenance using Ansible, applications deployments and tasks automation using Capistrano. My primary area of work is still Web Development. I love to research and to keep bringing the latest technologies of the web to the team.'
                },
                {
                    'COMPANY': 'Vigilant, A DRW Company',
                    'POSITION': 'Part Time - Web Developer',
                    'DATE': 'September 2016 - May 2017',
                    'DESCRIPTION': 'I was asked to stay part-time after my internship while completing my last year of school. My primary focus was to mentor interns in our team using Web technologies such as Angular, React, ASP.NET Core, Node.js, etc. Mentoring gave me great leadership skills throughout my last year of school.'
                },
                {
                    'COMPANY': 'Vigilant, A DRW Company',
                    'POSITION': 'Internship - Web Developer',
                    'DATE': 'May 2016 - August 2016',
                    'DESCRIPTION': 'My third Coop internship was at Vigilant, A DRW Company. I learned how to develop new production applications from scratch as well as maintaining legacy code. Enhanced my knowledge of Node.js, Angular and SQL. I also built web crawlers.'
                },
                {
                    'COMPANY': 'CAE Inc.',
                    'POSITION': 'Part Time - Quality Assurance',
                    'DATE': 'September 2015 - May 2016',
                    'DESCRIPTION': 'Before going to school, I was asked if I wanted to continue as a part-time employee. My focus during this period was to develop, refactor and redesign a metrics dashboard for internal uses. It was a great experience on User Experience design.'
                },
                {
                    'COMPANY': 'CAE Inc.',
                    'POSITION': 'Internship - Quality Assurance',
                    'DATE': 'May 2015 - August 2015',
                    'DESCRIPTION': 'My second Coop internship was at CAE Inc., a worldwide leader in civil aviation training. I experienced something I wasn\'t very used to before, unit testing. As it was my primary focus, I learned on how to create testable and maintainable code. Gained experience on design patterns and software architecture. Diversifying work is an asset in our domain.'
                },
                {
                    'COMPANY': 'Hydro-Quebec Research Institute',
                    'POSITION': 'Internship - Web Developer',
                    'DATE': 'September 2014 - December 2014',
                    'DESCRIPTION': 'My first Coop internship was at Hydro-Quebec Research Institute. Learned a great deal on RESTFUL APIs and Intranet maintenance using Microsoft SharePoint. It was a very good first professional experience in which I learned a lot.'
                }
            ],
            'ABOUT': 'Highly motivated Software Engineer graduated from Concordia University in 2017. Always seeking for learning opportunities and new challenges. Passionate about technologies and how to integrate them in a real-world example. I am experienced in all the application life cycle from eliciting requirements and planning to testing.\n\nI used intensively Ansible and Capistrano for application deployments and environments maintenance. Also, I have a few years of experience developing applications using the MEAN (Mongo, Express, Angular, NodeJs) stack using Webpack as a package bundler. Test Driven Development is an approach I try to conform to.'
        }
        );
    }
}
