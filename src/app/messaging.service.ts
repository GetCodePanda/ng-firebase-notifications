import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MessagingService {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  constructor(
    private _db: AngularFireDatabase,
    private _afAuth: AngularFireAuth
  ) { }
  private updateToken(token) {
    this._afAuth.authState
                .take(1)
                .subscribe((user: any) => {
                    if ( !user ) { return; }
                    const data = { [ user.id ] : token};
                    this._db.object('fcmTokens/').update(data);
                });
  }
  getPermission() {
    this.messaging.requestPermission()
                  .then(() => {
                      console.log('got permission');
                      return this.messaging.getToken();
                  })
                  .then((token) => {
                    console.log(token);
                    this.updateToken(token);
                  }).catch((err) => console.log('From GET PERMISSION' , err));
  }
  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log('Message Recevice', payload);
      this.currentMessage.next(payload);
    });
  }
}
