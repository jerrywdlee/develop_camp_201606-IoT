# develop_camp_201606-IoT
テモナ2016六月開発合宿(IoT)

# 使い方
+ 環境
```
ruby > 1.9.7
nodejs
```

+ packageとgem
```shell
# node.jsのパッケージのインストール
# プロジェクトフォルダ配下で
$ npm install

# gemのインストール
# railsなどがある前提で
$ gem install socket.io-client-simple
```

+ 動かしてみる
```shell
# Server スクリプトの起動
$ node samples_for_socketio/nodejs\(server\)/sample_server.js

# Client スクリプトの起動
$ ruby samples_for_socketio/ruby\(client\)/sample.rb

# !!注意!! gem socket.io-client-simpleの欠陥で、
# サーバーが再起動する場合、必ずクライアントも再起動してくだい
```
# データ形式
* イベント:`real_time_report`
```ruby
{"instr_name"=>"test_rb", "sample_time"=>"2016-05-31 17:10:08.727", "raw_data"=>"{\"ruby\" : \"Hello Ruby\"}", "pushed"=>0, "socket_id"=>"/#SrCrZiFIYDWKyH34AAAB", "client_local_ip"=>"[::ffff:127.0.0.1]:"}
```
