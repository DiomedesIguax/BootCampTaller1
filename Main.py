from flask import Flask, jsonify
import random
import string
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def generate_users(num_users):
    users = []
    domains = set()

    # Lista de dominios adicionales
    additional_domains = ['yahoo.com', 'outlook.com', 'aol.com']

    for _ in range(num_users):
        name = ''.join(random.choices(string.ascii_letters, k=5))
        
        # Selección aleatoria del dominio, incluyendo los dominios adicionales
        email = f"{name}@{random.choice(['gmail.com', 'hotmail.com'] + additional_domains)}"
        
        # Generación de una contraseña con longitud mayor a 8 dígitos
        password = ''.join(random.choices(string.ascii_letters + string.digits, k=random.randint(9, 15)))
        
        users.append({"name": name, "email": email, "password": password})
        domains.add(email.split('@')[1])

    return users, domains

@app.route('/users')
def get_users():
    users, domains = generate_users(500000)
    passwords_gt_8 = sum(1 for user in users if len(user['password']) > 8)
    domains_count = len(domains)
    return jsonify({"users": users, "passwords_gt_8": passwords_gt_8, "unique_domains": domains_count})

if __name__ == '__main__':
    app.run(debug=True)