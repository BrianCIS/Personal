import flask
from flask import jsonify 
from flask import request, make_response
from sql import create_connection
from sql import execute_query
from sql import execute_read_query



app = flask.Flask(__name__) #sets up the application
app.config["DEBUG"] = True #allow to show errors in browser

@app.route('/api/addcelestialobject', methods=['POST'])
def add_object():
    request_data = request.get_json()
    newname = request_data['name']
    newdistance = request_data['distance']
    newdescription = request_data['description']
    newyear = request_data['discoverydate']
        
    conn = create_connection("hw1.ccjto1slte4p.us-east-2.rds.amazonaws.com", "admin", "brian3368", "HW1")
    insert_celestial_object = "INSERT INTO celestial_object (name, distance, description, discoverydate) values('{}', '{}', '{}','{}')".format(newname, newdistance, newdescription, newyear)
    execute_query(conn, insert_celestial_object)
    return "<p>POST REQUEST WORK</p>"

@app.route('/api/deletecelestialobject', methods=['DELETE'])
def del_object():
    request_data = request.get_json()
    del_id = request_data['id']
    conn = create_connection("hw1.ccjto1slte4p.us-east-2.rds.amazonaws.com", "admin", "brian3368", "HW1")
    sql = "DELETE FROM `HW1`.`celestial_object` WHERE id = %s" % (del_id)
    execute_query(conn, sql) 
    return "<p>POST REQUEST WORK</p>"

@app.route('/api/getfurthestcelestialobject', methods=['GET'])
def furthest_object():
    conn = create_connection("hw1.ccjto1slte4p.us-east-2.rds.amazonaws.com", "admin", "brian3368", "HW1")
    sql= "select * from `celestial_object` order by `distance` desc limit 1"
    celestial_object=execute_read_query(conn, sql)
    return jsonify(celestial_object)

@app.route('/api/getmostrecentthree', methods=['GET'])
def recent_objects():
    conn = create_connection("hw1.ccjto1slte4p.us-east-2.rds.amazonaws.com", "admin", "brian3368", "HW1")
    sql= "select * from `celestial_object` order by `discoverydate` desc limit 3"
    celestial_object=execute_read_query(conn, sql)
    return jsonify(celestial_object)

app.run()
