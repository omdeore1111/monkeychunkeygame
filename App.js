
import * as React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Header } from 'react-native-elements';
import  db from './localdb';
import PhonicSoundButton from './components/PhonicSoundButton';
export default class App extends React.Component {
  constructor() {
    super();
    // initializing
    this.state = { text: '', chunks: [] , phonicSounds:[] }

  }
  render() {
    return (
      <View style={styles.container}>
        <Header backgroundColor={"yellow"}
          centerComponent={{
            text: "Monkey Chunkey", style: { color: "black", fontSize: 20 }
          }} />
        {/* to add images in the application (image Component) */}
        <Image style={styles.imageIcon} source={{
          uri: 'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png'
        }} />
        {/* text input is used for displaying the input box and get the input  */}
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text
            })

          }} value={this.state.text} />
        <TouchableOpacity style={styles.goButton} onPress={() => {
          // ternary operator !! from 35 to 48 whole within!!
          // to convvert uppercase characters to lowercase characters
         var word = this.state.text.toLowerCase().trim();
         db[word]?
          (this.setState({
          chunks:db[word].chunks
          }),
          
            // to display the chunks below the input box from local db (whatever the word written in the inputbox and by searching in local db the 
            //   associated chunks will be displayed)
            //this.state.displayTxt
           
          this.setState({
            phonicSounds:db[word].phones
          })
          ):Alert.alert("we dont this word sry");
        }}>


          <Text style={styles.buttonText}>
            press button
          </Text>

        </TouchableOpacity>
         <View>
           {/* to loop the chunks and display them in separate lines below one another by map method */}
            {this.state.chunks.map((item, index)=>{
              return (
                <PhonicSoundButton wordChunk = {this.state.chunks[index]} soundChunk = {this.state.phonicSounds[index]} buttonIndex = {index}/>
              // <TouchableOpacity style = {styles.chunkButton}>               
              // <Text style = {styles.displayText}>{item}</Text>  
              // </TouchableOpacity>
            );     
        
            })}
         </View>
       
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  inputBox: {
    marginTop: 200, width: '80%', alignSelf: 'center', height: 40, textAlign: 'center', outline: 'none', borderWidth: 4,
  },
  goButton: { width: '50%', height: 55, alignSelf: 'center', padding: 10, margin: 10 }, buttonText: {
    textAlign: 'center',
    fontSize: 38,
    fontFamily: 'elephant',
    fontWeight: 'bold',

  },
  
  imageIcon: { width: 150, height: 150, marginLeft: 75 },
  
});
