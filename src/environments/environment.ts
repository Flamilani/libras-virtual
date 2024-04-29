// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const assets = '';
const imagePath = '../assets/imgs/logo_icone.png';

export const environment = {
  production: false,
  assets,
  imagePath,
  firebase: {
    apiKey: "AIzaSyAi_8seHoUwv3etTCUoKxmqL43pl9lZGQc",
/*     authDomain: "app-librasvideos.firebaseapp.com",
    projectId: "app-librasvideos",
    storageBucket: "app-librasvideos.appspot.com",
    messagingSenderId: "1016087581420",
    appId: "1:1016087581420:web:ec2da0dbe5b67d9bdb4bc9" */
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
