STDOUT.sync = true # windows用のまじない

require 'rubygems'
require 'socket.io-client-simple'

url    = 'http://localhost:3300' # URLはサーバーの
socket = SocketIO::Client::Simple.connect url

socket.on :connect do
  puts "Connected to #{url} !!"
end

socket.on :disconnect do
  puts "Disconnected!!"
end

socket.on :chat do |data|
  #puts "msg => " + data['msg']
  #puts "at => " + data['at']
  p data
end

socket.on :error do |err|
  p err
end

puts "please input and press Enter key"
loop do
  print '> '
  msg = STDIN.gets.strip
  next if msg.empty?
  socket.emit :chat, {:msg => msg, :at => Time.now}
end
