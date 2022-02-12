import { Injectable } from '@angular/core';

@Injectable()
export class DocumentServiceMock {
  constructor() { }

  fetchPendingRegNumberDataAsync(data): Array<{}> {
      return [
          {
              name: 'user1',
              surname: 'usersurname1'
          }
      ];
  }
}