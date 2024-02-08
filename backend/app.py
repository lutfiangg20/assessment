from flask import Flask,jsonify,g,request

import sqlite3
from flask_cors import CORS


app = Flask(__name__)
DATABASE = 'database.db'
CORS(app)

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

@app.route('/api/customers', methods=['POST'])
def add_data():
    # Get JSON data from the request
    data = request.json

    # Connect to the database
    conn = get_db_connection()

    # Insert data into the database
    conn.execute('INSERT INTO customers (name, instagram_users,favorite_outfit_color) VALUES (?, ?,?)',
                 (data['name'], data['instagram_users'],data['favorite_outfit_color']))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Data added successfully'})

@app.route('/api/customers/<int:id>', methods=['DELETE'])
def delete_entry(id):
    # Connect to the database
    conn = get_db_connection()

    # Execute the delete operation
    conn.execute('DELETE FROM customers WHERE id = ?', (id,))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Entry deleted successfully'})

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