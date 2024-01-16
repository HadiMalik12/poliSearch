#Hadi Malik, Jeshal Patel, Dharshana Suresh
from flask import Flask, jsonify
from flask import abort
from flask import make_response
from flask import request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/congress/senator/party/<party>', methods=['GET'])
def get_senators_by_party(party):
  conn = sqlite3.connect('congress.db')
  query = '''
    select state, fname, lname, 
           (strftime("%d",birthday) || '-' || strftime("%m",birthday) || '-' ||
            strftime("%Y",birthday)) birthday, url, twitter, facebook, youtube
    from SENATOR
    where party = ''' + "'" + party + "'" + '''
    order by state
  '''
  cursor = conn.cursor()
  cursor.execute(query)
  records = cursor.fetchall()
  senators = []
  for record in records:
    senators.append({'state':record[0],'fname':record[1],'lname':record[2],'birthday':record[3],
                     'url':record[4],'twitter':record[5],'facebook':record[6],'youtube':record[7]})
  result = {'senators':senators}
  cursor.close()
  conn.close()
  return jsonify(result)

@app.route('/congress/hrep/party/<party>', methods=['GET'])
def get_hrep_by_party(party):
  conn = sqlite3.connect('congress.db')
  query = '''
    select state, district, fname, lname, 
           (strftime("%d",birthday) || '-' || strftime("%m",birthday) || '-' ||
            strftime("%Y",birthday)) birthday, url, twitter, facebook, youtube
    from HREP
    where party = ''' + "'" + party + "'" + '''
    order by state
  '''
  cursor = conn.cursor()
  cursor.execute(query)
  records = cursor.fetchall()
  hreps = []
  for record in records:
    hreps.append({'state':record[0],'district':record[1],'fname':record[2],'lname':record[3],'birthday':record[4],
                     'url':record[5],'twitter':record[6],'facebook':record[7],'youtube':record[8]})
  result = {'hreps':hreps}
  cursor.close()
  conn.close()
  return jsonify(result)

@app.route('/congress/senator/<state_code>', methods=['GET'])
def get_senators_by_state(state_code):
  conn = sqlite3.connect('congress.db')
  query = '''
    select state, fname, lname, party,
           (strftime("%d",birthday) || '-' || strftime("%m",birthday) || '-' ||
            strftime("%Y",birthday)) birthday, url, twitter, facebook, youtube
    from SENATOR
    where state = ''' + "'" + state_code + "'" + '''
    order by state
  '''
  cursor = conn.cursor()
  cursor.execute(query)
  records = cursor.fetchall()
  senators = []
  for record in records:
    senators.append({'state':record[0],'fname':record[1],'lname':record[2],'party':record[3],'birthday':record[4],
                     'url':record[5],'twitter':record[6],'facebook':record[7],'youtube':record[8]})
  result = {'senators':senators}
  cursor.close()
  conn.close()
  return jsonify(result)

@app.route('/congress/hrep/<state_code>', methods=['GET'])
def get_hrep_by_state(state_code):
  conn = sqlite3.connect('congress.db')
  query = '''
    select district, fname, lname, party,
           (strftime("%d",birthday) || '-' || strftime("%m",birthday) || '-' ||
            strftime("%Y",birthday)) birthday, url, twitter, facebook, youtube
    from HREP
    where state = ''' + "'" + state_code + "'" + '''
    order by state
  '''
  cursor = conn.cursor()
  cursor.execute(query)
  records = cursor.fetchall()
  hreps = []
  for record in records:
    hreps.append({'district':record[0],'fname':record[1],'lname':record[2],'party':record[3],'birthday':record[4],
                     'url':record[5],'twitter':record[6],'facebook':record[7],'youtube':record[8]})
  result = {'hreps':hreps}
  cursor.close()
  conn.close()
  return jsonify(result)

@app.route('/congress/legislator/<state_code>', methods=['GET'])
def get_legislators(state_code):
  conn = sqlite3.connect('congress.db')
  query = '''
    select state, fname, lname, party,
           (strftime("%d",birthday) || '-' || strftime("%m",birthday) || '-' ||
            strftime("%Y",birthday)) birthday, url, twitter, facebook, youtube
    from SENATOR
    where state = ''' + "'" + state_code + "'" + '''
    order by state
  '''
  cursor = conn.cursor()
  cursor.execute(query)
  records = cursor.fetchall()
  senators = []
  for record in records:
    senators.append({'state':record[0],'fname':record[1],'lname':record[2],'party':record[3],'birthday':record[4],
                     'url':record[5],'twitter':record[6],'facebook':record[7],'youtube':record[8]})
  query = '''
    select state, fname, lname, party,
           (strftime("%d",birthday) || '-' || strftime("%m",birthday) || '-' ||
            strftime("%Y",birthday)) birthday, district, url, twitter, facebook, youtube
    from HREP
    where state = ''' + "'" + state_code + "'" + '''
    order by state
  ''' 
  cursor.execute(query)
  records = cursor.fetchall()
  hreps = []
  for record in records:
    hreps.append({'state':record[0],'fname':record[1],'lname':record[2],'party':record[3],'birthday':record[4], 'district':record[5],
                     'url':record[6],'twitter':record[7],'facebook':record[8],'youtube':record[9]})
  result = {'senators':senators, 'hreps': hreps}
  cursor.close()
  conn.close()
  return jsonify(result)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    app.run(host='localhost',port='4000',debug=True)