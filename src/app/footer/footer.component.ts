import { Component, OnInit } from '@angular/core';
import { Link } from '../../models/link';
import { LinkService } from '../../services/link.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public links: Link[] = [];

  constructor(private linkService: LinkService, public apiService: ApiService) { }

  public ngOnInit() {
    this.apiService.getLatestCommit();
    this.links = this.linkService.socialLinks;
  }
}
