import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	
  loginData = {
    email: '',
    password: ''
  }
  constructor(
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private facebook: Facebook,
	private googlePlus: GooglePlus,
    private platform: Platform,
	public storage: Storage
  ) { }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
      .then(auth => {
        // Do custom things with auth
      })
      .catch(err => {
        // Handle error
        let toast = this.toastCtrl.create({
          message: err.message,
          duration: 1000
        });
        toast.present();
      });
  }

  loginFacebook() {
    if (this.platform.is('cordova')) {
      return this.facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(response => { 
		console.log(response);
		let userDetails = response.additionalUserInfo.profile;
			this.storage.set('user-email', userDetails.email);
			this.storage.set('first-name', userDetails.first_name);
			this.storage.set('last-name', userDetails.last_name);
			this.storage.set('user-id', userDetails.id);
			this.storage.set('user-picture', userDetails.picture.data.url);
			this.storage.set('user-gender', userDetails.gender);
			this.storage.set('user-provider', response.additionalUserInfo.providerId);
			this.storage.set('isNewUser', response.additionalUserInfo.isNewUser);
			this.storage.set('name', userDetails.name);
			if(userDetails.email == 'senthilkumaree996@gmail.com'){
				this.storage.set('admin', true); 
			}else{
			this.storage.set('admin', false); 
			}
		});
    }
  }
  

	loginGoogle(): void {
		if (this.platform.is('cordova')) {
			return this.googlePlus.login({
    'webClientId': '161094741615-o0vhte15j4dg25ndu25b0encqj1nhdv3.apps.googleusercontent.com',
    'offline': true
  }).then( res => {
          const googleCredential = firebase.auth.GoogleAuthProvider
              .credential(res.idToken);
 
          firebase.auth().signInWithCredential(googleCredential)
        .then( response => {
			console.log(response);
			
        });
  }, err => {
      console.error("Error: ", err)
  });
}else{
	return this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(response => {
			console.log(response);
			let userDetails = response.additionalUserInfo.profile;
			this.storage.set('user-email', userDetails.email);
			this.storage.set('first-name', userDetails.given_name);
			this.storage.set('last-name', userDetails.family_name);
			this.storage.set('user-id', userDetails.id);
			this.storage.set('user-picture', userDetails.picture);
			this.storage.set('user-gender', userDetails.gender);
			this.storage.set('user-provider', response.additionalUserInfo.providerId);
			this.storage.set('isNewUser', response.additionalUserInfo.isNewUser);
			console.log(userDetails.email);
			if(userDetails.email == 'senthilk979@gmail.com'){
				this.storage.set('admin', true); 
				console.log(this.storage.get('admin'));
			}else{
			this.storage.set('admin', false); 
			}
		});
}
}

  
  
}