App.info({
  id: 'com.idxo2os8tmg4dqerc8bz',
  name: 'Tagalong',
  description: 'Tagalong and exercise with friends!',
  author: 'Team Tagalong',
  email: 'dan@tagalong.fit',
  website: 'http://tagalong.fit'
});


App.icons({
  // iOS
  'iphone': '/img/appicon_white_sm.png',
  'iphone_2x': '/img/appicon_white_sm.png'
//   // 'ipad': 'resources/icons/icon-72x72.png',
//   // 'ipad_2x': 'resources/icons/icon-72x72@2x.png'

//   // Android
//   // 'android_ldpi': 'resources/icons/icon-36x36.png',
//   // 'android_mdpi': 'resources/icons/icon-48x48.png',
//   // 'android_hdpi': 'resources/icons/icon-72x72.png',
//   // 'android_xhdpi': 'resources/icons/icon-96x96.png'
});


App.launchScreens({
  // // iOS
  'iphone': '/img/Splashscreen_dots.png',
  'iphone_2x': '/img/Splashscreen_dots.png',
  'iphone5': '/img/320x568_puntos.png',
  'iphone6': '/img/Splashscreen_6dots.png'

//   // 'ipad_portrait': 'resources/splash/splash-768x1024.png',
//   // 'ipad_portrait_2x': 'resources/splash/splash-768x1024@2x.png',
//   // 'ipad_landscape': 'resources/splash/splash-1024x768.png',
//   // 'ipad_landscape_2x': 'resources/splash/splash-1024x768@2x.png',

//   // Android
//   // 'android_ldpi_portrait': 'resources/splash/splash-200x320.png',
//   // 'android_ldpi_landscape': 'resources/splash/splash-320x200.png',
//   // 'android_mdpi_portrait': 'resources/splash/splash-320x480.png',
//   // 'android_mdpi_landscape': 'resources/splash/splash-480x320.png',
//   // 'android_hdpi_portrait': 'resources/splash/splash-480x800.png',
//   // 'android_hdpi_landscape': 'resources/splash/splash-800x480.png',
//   // 'android_xhdpi_portrait': 'resources/splash/splash-720x1280.png',
//   // 'android_xhdpi_landscape': 'resources/splash/splash-1280x720.png'
});


App.accessRule('https://maps.googleapis.com/*');
App.accessRule('http://dantsai.com/*');
App.accessRule('*');