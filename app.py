import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./build/static')
cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
import models
db.create_all()



socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)



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
    
    # new_user = models.Leaders(username=data['user'],wins=0)
    # db.session.add(new_user)
    # db.session.commit()
    
    all_users = models.Leaders.query.all()
    users = []
    for people in all_users:
        users.append(people.username)
    print(users)
    
    if data['user'] not in users:
        print(str(data['user']) + " is not currently in all users")
        new_user = models.Leaders(username=data['user'], wins=0)
        db.session.add(new_user)
        db.session.commit()
    else:
        print("user already in DB")
    
    socketio.emit('new user',  data, broadcast=False)

    
@socketio.on('winner')
def onWin(data):
    
    
    winner = db.session.query(models.Leaders).get(data['winnerName'])
    winner.wins = winner.wins +1
                    
    db.session.commit()
    # user = models.Leaders.query.filter_by(username=data['winnerName'])
    # user.wins = 1;
    # db.session.add(user.wins)
    # db.session.commit()
    socketio.emit('winner',  data, broadcast=True, include_self=False)
    

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
if __name__ == "__main__":
# Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )