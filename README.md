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

# 測量系のインストール
## SPI端子の有効化
```shell
sudo nano /boot/config.txt
```
```c
// in config.txt

# Uncomment some or all of these to enable the optional hardware interfaces
#dtparam=i2c_arm=on
#dtparam=i2s=on
dtparam=spi=on //SPI端子の記述のコメントを外す
```
## 再起動、確認
```shell
$ sudo reboot
...
$ lsmod
Module                  Size  Used by
...
spi_bcm2708             5121  0 # spi_bcm以降の綴りは不定
```

## python-devをインストール
```shell
sudo apt-get install python-dev
# このライブラリがないと、以下のエラーがでる
# fatal error: Python.h: No such file or directory
```

## spidevをインストール
```shell
sudo pip install spidev
# これはSPI読み取る用のPythonライブラリ
```

## テスト用スクリプトの作成
```
nano test_spi.py
```
```python
#!/usr/bin/env python
# Read the analog sensor value via MCP3002.
# http://qiita.com/f_nishio/items/4b9723c4e622a51aaeb5

import spidev
import time
import subprocess

# open SPI device 0.0
spi = spidev.SpiDev()
spi.open(0, 0)

try:
    while True:
        resp = spi.xfer2([0x68, 0x00])
        value = (resp[0] * 256 + resp[1]) & 0x3ff
        print value
        time.sleep(1)
except KeyboardInterrupt:
    spi.close()
```

## MCP3002の設置
できれば電源切ってから設置する
+ CS/SHDN => GPIO 8
+ CLK => GPIO 11(8の反対側)
+ Dout => GPIO 9(11の隣)
+ Din => GPIO10(9の隣)
+ VDD,GNDは各自で設置、RefはVDD自身