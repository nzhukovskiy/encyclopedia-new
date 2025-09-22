import {Component, Input} from '@angular/core';
import {ActionType} from '../../constants/action-type';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-type-badge',
  imports: [TranslatePipe, CommonModule],
  templateUrl: './history-type-badge.component.html',
  styleUrl: './history-type-badge.component.scss'
})
export class HistoryTypeBadgeComponent {

    @Input() actionType?: ActionType;

    protected readonly ActionType = ActionType;
}
