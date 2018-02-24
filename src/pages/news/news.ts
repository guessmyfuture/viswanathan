import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

	admin:boolean;
	
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
  }

  ionViewDidLoad() {
	this.storage.get('admin').then(done => {
		console.log(done);
    if (done) {
		console.log(done);
      this.admin = true;
    }
  });
  }
  


}
