from replit import db
from flask import Flask
app = Flask(__name__)
@app.route('/')
def index():
    with open('index.html', 'r') as f:
        return f.read()

@app.route('/util.js')
def utils():
    with open('util.js', 'r') as f:
        return f.read()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
