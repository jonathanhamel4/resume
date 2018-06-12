import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private githubApi = 'https://api.github.com/repos';
    public latestSha: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.latestSha = new BehaviorSubject<any>(null);
    }

    public getLatestCommit(branch: string = 'master', owner: string = 'jonathanhamel4', repo: string = 'resume') {
        const url: string = this.githubApi + '/' + owner + '/' + repo + '/commits/' + branch;
        return this.http.get(url)
            .subscribe((commit: any) => {
                if (commit) {
                    this.latestSha.next({ sha: commit.sha.substring(0, 7), link: commit.html_url });
                }
            });
    }
}
