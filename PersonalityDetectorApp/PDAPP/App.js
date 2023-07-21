import { StatusBar } from 'expo-status-bar';
import { useState} from 'react';
import { TextInput } from 'react-native';
import { ImageBackground, TouchableHighlight} from 'react-native';
import { SafeAreaView, StyleSheet, Text, View , Image} from 'react-native';
import { Linking } from 'react-native';
import React from 'react';

const type_bank = [
  {TYPE:false,what:'Error fetching Tweets',more:'ERROR',img:0},
  {TYPE:'INTP',what:'Innovative Inventor',more:'https://www.16personalities.com/intp-personality',img:1},
  {TYPE:'ENTJ',what:'Bold, Strong-Willed Leader',more:'https://www.16personalities.com/entj-personality',img:2},
  {TYPE:'ENTP',what:'Smart and Curious Thinker',more:'https://www.16personalities.com/entp-personality',img:3},
  {TYPE:'INFJ',what:'Quiet, Inspiring Idealist',more:'https://www.16personalities.com/infj-personality',img:4},
  {TYPE:'ENFJ',what:'Charismatic Leader',more:'https://www.16personalities.com/enfj-personality',img:5},
  {TYPE:'INFP',what:'Poetic, Kind Altruist',more:'https://www.16personalities.com/infp-personality',img:6},
  {TYPE:'ENFP',what:'Enthusiastic, Creative Sociable Spirit',more:'https://www.16personalities.com/enfp-personality',img:7},
  {TYPE:'ISTJ',what:'Practical, Fact-Minded',more:'https://www.16personalities.com/istj-personality',img:8},
  {TYPE:'ESTJ',what:'Excellent Administrator',more:'https://www.16personalities.com/estj-personality',img:9},
  {TYPE:'ISTP',what:'Bold, Practical Experimenter',more:'https://www.16personalities.com/istp-personality',img:10},
  {TYPE:'ESTP',what:'Smart and Perceptive',more:'https://www.16personalities.com/estp-personality',img:11},
  {TYPE:'ISFP',what:'Flexible, Charming Artist',more:'https://www.16personalities.com/isfp-personality',img:12},
  {TYPE:'ESFP',what:'Spontaneous and Energetic',more:'https://www.16personalities.com/esfp-personality',img:13},
  {TYPE:'ISFJ',what:'Dedicated, Warm Protector',more:'https://www.16personalities.com/isfj-personality',img:14},
  {TYPE:'ESFJ',what:'Caring and Popular',more:'https://www.16personalities.com/esfj-personality',img:15},
  {TYPE:'INTJ',what:'Imaginative and Strategic Thinker',more:'https://www.16personalities.com/intj-personality',img:16},
];

export default function App() {
  const [home,setHome] = useState(true);
  const [text, onChangeText] = useState('');
  const [result,setResult] = useState(type_bank[0]);
  return (<>
      <StatusBar barStyle='dark-content'/>
      <SafeAreaView style={styles.container}>
        { home == true
          && <HomeScreen go={setHome} onChangeText={onChangeText} text={text} setResult={setResult}></HomeScreen>
         }
         { home == false
           && <Predictor text={text} onChangeText={onChangeText} back={setHome} result={result}></Predictor>
         }
      </SafeAreaView>    
  </>);
}

const HomeScreen = (props) => {
  const showResult= () => {
    if (props.text && !(props.text.indexOf(" ") >= 0)){
      let p1 = props.text.length;
      p1 = (p1%16)+1;
      props.setResult(type_bank[p1])
      props.go(false);}
    else{
      console.warn('Invalid Handle!')
    }
  }
  return <View style = {styles.container2}>
      <ImageBackground source={require('./assets/bgimg.jpg')} style={{height:900}}>
      <View style={styles.heading}>
        <Text style={{...styles.heading_text,textShadowColor:'purple',textShadowOffset:{width:1},textShadowRadius:2}}>Personality Detection App</Text>
      </View>
    <View>
    <Text style={{...styles.heading_text,fontSize:18,marginTop: 20, color:'white',padding:20,
                  textShadowColor:'pink',textShadowOffset:{width:1},textShadowRadius:2,justifyContent:'flex-start'
                  }}>
        Just Enter a Twitter Handle and we will use our Machine Learning Models 
        to Predict what kind of Personality the user has based on its recent tweets!
    </Text>
      <Text style={{...styles.heading_text,fontSize:18,marginTop:5, color:'white',padding:10,
                  textShadowColor:'grey',textShadowOffset:{width:1},textShadowRadius:2
                  }}>       
        Make sure you have Internet Connection!
      </Text>
    </View>
    <View style={styles.checkout}>
    <Text style={{...styles.heading_text,fontSize:20,color:'white',textShadowColor:'red',textShadowOffset:{width:1},textShadowRadius:1}}> Enter Twitter Handle below</Text>
    </View>
    <View style={{flex:0}}>
    <TextInput
        style={styles.input}
        onChangeText={props.onChangeText}
        value={props.text}
        placeholder='Twitter Handle'
        placeholderTextColor={'white'}
      />
    <TouchableHighlight style={{...styles.checkout,backgroundColor:'white',
              borderRadius:50,borderTopLeftRadius:50,borderBottomLeftRadius:50,marginLeft:20,marginRight:20}}
              onPress={showResult}>
        <Text style={{...styles.heading_text,color:'black',
              textShadowColor:'skyblue',textShadowOffset:{width:2,height:3},textShadowRadius:1}}>Check your Personality!</Text>               
    </TouchableHighlight>
    </View>
    </ImageBackground>
    </View>
};

const Predictor = (props) => {
        var Images = [
          require('./assets/icon.png'),
          require('./assets/types/intp.png'),
          require('./assets/types/entj.png'),
          require('./assets/types/entp.png'),
          require('./assets/types/infj.png'),
          require('./assets/types/enfj.png'),
          require('./assets/types/infp.png'),
          require('./assets/types/enfp.png'),
          require('./assets/types/ISTJ.png'),
          require('./assets/types/estj.png'),
          require('./assets/types/istp.png'),
          require('./assets/types/estp.png'),
          require('./assets/types/isfp.png'),
          require('./assets/types/esfp.png'),
          require('./assets/types/isfj.png'),
          require('./assets/types/esfj.png'),
          require('./assets/types/intj.png'),
      ];
    return <View style = {styles.container2}>
        <ImageBackground source={require('./assets/bgimg.jpg')} style={{height:900}}>
        <View style={styles.heading}>
          <Text style={{...styles.heading_text,textShadowColor:'purple',textShadowOffset:{width:1},textShadowRadius:2}}>Personality Detection App</Text>
        </View>
        <View style={{marginTop: 20,marginHorizontal:40}}>
          <Text style={styles.result_head}> @{props.text} is </Text>
            {props.result.TYPE && <>
            <Text style={styles.result_type}> {props.result.TYPE} </Text>
            <Text style={styles.result_detail}> {props.result.what} </Text>
            <Image source = {Images[props.result.img]} style={styles.result_img}/>
            <Text style={styles.result_link}
                onPress={() => Linking.openURL(props.result.more)}>
                Click to Learn more about {props.result.TYPE}!
              </Text></>}
            {props.result.TYPE == false &&
            <Text style={{...styles.result_head,marginTop:100,marginBottom:400}}>Predicting...</Text>
            }
        </View>
      <TouchableHighlight style={{...styles.checkout,width:100,alignSelf:'flex-end'}}onPress={()=>{props.onChangeText('');props.back(true);}}>
        <Text style={{...styles.heading_text,color:'white',
              textShadowColor:'skyblue',textShadowOffset:{width:2,height:3},textShadowRadius:1}}>Back</Text> 
      </TouchableHighlight>
    </ImageBackground>
    </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: 'white',
  },
  container2: {
    flex: 0.09,
    backgroundColor: 'white',
    marginTop: 32
  },
  checkout:{
    backgroundColor:'black' ,
    height:70 ,
    marginVertical: 20,
    marginLeft: 10,
    justifyContent: 'center' ,
    alignItems:'center',
    borderTopLeftRadius:70,
    borderBottomLeftRadius:20,
    },  
  heading:{
    backgroundColor:'white', 
    height: 70, 
    justifyContent: 'center' ,
    alignItems: 'center' ,
    margin: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 50,
    marginTop: 25,
    marginHorizontal: 5
  },
  heading_text:{
    color:'black',
    fontSize: 25,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  input: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 30,
    height: 60,
    width: '95%',
    margin: 12,
    borderWidth: 2,
    padding: 12,
    color:'white',
    borderColor: 'white',
  },
  result_head:{
    color:'white',
    fontSize:30,
    fontFamily: 'monospace',
    fontWeight: 500
  },
  result_type:{
    color:'white',
    fontSize:80,
    fontFamily: 'monospace',
    fontWeight: 500,
    textShadowColor:'magenta',
    textShadowOffset:{width:2,height:1},
    textShadowRadius:1
  },
  result_detail:{
    color:'white',
    fontSize:25,
    fontFamily: 'monospace',
    fontWeight: 500
  },
  result_link:{
    color:'pink',
    fontSize:20,
    fontFamily: 'monospace',
    fontWeight: 300,
    fontStyle:'italic'
  },
  result_img:{
    height: 250,
    width: 250,
    marginVertical:50,
    marginHorizontal:30,
    borderRadius: 90,
  }
});
