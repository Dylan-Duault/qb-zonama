fx_version "cerulean"

description "Zonama website, available from an interaction with a computer"
author "Dylan Duault"
version '1.0.0'

lua54 'yes'

games {"gta5"}

ui_page 'web/build/index.html'

client_script "client/**/*"

server_scripts {"server/**/*", '@oxmysql/lib/MySQL.lua'}

files {'web/build/index.html', 'web/build/**/*'}
