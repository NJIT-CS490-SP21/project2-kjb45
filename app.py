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

@socketio.on('connect')
def on_connect():
    print('User connected!')

@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')


@socketio.on('board')
def on_move(data): 
    print(str(data))
  
    socketio.emit('board',  data, broadcast=False)

@socketio.on('new user')
def on_newUser(data):
    
 
    print('new user connected!')
    print(str(data))
 
    socketio.emit('new user',  data, broadcast=False)

    
@socketio.on('winner')
def onWin(data):

    socketio.emit('winner',  data, broadcast=False)
    

@socketio.on('draw')
def onDraw(data):
  
    socketio.emit('draw',  data, broadcast=False)
    
@socketio.on('new game')
def on_newGame(data):
   
    socketio.emit('new game',  data, broadcast=False)
    
@socketio.on('yes')
def on_yes(data):
   
    socketio.emit('yes',  data, broadcast=False)

# Note that we don't call app.run anymore. We call socketio.run with app arg
socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)