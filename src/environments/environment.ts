// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiAuth : 'http://localhost:8080/api/auth',
  apiUrl: 'http://localhost:8080',
  firebase: {
    apiKey: 'AIzaSyDEwDar22B6rbt7jpyVI5mQkk20PJyk5lw',
    authDomain: 'organic-cat-350221.firebaseapp.com',
    databaseURL: 'https://testuploadfile-eacce-default-rtdb.firebaseio.com',
    projectId: 'organic-cat-350221',
    storageBucket: 'organic-cat-350221.appspot.com',
    messagingSenderId: '754609459743',
    appId: '1:754609459743:web:a2dbe6c709b8d90746fb2a',
    measurementId: '<your-measurement-id>'
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
