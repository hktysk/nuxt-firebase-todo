# nuxt-firebase-todo
firebaseの設定ファイルをGit管理から外しています  
環境変数には今回してないので、  
firebaseの設定ファイルを作成していただいたら、各自の環境でTodoを確認/開発できます  
  
- firebase.config.ts
- .firebaserc

```firebase.config.ts
import { FirebaseOptions } from '@firebase/app-types'

export const firebaseConfig: FirebaseOptions = {
  apiKey: 'API_KEY',
  authDomain: 'AUTH_DOMAIN',
  databaseURL: 'DATABASE_URL',
  projectId: 'PROJECT_ID',
  storageBucket: 'STORAGE_BUCKET',
  messagingSenderId: 'MESSAGIN_SENDERID',
  appId: 'APP_ID'
}
```

```.firebase.rc
{
  "projects": {
    "default": "PROJECT_ID"
  }
}
```

## Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```

## Deploy
```bash
npm run generate
firebase deploy
```