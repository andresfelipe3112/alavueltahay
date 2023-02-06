import React, { useState, useEffect } from "react";

import { View, TouchableOpacity, ActivityIndicator, Image, StyleSheet, TextInput, Text } from "react-native";

import GlobalVars from "../../global/globalVars";
const ModalEstadistic = ({loading, onClose, api, apiFNEmail, resp,setRESP, apiSendAll, setAllBolean,setAll}) => {
  const [text, setText] = useState('')


  return (
    <View style={{width:250, height:200, backgroundColor:'white'}}>

          <TouchableOpacity style={{}} onPress={()=>{
            onClose()
            setRESP('')
            setAll(false)
          }
          }>
          <View style={styles2.container}>
              <Image
                style={styles2.stretch}
                source={require("../../../assets/close-orange.png")}
                />
            </View>
          </TouchableOpacity>
         {resp !== '' ?

         <>
          <Text
              style={{
                color:GlobalVars.orange,
                alignSelf:'center',
                textAlign:'center',
                fontWeight:'bold',
                marginTop:20
              }}
              >{resp}</Text>
         </>

         :
         <>
              {loading && <ActivityIndicator color={GlobalVars.orange} size='small' style={{position:'absolute', alignSelf:'center', top:15 }} />}
         <TextInput
            style={{
              borderWidth:0.5,
              borderColor:'gray',
              borderRadius:8,
              alignSelf:'center',
              padding:10,
              width:'85%',
              height:50,
              fontSize:13
            }}
            onChangeText={(e)=> setText(e)}
            placeholder='Ingrese el correo'
            ></TextInput>    
            <TouchableOpacity
            style={{
              alignSelf:'center',
              backgroundColor:GlobalVars.orange,
              padding:10,
              borderRadius:10,
              marginTop:15
            }}
            onPress={async()=> {
              let res =setAllBolean?  apiSendAll({email:text.toLocaleLowerCase()}): await  apiFNEmail({email:text.toLocaleLowerCase()},api) 
              console.log(res);
            }}
            >
              <Text
              style={{
                color:'white'
              }}
              >Enviar</Text>
            </TouchableOpacity>
                </>
                }
    </View>
  );
};

export default ModalEstadistic;


const styles2 = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    alignSelf:'flex-end',
    margin:10
  },
  stretch: {
    width: 40,
    height: 40,
    resizeMode: "stretch",
  },
  containerFocus: {
    width: 42,
    height: 42,
  },
  stretchFocus: {
    width: 42,
    height: 42,
  },
});