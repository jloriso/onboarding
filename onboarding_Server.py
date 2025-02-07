from flask import Flask, request, render_template, jsonify, url_for, session, redirect
import csv
import os
import configparser

app = Flask(__name__)
app.secret_key = os.urandom(24)

config = configparser.ConfigParser()
config.read('vault.ini')

try:
    ACCESS_KEY = app.config.get('ACCESS_KEY', 'default_key')
except KeyError:
    print("Error: ACCESS_KEY not found")
    exit(1)

@app.route('/', methods=['GET', 'POST'])
def onboarding():
    if request.method == 'POST':
        entered_key = request.form.get('access_key')
        if entered_key == ACCESS_KEY:
            session['access_granted'] = True
            return redirect(url_for('onboarding')) # Redirect after successful login
        else:
            return render_template('login.html', error="Incorrect key")

    if session.get('access_granted'):
        return render_template('onboarding.html')
    return render_template('login.html')

@app.route('/onboarding_data')
def view_data_page():
    return render_template('onboarding_data.html')

@app.route('/save_data', methods=['POST'])
def save_data():
    data = request.form.get('data') # Get data from the POST request

    if data:
        try:
            with open('wiit_onboarding_data.csv', 'a') as f: # 'a' for append mode
                f.write(data + '\n') # Add newline after each entry
            return "Data saved successfully!"
        except Exception as e:
            return f"Error saving data: {str(e)}"
    return "No data received"

@app.route('/view_data')
def view_data():
    try:
        with open('wiit_onboarding_data.csv', 'r') as file:
            csv_reader = csv.reader(file)
            data = list(csv_reader)

        return jsonify(data)  # Return data as JSON

    except FileNotFoundError:
        return jsonify({"error": "CSV file not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/logout')
def logout():
    session.pop('access_granted', None)
    return redirect(url_for('onboarding'))

if __name__ == '__main__':
    app.run(debug=True) # debug=True for development