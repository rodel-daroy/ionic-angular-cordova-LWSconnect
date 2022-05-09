import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import {ENV} from '../../app/env'

/*
  Generated class for the SecurityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class SecurityProvider {

  constructor(public http: Http) {
  }

  ImageUrlLink() {
    return ENV.mainApi;
  }

  loginCheck(username, password) {
    let headers = new Headers({'content-type': 'application/json'})
    let requestOptions = new RequestOptions({headers: headers})
    let param = JSON.stringify({emailid: username, password: password})
    console.log('loginCheck =====>', ENV.mainApi + '/login', param)
    return this.http.post(ENV.mainApi + '/login', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('loginCheck response =====>', data)
        return data.json();
      },
      err => {
        console.error('loginCheck Oops:', err);
      }
    )
  }

  MyTaskDetail(postid) {
    let headers = new Headers({'content-type': 'application/json'})
    let requestOptions = new RequestOptions({headers: headers})
    let param = JSON.stringify({postid: postid, userid: localStorage['userid']})
    console.log('MyTaskDetail =====>', ENV.mainApi + '/mytask', param)
    return this.http.post(ENV.mainApi + '/mytask', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('MyTaskDetail response =====>', data)
        return data.json();
      },
      err => {
        console.error('MyTaskDetail Oops:', err);
      }
    )
  }

  MyTaskDetailBtn(postid, postcontent) {
    let headers = new Headers({'content-type': 'application/json'})
    let requestOptions = new RequestOptions({headers: headers})
    let param = JSON.stringify({postid: postid, userid: localStorage['userid'], postcontent: postcontent})
    console.log('MyTaskDetailBtn =====>', ENV.mainApi + '/mytaskreply', param)
    return this.http.post(ENV.mainApi + '/mytaskreply', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('MyTaskDetailBtn response =====>', data)
        return data.json();
      },
      err => {
        console.error('MyTaskDetailBtn Oops:', err);
      }
    )
  }

  Categorylist() {
    let headers = new Headers({'content-type': 'application/json'})
    let requestOptions = new RequestOptions({headers: headers})
    let param = JSON.stringify({userid: localStorage['userid']})
    console.log('Categorylist =====>', ENV.mainApi + '/taskcat', param)
    return this.http.post(ENV.mainApi + '/taskcat', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('Categorylist response =====>', data)
        return data.json();
      },
      err => {
        console.error('Categorylist Oops:', err);
      }
    )
  }

  CreateTask(postcontent, posttitle, postcat) {
    let headers = new Headers({'content-type': 'application/json'})
    let requestOptions = new RequestOptions({headers: headers})
    let param = JSON.stringify({
      userid: localStorage['userid'],
      postcontent: postcontent,
      posttitle: posttitle,
      postcat: postcat
    })
    console.log('CreateTask =====>', ENV.mainApi + '/taskcreate', param)
    return this.http.post(ENV.mainApi + '/taskcreate', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('CreateTask response =====>', data)
        return data.json();
      }, err => {
        console.error('CreateTask Oops:', err);
      }
    )
  }

  tasklist() {
    let headers = new Headers({'content-type': 'application/json'})
    let requestOptions = new RequestOptions({headers: headers})
    let param = JSON.stringify({userid: localStorage['userid']})
    console.log('tasklist =====>', ENV.mainApi + '/tasklist', param)
    return this.http.post(ENV.mainApi + '/tasklist', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('tasklist response =====>', data)
        return data.json();
      },
      err => {
        console.error('tasklist Oops:', err);
      }
    )
  }

  tasklistsrc(postname, statuswp, categorywp) {
    let headers = new Headers({'content-type': 'application/json'})
    let requestOptions = new RequestOptions({headers: headers})
    let param = JSON.stringify({
      userid: localStorage['userid'],
      postname: postname,
      status: statuswp,
      category: categorywp
    })
    console.log('tasklistsrc =====>', ENV.mainApi + '/tasksrc', param)
    return this.http.post(ENV.mainApi + '/tasksrc', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('tasklistsrc response =====>', data)
        return data.json();
      },
      err => {
        console.error('tasklistsrc Oops:', err);
      }
    )
  }

  taskactive() {
    let headers = new Headers({'content-type': 'application/json'})
    let requestOptions = new RequestOptions({headers: headers})
    let param = JSON.stringify({userid: localStorage['userid']})
    console.log('taskactive =====>', ENV.mainApi + '/taskactive', param)
    return this.http.post(ENV.mainApi + '/taskactive', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('taskactive response =====>', data)
        return data.json();
      },
      err => {
        console.error('taskactive Oops:', err);
      }
    )
  }

  resetpass(emailid) {
    let headers = new Headers({'content-type': 'application/json'})
    let requestOptions = new RequestOptions({headers: headers})
    let param = JSON.stringify({emailid: emailid})
    console.log('resetpass =====>', ENV.mainApi + '/forgetpass', param)
    return this.http.post(ENV.mainApi + '/forgetpass', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('resetpass response =====>', data)
        return data.json();
      },
      err => {
        console.error('resetpass Oops:', err);
      }
    )
  }


  dashboard() {
    let headers = new Headers({'content-type': 'application/json'});
    let requestOptions = new RequestOptions({headers: headers});
    let param = JSON.stringify({userid: localStorage['userid']});
    console.log('dashboard =====>', ENV.mainApi + '/dashboard', param)
    return this.http.post(ENV.mainApi + '/dashboard', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('dashboard response =====>', data)
        return data.json();
      },
      err => {
        console.error('dashboard Oops:', err);
      }
    )
  }

  taskoncomwp(status) {
    let headers = new Headers({'content-type': 'application/json'});
    let requestOptions = new RequestOptions({headers: headers});
    let param = JSON.stringify({userid: localStorage['userid'], status: status});
    console.log('taskoncomwp =====>', ENV.mainApi + '/taskoncomp', param);
    return this.http.post(ENV.mainApi + '/taskoncomp', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('taskoncomwp response =====>', data);
        return data.json();
      },
      err => {
        console.error('taskoncomwp Oops:', err);
      }
    )
  }

  taskrightside(taskid) {
    let headers = new Headers({'content-type': 'application/json'});
    let requestOptions = new RequestOptions({headers: headers});
    let param = JSON.stringify({userid: localStorage['userid'], taskid: taskid});
    console.log('taskrightside =====>', ENV.mainApi + '/taskrightside', param);
    return this.http.post(ENV.mainApi + '/taskrightside', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('taskrightside response =====>', data);
        return data.json();
      },
      err => {
        console.error('taskrightside Oops:', err);
      }
    )
  }

  taskfeedback(taskid, fbrate, fbcontent) {
    let headers = new Headers({'content-type': 'application/json'});
    let requestOptions = new RequestOptions({headers: headers});
    let param = JSON.stringify({userid: localStorage['userid'], postid: taskid, fbrate: fbrate, fbcontent: fbcontent});
    console.log('taskfeedback =====>', ENV.mainApi + '/taskfeedback', param);
    return this.http.post(ENV.mainApi + '/taskfeedback', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('taskfeedback =====>', data);
        return data.json();
      },
      err => {
        console.error('taskfeedback Oops:', err.message);
      }
    )
  }

  taskapprove(taskid) {
    let headers = new Headers({'content-type': 'application/json'});
    let requestOptions = new RequestOptions({headers: headers});
    let param = JSON.stringify({userid: localStorage['userid'], postid: taskid});
    console.log('taskapprove =====>', ENV.mainApi + '/taskapprove', param);
    return this.http.post(ENV.mainApi + '/taskapprove', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('taskapprove response =====>', data);
        return data.json();
      },
      err => {
        console.error('taskapprove Oops:', err);
      }
    )
  }


  payment(PaypalTxnID, OrderItem, BalHours, TotalHours, OrderAmt, PaidDate, fullname, mob, emailid) {
    let headers = new Headers({'content-type': 'application/json'});
    let requestOptions = new RequestOptions({headers: headers});
    let param = JSON.stringify({
      userid: localStorage['userid'],
      PaypalTxnID: PaypalTxnID,
      OrderItem: OrderItem,
      BalHours: BalHours,
      TotalHours: TotalHours,
      OrderAmt: OrderAmt,
      PaidDate: PaidDate,
      fullname: fullname,
      mobno: mob,
      emailid: emailid
    });
    console.log('payment =====>', ENV.mainApi + '/payment', param);
    return this.http.post(ENV.mainApi + '/payment', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('payment response =====>', data);
        return data.json();
      },
      err => {
        console.error('payment Oops:', err);
      }
    )
  }

  buyadditional() {
    let headers = new Headers({'content-type': 'application/json'});
    let requestOptions = new RequestOptions({headers: headers});
    let param = JSON.stringify({userid: localStorage['userid']});
    console.log('buyadditional =====>', ENV.mainApi + '/buyadditional', param);
    return this.http.post(ENV.mainApi + '/buyadditional', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('buyadditional response =====>', data);
        return data.json();
      },
      err => {
        console.error('buyadditional Oops:', err);
      }
    )
  }


  getprofile() {
    let headers = new Headers({'content-type': 'application/json'});
    let requestOptions = new RequestOptions({headers: headers});
    let param = JSON.stringify({userid: localStorage['userid']});
    console.log('getprofile =====>', ENV.mainApi + '/getprofile', param);
    return this.http.post(ENV.mainApi + '/getprofile', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('getprofile response =====>', data);
        return data.json();
      },
      err => {
        console.error('getprofile Oops:', err);
      }
    )
  }


  upprofileimg() {
    let headers = new Headers({'content-type': 'application/json'});
    let requestOptions = new RequestOptions({headers: headers});
    let param = JSON.stringify({userid: localStorage['userid']});
    console.log('upprofileimg =====>', ENV.mainApi + '/profileimg', param);
    return this.http.post(ENV.mainApi + '/profileimg', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('upprofileimg response =====>', data);
        return data.json();
      },
      err => {
        console.error('upprofileimg Oops:', err);
      }
    )
  }


  updateprofile(billAdd, billCountry, billState, billPin, billingPhone) {
    let headers = new Headers({'content-type': 'application/json'});
    let requestOptions = new RequestOptions({headers: headers});
    let param = JSON.stringify({
      userid: localStorage['userid'],
      billAdd: billAdd,
      billCountry: billCountry,
      billState: billState,
      billPin: billPin,
      billingPhone: billingPhone
    });
    console.log('updateprofile =====>', ENV.mainApi + '/upprofile', param);
    return this.http.post(ENV.mainApi + '/upprofile', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('updateprofile response =====>', data);
        return data.json();
      },
      err => {
        console.error('updateprofile Oops:', err);
      }
    )
  }


  upplayerID() {
    let headers = new Headers({'content-type': 'application/json'});
    let requestOptions = new RequestOptions({headers: headers});
    let param = JSON.stringify({userid: localStorage['userid'], playerID: localStorage["pushusrid"]});
    console.log('upplayerID =====>', ENV.mainApi + '/uponesignal', param);
    return this.http.post(ENV.mainApi + '/uponesignal', param, requestOptions).timeout(ENV.timeout).map(
      (data) => {
        console.log('upplayerID response =====>', data);
        return data.json();
      },
      err => {
        console.error('upplayerID Oops:', err);
      }
    )
  }

  getnotify() {
    let headers = new Headers({'content-type': 'application/json'});
    let requestOptions = new RequestOptions({headers: headers});
    let param = JSON.stringify({userid: localStorage['userid']});
    console.log('getnotify =====>', ENV.mainApi + '/getnotify', param);
    return this.http.post(ENV.mainApi + '/getnotify', param, requestOptions).timeout(ENV.timeout).map((data) => {
      console.log('getnotify response =====>', data);
        return data.json();
      }, err => {
        console.error('getnotify Oops:', err);
      }
    )
  }

}
