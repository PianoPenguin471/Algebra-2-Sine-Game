from flask import Flask, render_template
app = Flask(__name__)


@app.route('/')
def index():
    with open('index.html', 'r') as f:
        return f.read()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
