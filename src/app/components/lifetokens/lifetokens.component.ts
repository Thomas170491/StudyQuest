import { Component } from '@angular/core';
import { LifetokenserviceService } from '../../services/lifetokenservice/lifetokenservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lifetokens',
  standalone: true,
  imports: [],
  templateUrl: './lifetokens.component.html',
  styleUrl: './lifetokens.component.scss'
})
export class LifetokensComponent {
  lifetokens$!:Observable<number>;
  constructor(
    lifetokenserviceService: LifetokenserviceService
  ) {
    this.lifetokens$ = lifetokenserviceService.getlifetokens();
   }


  ngOnInit(): void {
  }
}
