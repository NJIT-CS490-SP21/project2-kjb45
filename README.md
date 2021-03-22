# Flask and create-react-app

## Requirements (run all of these)
1. `npm install`
2. `pip install Flask`
3. `pip install -r requirements.txt`
4. `pip install flask-socketio`
5. `pip install flask-cors`
6. `npm install socket.io-client --save`
7. `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs`
    - enter yes to all prompts
8. `sudo service postgresql initdb`
9. `sudo service postgresql start`
10. `pip install psycopg2-binary`
11. `pip install Flask-SQLAlchemy==2.1`
12. `npm install --save-dev @testing-library/react`



## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Libraries Imported: (should have installed all of these from above)
1. os
2. Flask
3. Flask_SocketIO
4. Flask_Cors
5. dotenv
6. flask_sqlalchemy

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the directory where you saved the project, and run `npm run start`
3. Preview web page in browser '/'

## Technical Isues
1. Had problems initially with socketio.  Too many people were initially getting emits
2. Had problems understanding on socket at first; quickly learned solutions for this though
3. Had a hard time passing props to functions inside of Board.js -- had to add 
4. leaderboard only displays new user when the page is refreshed

## Problems
1. There is technically no first player as of right now. Therefore the X player would have to play first
2. The button to start a new game isnt lined up in a good position.  need to fix css
3. I plan on adding a turn so a player can strictly play on their turn 
4. might be some unused states; need to go back and clean up the code a little
5. After clicking the yes button to start a new game the option doesnt go away -- worked fine on aws.  need to trackback on that
6. both users can still play on each others turns -- need to fix by M3

