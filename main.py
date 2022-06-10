from replit import db
from flask import Flask, request
import time
app = Flask(__name__)
db["last_start"] = time.time()

@app.route('/leaderboard')
def leaderboard():
	with open('leaderboard.html', 'r') as f:
		scores_dict = {}
		for key in db.keys():
			if not 'last_start' in key:
				scores_dict[key] = db[key]
		return f.read().replace("SCORES", str(scores_dict))


@app.route('/')
def index():
    with open('index.html', 'r') as f:
        return f.read()

@app.route('/util.js')
def utils():
    with open('util.js', 'r') as f:
        return f.read()

@app.route('/complete')
def complete():
	user_name = 'No_Name'
	print(db.keys())
	
	try:
		user_name = request.args.get('name')
	except Exception as e:
		return e
	if user_name not in db.keys():
		db[user_name] = 0
	current_score = db[user_name]
	db[user_name] = int(current_score) + 1
	return str(db[user_name])
	

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
