import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../config/config';
import { Message, sortByOptions, sortByValues } from './data/message';
import { MessageService } from './data/message.service';
import { FormControl } from '@angular/forms';
import { Sort } from '../shared/pagination/page';
import { PaginatedDataSource } from '../shared/pagination/paginated-datasource';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  labels = CONFIG.labels.messageList;
  sortByOptions = sortByOptions;
  sortBySelected = new FormControl(sortByOptions[0].value);
  initialSort: Sort<Message> = { property: 'sentAt', order: 'desc' };
  currentMsgs: Message[] = [];
  selection = new SelectionModel<Message>(true, []);
  dataSource = new PaginatedDataSource<Message>(
    (request, removeItems) => this.messageService.page(request, removeItems),
    this.initialSort
  );

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.dataSource.connect().subscribe((messages) => {
      this.currentMsgs = messages;
    });
  }

  isOneSelected() {
    return this.selection.selected.length > 0;
  }

  setSortCriteria(value: sortByValues) {
    this.dataSource.sortBy({ property: 'sentAt', order: value });
  }

  deleteSelected() {
    const content = this.selection.selected;
    this.dataSource.deleteItems({ content });
  }
}
