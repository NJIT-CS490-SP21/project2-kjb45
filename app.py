import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__, static_folder='./build/static')

cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

players = []
spectators = []

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('board')
def on_move(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('board',  data, broadcast=True, include_self=False)

@socketio.on('new user')
def on_newUser(data):
    
   # print("there are " +str(users)+ "in the lobbuy")
    print('new user connected!')
    print(str(data))
    if (data['count'] < 3):
        players.append(data['user'])
    else:
        spectators.append(data['user'])
        
    print('this is the players')
    print(players)
    print('this is the spectators')
    print(spectators)
    socketio.emit('new user',  data, broadcast=False)

    
@socketio.on('turn')
def onTurn(data):
    #print('it is player '+ str(data['id']) + 's turn')
    socketio.emit('turn',  data, broadcast=True, include_self=False)
    

# Note that we don't call app.run anymore. We call socketio.run with app arg
socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)