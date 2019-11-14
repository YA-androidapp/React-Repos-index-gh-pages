# Nuxtjs-Repos-index-gh-pages

---

## Procedure

```ps
$ npx create-nuxt-app Nuxtjs-Repos-index-gh-pages

create-nuxt-app v2.11.1
? Generating Nuxt.js project in Nuxtjs-Repos-index-gh-pages
? Project name Nuxtjs-Repos-index-gh-pages
? Project description My tremendous Nuxt.js project
? Author name YA
? Choose the package manager Yarn
? Choose UI framework None
? Choose custom server framework None (Recommended)
? Choose Nuxt.js modules Axios, Progressive Web App (PWA) Support
? Choose linting tools (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Choose test framework None
? Choose rendering mode Single Page App
? Choose development tools jsconfig.json (Recommended for VS Code)
Warning: name can no longer contain capital letters



?  Successfully created project Nuxtjs-Repos-index-gh-pages

  To get started:

        cd Nuxtjs-Repos-index-gh-pages
        yarn dev

  To build & start for production:

        cd Nuxtjs-Repos-index-gh-pages
        yarn build
        yarn start
```

GitHub リポジトリから clone した場合は、`npx`の代わりに以下のコマンドを実行する

```ps
$ cd Nuxtjs-Repos-index-gh-pages
$ yarn install
$ yarn dev
$ yarn build
$ yarn start
```

デプロイ用のディレクトリ(dist/)へアプリケーションをビルドする

```ps
$ yarn build
yarn run v1.19.1
$ nuxt build
i Production build                                                                                                                                12:48:31
√ Builder initialized                                                                                                                             12:48:31
√ Nuxt files generated                                                                                                                            12:48:31

√ Client
  Compiled successfully in 4.70s


Hash: bcac1c72aec282650aab
Version: webpack 4.41.2
Time: 4697ms
Built at: 2019-11-07 12:48:36
                         Asset       Size  Chunks                         Chunk Names
../server/client.manifest.json   7.51 KiB          [emitted]
       1e12a9064a7bbf857703.js   2.33 KiB       3  [emitted] [immutable]  runtime
       242a874ad1d4064656fe.js    4.3 KiB       4  [emitted] [immutable]
       7880151c6b581f8c73f1.js    161 KiB       1  [emitted] [immutable]  commons.app
                      LICENSES  510 bytes          [emitted]
       dc160da274eb1573ed00.js   3.78 KiB       2  [emitted] [immutable]  pages_index
       de347a775cea6653bca1.js   47.6 KiB       0  [emitted] [immutable]  app
     icons/icon_120.5f6a36.png   4.68 KiB          [emitted]
     icons/icon_144.5f6a36.png    5.8 KiB          [emitted]
     icons/icon_152.5f6a36.png    6.1 KiB          [emitted]
     icons/icon_192.5f6a36.png   7.83 KiB          [emitted]
     icons/icon_384.5f6a36.png   18.1 KiB          [emitted]
     icons/icon_512.5f6a36.png     20 KiB          [emitted]
      icons/icon_64.5f6a36.png   2.35 KiB          [emitted]
        manifest.33dd0c1d.json  809 bytes          [emitted]
 + 1 hidden asset
Entrypoint app = 1e12a9064a7bbf857703.js 7880151c6b581f8c73f1.js de347a775cea6653bca1.js
i Generating pages                                                                                                                                12:48:36
√ Generated /                                                                                                                                     12:48:36
Done in 7.56s.



$ ls dist/
    Directory: C:\Users\y\Documents\GitHub\Nuxtjs-Repos-index-gh-pages\Nuxtjs-Repos-index-gh-pages\dist

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----        2019/11/07    12:48                _nuxt
-a----        2019/11/07    12:48              0 .nojekyll
-a----        2019/11/07    12:48           3574 200.html
-a----        2019/11/07    12:44           1393 favicon.ico
-a----        2019/11/07    12:44          12699 icon.png
-a----        2019/11/07    12:51           3574 index.html
-a----        2019/11/07    12:44            435 README.md
-a----        2019/11/07    12:48            995 sw.js
```

GitHub Pages へデプロイするためのファイルを、ディレクトリ(dist/)へアプリケーションをビルドする(ルートディレクトリではなく`/Nuxtjs-Repos-index-gh-pages`に配置しても動くようにする)

```ps
$ yarn build:gh-pages
yarn run v1.19.0
$ cross-env DEPLOY_ENV=GH_PAGES nuxt build
i Production build                                                                                                                                                                          12:18:20
√ Builder initialized                                                                                                                                                                       12:18:20
√ Nuxt files generated                                                                                                                                                                      12:18:20

√ Client
  Compiled successfully in 15.68s


Hash: 7b44e0f9e9048f56f9ae
Version: webpack 4.41.2
Time: 15678ms
Built at: 2019-11-14 12:18:37
                         Asset       Size  Chunks                         Chunk Names
../server/client.manifest.json   7.67 KiB          [emitted]
       00a818db7b19c9b6c982.js   2.36 KiB       3  [emitted] [immutable]  runtime
       29bf63e9c4f625fd6a37.js   51.5 KiB       0  [emitted] [immutable]  app
       8280da91af564e59298d.js    170 KiB       1  [emitted] [immutable]  commons.app
                      LICENSES  571 bytes          [emitted]
       c32cafddae857dd6c697.js    4.3 KiB       4  [emitted] [immutable]
       fefe4bc2ddbfbb08f00b.js   8.18 KiB       2  [emitted] [immutable]  pages_index
     icons/icon_120.5f6a36.png   4.68 KiB          [emitted]
     icons/icon_144.5f6a36.png    5.8 KiB          [emitted]
     icons/icon_152.5f6a36.png    6.1 KiB          [emitted]
     icons/icon_192.5f6a36.png   7.83 KiB          [emitted]
     icons/icon_384.5f6a36.png   18.1 KiB          [emitted]
     icons/icon_512.5f6a36.png     20 KiB          [emitted]
      icons/icon_64.5f6a36.png   2.35 KiB          [emitted]
        manifest.b4666763.json   1.01 KiB          [emitted]
 + 1 hidden asset
Entrypoint app = 00a818db7b19c9b6c982.js 8280da91af564e59298d.js 29bf63e9c4f625fd6a37.js
i Generating pages                                                                                                                                                                          12:18:38
√ Generated /                                                                                                                                                                               12:18:38
Done in 22.49s.
```

---

Copyright (c) 2019 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.
