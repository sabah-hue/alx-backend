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
    id = request.args.get('login_as')
    if id is not None and int(id) in users.keys():
        x = int(id)
        return users[x]
    return None


@app.before_request
def before_request():
    """find a user"""
    g.user = get_user()


@babel.timezoneselector
def get_timezone():
    """timezone"""
    zone = request.args.get('timezone', None)
    if zone:
        try:
            return timezone(zone).zone
        except pytz.exceptions.UnknownTimeZoneError:
            pass
    if g.user:
        try:
            zone = g.user.get('timezone')
            return timezone(zone).zone
        except pytz.exceptions.UnknownTimeZoneError:
            pass
    defaut = app.config['BABEL_DEFAULT_TIMEZONE']
    return defaut


if __name__ == '__main__':
    app.run(port=5000, debug=True)
