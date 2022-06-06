import json
from flask import Flask
app = Flask(__name__)
scores = None
with open('scores.json', 'r') as f:
    scores = json.load(f)
@app.route('/')
def index():
    with open('index.html', 'r') as f:
        return f.read()

@app.route('/util.js')
def utils():
    with open('util.js', 'r') as f:
        return f.read()

@app.route('/leaderboard')
def leaderboard():
    with open('leaderboard.html', 'r') as f:
        return f.read()

@app.route('/success/<name>')
def success(name):
    scores[name] += 1
    print(scores)
    # Save scores to file
    return str(scores[name])

if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', port=80, debug=True)
    except:
        with open('scores.json', 'w') as f:
            json.dump(scores, f)
