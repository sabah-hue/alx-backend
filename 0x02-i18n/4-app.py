#!/usr/bin/env python3
""" Basic Flask app """
from flask import Flask, render_template
from flask import g, request
from flask_babel import Babel
app = Flask(__name__)
babel = Babel(app)
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
    return render_template('4-index.html')


@babel.localeselector
def get_locale():
    """ check match """
    data = request.args.get('locale')
    if data in Config.LANGUAGES:
        return data
    return request.accept_languages.best_match(Config.LANGUAGES)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
