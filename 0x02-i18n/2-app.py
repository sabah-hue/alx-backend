#!/usr/bin/env python3
""" Basic Flask app """
from flask import Flask, render_template
from flask_babel import Babel
app = Flask(__name__)
app.url_map.strict_slashes = False


class Config:
    """ config class """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@app.route('/')
def hello_world():
    """ call html file """
    return render_template('2-index.html')


if __name__ == '__main__':
    app.run(port=3000, debug=True)
