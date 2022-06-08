from flask import Flask, request, jsonify
from flask_basicauth import BasicAuth
from textblob import TextBlob
from sklearn.linear_model import LinearRegression

import pickle

modelo = pickle.load(open('modelo.sav','rb'))

app = Flask(__name__)
app.config['BASIC_AUTH_USERNAME'] = 'mario'
app.config['BASIC_AUTH_PASSWORD'] = 'alura'

basic_auth = BasicAuth(app)

# Definindo rotas da api
@app.route('/')
def home():
    return "Minha Primeira API."

@app.route('/sentimento/<frase>')
@basic_auth.required
def sentimento(frase):
    tb = TextBlob(frase)
    tb_en = tb.translate(from_lang='pt_br', to='en')
    polaridade = tb_en.sentiment.polarity
    return "Polaridade: {}".format(polaridade)

# @app.route('/cotacao/<int:tamanho>')
# def cotacao(tamanho):
#     preco = modelo.predict([[tamanho]])
#     return "Preço: {}".format(preco)


colunas = ['tamanho','ano','garagem']

@app.route('/cotacao/', methods=['POST'])
@basic_auth.required
def cotacao():
    dados = request.get_json()
    dados_input = [dados[col] for col in colunas]
    preco = modelo.predict([dados_input])
    return jsonify(preco=preco[0])

app.run(debug=True)

# Observação

# O ambiente virtual montado não funcionou: ImportError: cannot import name 'escape' from 'jinja2' 
# Resolução: instalar a versão do flask 2.1.0 ao invés da versão corrente utilizada no ambiente local (1.1.2)