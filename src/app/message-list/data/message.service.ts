import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message, uniqueMsg } from './message';
import { delay } from 'rxjs/operators';
import { Delete, Page, PageRequest, Sort } from '../../shared/pagination/page';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  page(request: PageRequest<Message>, removeItems: Delete<Message>): Observable<Page<Message>> {
    // NOTE: fake processing, this requests should be handled by backend
    let filteredMessages = this.uniqBy(this.allMessages);
    if (!_.isEmpty(removeItems?.content)) {
      filteredMessages = this.deleteItems(removeItems?.content);
    }
    filteredMessages = this.sortBy(filteredMessages, request.sort);

    const start = request.page * request.size;
    const end = start + request.size;
    const pageMessages = filteredMessages.slice(start, end);
    const page = {
      content: pageMessages,
      number: request.page,
      size: pageMessages.length,
      totalElements: filteredMessages.length,
    };
    return of(page).pipe(delay(200));
  }

  deleteItems(msgs: Message[]) {
    // NOTE: fake delete, we should do a DELETE request here instead
    return _.difference(this.allMessages, msgs);
  }

  private uniqBy(msgs: Message[]) {
    let seen = [];
    return msgs.filter(function (item) {
      const k = uniqueMsg(item);
      return seen.some((s) => _.isEqual(s, k)) ? false : seen.push(k);
    });
  }

  private sortBy(msgs: Message[], sort: Sort<Message>) {
    return msgs.sort((a, b) => {
      const propA = a[sort.property];
      const propB = b[sort.property];
      let result;
      if (typeof propA === 'string') {
        result = propA.toLowerCase().localeCompare(propB.toString().toLowerCase());
      } else {
        result = (propA as any) - (propB as any);
      }
      const factor = sort.order == 'asc' ? 1 : -1;
      return result * factor;
    });
  }

  private allMessages: Message[] = [
    {
      sentAt: '2012-11-13T17:29:37.003Z',
      uuid: '435453',
      content: '1',
      senderUuid: '2',
    },
    {
      sentAt: '2015-05-22T13:55:10.542Z',
      uuid: '4354353',
      content: '2',
      senderUuid: '2',
    },
    {
      sentAt: '2012-11-20T01:31:33.751Z',
      uuid: '4354353',
      content: '3',
      senderUuid: '1',
    },
    {
      sentAt: '2016-02-17T10:13:03.115Z',
      uuid: '435453',
      content: '4',
      senderUuid: '2',
    },
    {
      sentAt: '2015-05-22T13:55:10.542Z',
      uuid: '4354353',
      content: '2',
      senderUuid: '1',
    },
    {
      sentAt: '2018-07-05T10:19:07.713Z',
      uuid: '4354353',
      content: '6',
      senderUuid: '2',
    },
    {
      sentAt: '2016-11-09T03:24:54.612Z',
      uuid: '4354353',
      content: '7',
      senderUuid: '1',
    },
    {
      sentAt: '2013-06-21T16:39:08.630Z',
      uuid: '43543353',
      content: '8',
      senderUuid: '1',
    },
    {
      sentAt: '2013-08-24T01:55:38.167Z',
      uuid: '43521314353',
      content: '9',
      senderUuid: '1',
    },
    {
      sentAt: '2012-11-05T11:37:00.472Z',
      uuid: '43532134353',
      content: '10',
      senderUuid: '2',
    },
    {
      sentAt: '2017-09-26T17:01:10.949Z',
      uuid: '43321315433',
      content: '11',
      senderUuid: '2',
    },
    {
      sentAt: '2012-12-02T13:55:30.626Z',
      uuid: '43543321353',
      content: '12',
      senderUuid: '1',
    },
    {
      sentAt: '2015-05-03T08:54:02.530Z',
      uuid: '43542233',
      content: '13',
      senderUuid: '2',
    },
    {
      sentAt: '2013-08-24T01:55:38.167Z',
      uuid: '43521314353',
      content: '9',
      senderUuid: '1',
    },
    {
      sentAt: '2012-02-19T09:42:11.913Z',
      uuid: '435353',
      content: '15',
      senderUuid: '2',
    },
    {
      sentAt: '2018-07-06T20:31:01.649Z',
      uuid: '4354543353',
      content: '16',
      senderUuid: '2',
    },
    {
      sentAt: '2017-09-25T04:35:18.647Z',
      uuid: '4354353',
      content: '17',
      senderUuid: '1',
    },
    {
      sentAt: '2012-12-17T15:08:37.988Z',
      uuid: '43545433353',
      content: '18',
      senderUuid: '1',
    },
    {
      sentAt: '2016-02-03T05:20:52.506Z',
      uuid: '435454www35353',
      content: '19',
      senderUuid: '2',
    },
    {
      sentAt: '2018-04-07T06:30:38.178Z',
      uuid: '43545435353',
      content: '20',
      senderUuid: '2',
    },
  ];
}
