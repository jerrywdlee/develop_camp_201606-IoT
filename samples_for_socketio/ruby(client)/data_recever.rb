STDOUT.sync = true # windows用のまじない

require 'rubygems'
require 'socket.io-client-simple'

url    = 'http://localhost:80' # URLはサーバーの
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

socket.emit :send_data_realtime,"TestDevice01","test_rb","from_rb"

socket.emit :network_delay,"TestDevice01"

socket.emit :reg,"TestDevice01"

socket.on :error do |err|
  p err
end

loop do
  #print '> '
  msg = STDIN.gets.strip
  next if msg.empty?
  if msg == "reg"
    socket.emit :reg,"TestDevice01"
  end
  if msg == "delay"
    socket.emit :network_delay,"TestDevice01"
  end
  socket.emit :chat, {:msg => msg, :at => Time.now}
end
