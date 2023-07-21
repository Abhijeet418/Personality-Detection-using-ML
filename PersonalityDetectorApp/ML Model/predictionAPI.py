from flask import Flask, request , jsonify ,json
from keras.models import load_model
import pickle
from tensorflow.keras.preprocessing.sequence import pad_sequences
import tweepy

app = Flask(__name__)

def predict_personality_CNN(tweet):
    inp = []
    inp.append(tweet)
    tweet = inp[:]
    # Fetch Additional Info about the Models such as Tokenizers,etc..
    with open('./CNN_Models/Additional.pickle','rb') as file:
        toks = pickle.load(file)
        I_tok = toks[0]
        N_tok = toks[1]
        F_tok = toks[2]
        P_tok = toks[3]
        
    # Convert tweet into sequence
    I_post = I_tok[2].texts_to_sequences(tweet)
    N_post = N_tok[2].texts_to_sequences(tweet)
    F_post = F_tok[2].texts_to_sequences(tweet)
    P_post = P_tok[2].texts_to_sequences(tweet)
    
    # Pad the Sequences according to max length T
    I_post = pad_sequences(I_post,maxlen=I_tok[0])
    N_post = pad_sequences(N_post,maxlen=N_tok[0])
    F_post = pad_sequences(F_post,maxlen=F_tok[0])
    P_post = pad_sequences(P_post,maxlen=P_tok[0])
    
    # Load the Models
    IE_Model = load_model('./CNN_Models/IE_CNN.h5')
    SN_Model = load_model('./CNN_Models/SN_CNN.h5')
    TF_Model = load_model('./CNN_Models/TF_CNN.h5')
    JP_Model = load_model('./CNN_Models/JP_CNN.h5')
    
    # Predict Personality
    pi = IE_Model.predict(I_post,verbose=0)
    pn = SN_Model.predict(N_post,verbose=0)
    pf = TF_Model.predict(F_post,verbose=0)
    pp = JP_Model.predict(P_post,verbose=0)
    
    # Provide Results
    
    mbti = ''
    intro = int(round(pi[0][0],1)*100)
    intuit = int(round(pn[0][0],1)*100)
    feel = int(round(pf[0][0],1)*100)
    percep = int(round(pp[0][0],1)*100)
    if intro >= 50:
        mbti+='I'
    else:
        mbti+='E'
    if intuit >= 50:
        mbti+='N'
    else:
        mbti+='S'
    if feel >= 50:
        mbti+='F'
    else:
        mbti+='T'
    if percep >= 50:
        mbti+='P'
    else:
        mbti+='J'
    #Generate Results
    details = f''' {intro}% Introvert \n {100 -(intro)}% Extrovert
                    \n {intuit}% Intutive \n {100 -(intuit)}% Sensing
                    \n {feel}% Feeler \n {100 -(feel)}% Thinker
                    \n {percep}% Perceptive \n {100 -(percep)}% Judging
                '''
    result = {'Personality':mbti,'Details':details}

    return result

@app.route('/predict')
def test():
    return jsonify({'hello':'world'})

@app.route('/predict', methods=['POST'])
def MBTI():
    t = request.form.get('handle')
    out = predict_personality_CNN(t)
    return jsonify({'output':tweets})

if __name__ == '__main__':
    app.run(debug=True)