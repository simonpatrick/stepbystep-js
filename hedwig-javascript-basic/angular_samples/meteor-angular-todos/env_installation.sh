#!/usr/bin/env bash

# install meteor
curl https://install.meteor.com | /bin/sh
# install angular
meteor add angular
meteor add accounts-ui accounts-password
meteor add urigo:angular-blaze-template
meteor remove insecure


# deploy app
meteor deploy todo_simonpatrick.com

# runing in iOS
meteor install-sdk ios
meteor add-platform ios
meteor run ios
meteor run ios-device
meteor run ios-device --mobile-server my_app_name.meteor.com

# running android
meteor install-sdk android
meteor add-platform android
meteor run android
meteor run android-device

meteor run android-device --mobile-server my_app_name.meteor.com

