# Flask and create-react-app

## Requirements (run all of these)
1. `npm install`
2. `pip install -r requirements.txt`
3. `pip install -U flask-cors`
4. `pip install flask-socketio`
5. `pip install Flask`



## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Libraries Imported: (should have installed all of these from above)
1. os
2. Flask
3. Flask_SocketIO
4. Flask_Cors

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the directory where you saved the project, and run `npm run start`
3. Preview web page in browser '/'

## Technical Isues
1. Had problems initially with socketio.  Too many people were initially getting emits
2. Had problems understanding on socket at first; quickly learned solutions for this though

## Problems
1. There is technically no first player as of right now. Therefore the X player would have to play first
2. The button to start a new game isnt lined up in a good position.  need to fix css
3. I plan on adding a turn so a player can strictly play on their turn 
4. might be some unused states; need to go back and clean up the code a little
5. After clicking the yes button to start a new game the option doesnt go away -- worked fine on aws.  need to trackback on that
