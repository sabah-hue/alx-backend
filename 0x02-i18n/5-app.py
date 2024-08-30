#!/usr/bin/env python3
""" Basic Flask app """
from flask import Flask, render_template
from flask import g, request
from flask_babel import Babel
app = Flask(__name__)
babel = Babel(app)
app.url_map.strict_slashes = False


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


class Config:
    """ config class """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@app.route('/')
def hello_world():
    """ call html file """
    return render_template('5-index.html')


@babel.localeselector
def get_locale():
    """ check match """
    data = request.args.get('locale')
    if data in Config.LANGUAGES:
        return data
    return request.accept_languages.best_match(Config.LANGUAGES)


def get_user():
    """ get user """
    id = request.args.get('login_as', None)
    if id is None or int(id) not in users.keys():
        return None
    return users.get(int(id))


@app.before_request
def before_request():
    """find a user"""
    user = get_user()
    g.user = user


if __name__ == '__main__':
    app.run(port=5000, debug=True)
