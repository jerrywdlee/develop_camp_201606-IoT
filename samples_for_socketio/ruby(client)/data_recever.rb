STDOUT.sync = true # windows用のまじない

require 'rubygems'
require 'socket.io-client-simple'

url    = 'http://localhost:3333' # URLはサーバーの
socket = SocketIO::Client::Simple.connect url

socket.on :connect do
  puts "Connected to #{url} !!"
end

socket.on :disconnect do
  puts "Disconnected!!"
end

socket.on :real_time_report do |temp_data_obj|
  #puts "msg => " + data['msg']
  #puts "at => " + data['at']
  p temp_data_obj
end

socket.on :network_delay do |network_delay|
  p "Delay : #{network_delay}"
end

socket.emit :send_data_realtime,"test_dev_lee_mac01","test_rb","from_rb"

socket.emit :network_delay,"test_dev_lee_mac01"

socket.emit :reg,"test_dev_lee_mac01"

socket.on :error do |err|
  p err
end

loop do
  #print '> '
  msg = STDIN.gets.strip
  next if msg.empty?
  if msg == "reg"
    socket.emit :reg,"test_dev_lee_mac01"
  end
  if msg == "delay"
    socket.emit :network_delay,"test_dev_lee_mac01"
  end
  socket.emit :chat, {:msg => msg, :at => Time.now}
end
