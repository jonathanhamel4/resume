import { Injectable } from '@angular/core';
import { Link } from '../models/link';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LinkService {
    public socialLinks: Link[] = [
        { icon: 'fa fa-linkedin-square', display: '', href: 'https://www.linkedin.com/in/jonathan-hamel-701aa680' } as Link,
        { icon: 'fa fa-stack-overflow', display: '', href: 'https://stackoverflow.com/users/5842628/jonathan-hamel' } as Link,
        { icon: 'fa fa-envelope', display: '', href: 'mailto:jonathanhamel4@gmail.com?Subject=Hey%20there!'} as Link
    ];

    public sectionLinks: Link[] = [
        { display: 'About', href: 'about' } as Link,
        { display: 'Education', href: 'education' } as Link,
        { display: 'Skills', href: 'skills' } as Link,
        { display: 'Volunteering', href: 'volunteering' } as Link,
    ];

    constructor() {
    }
}
