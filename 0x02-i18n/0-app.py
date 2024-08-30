#!/usr/bin/env python3
""" Basic Flask app """
from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def hello_world():
    """ call html file """
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run(port=3000, debug=True)
