from flask import Flask,jsonify,g

import sqlite3


app = Flask(__name__)
DATABASE = 'database.db'

""" def get_db():
    db=getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db """

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/customers', methods=['GET'])
def get_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM customers')
    data = cursor.fetchall()
    conn.close()
    """ return data """
    
    json_data = []
    for row in data:
        json_data.append(dict(row))
        
    return jsonify(json_data)

""" @app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close() """


@app.route('/')
def index():
    """ db = get_db()
    cur = db.execute('SELECT * FROM customers')
    entries = cur.fetchall()
    return str(entries) """
    data = get_data()
    return data

if __name__ == '__main__':
    app.run(debug=True)