import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, ActivityIndicator, ImageBackground, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import GlobalVars from "../../global/globalVars";

import { GET_USER_INFO, GET_USER_INFO_ENTREPRENEURSHIP, GET_USER_INFO_ESTADISTICS, GET_USER_INFO_PANORAMA, GET_USER_INFO_PRODUCT, GET_USER_INFO_VISIT, SEND_EMAIL } from "../../mock/userInfo";

import updateDataUser from "../../helpers/updateDataUser";
import StoreContext from "../../helpers/globalStates";

import useModal from "../../utils/useModal";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import ButtonComponent from "../../components/atoms/ButtonComponent";
import InputEntry from "../../components/molecules/InputEntry";
import OptionTouchable from "../../components/molecules/ProfileOption";
import Header from "../../components/organisms/Header";
import PickerImage from "../../components/organisms/ChooseImage";
import PickerAvatar from "../../components/organisms/ChooseAvatar";
import PickerCategories from "../../components/organisms/ChooseCategories";
import ScrollView from "../../components/templates/ScrollView";
import WrappingViews from "../../components/templates/WrappingViews";
import ModalAlert from "../../components/templates/ModalAlert";
import ModalTemplate from "../../components/templates/ModalTemplate";
import ModalChangePass from "../../components/templates/ModalChangePass";

/** Styles */
import Styles from "./style";
import IconTouchable from "../../components/molecules/iconTouchable";
import ModalEstadistic from "./modal";
import { async } from "@firebase/util";


const styles = Styles;
const Estadisticas = ({ navigation }) => {
  const { _jwt } = useContext(StoreContext.SecurityContext);
  const { user } = useContext(StoreContext.UserContext);

  const [loading, setLoading] = useState(false)
  const [userCount, setUser] = useState('')
  const [entrepreneurship, setEntrepreneurship] = useState('')
  const [visit, setVisit] = useState('')
  const [panorama, setPanorama] = useState('')
  const [product, setProduct] = useState('');
  const [ToRandomDispatch, setToRandomDispatch] = useState(null);
  const { isShowing: isOpenCategories, toggle: showSelectCategories } =
    useModal();
  const { isShowing: isOpenAvatars, toggle: showSelectAvatar } = useModal();
  const { isShowing: isOpenPasswd, toggle: showChangePass } = useModal();
  const { isShowing: isOpenPhoto, toggle: showChangePhoto } = useModal();
  const { isShowing: isShowingAlert, toggle: setShowhingAlert } = useModal();

  const [showTotalMenu, setShowTotalMenu] = useState(true);
  const [q, setQuery] = useState("");


  const [dataUser, setDataUser] = useState(null);
  const [textAlert, setTextAlert] = useState("");
  const [saving, setSaving] = useState({});

  const [name, setName] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mail, setMail] = useState("");
  const [imageUser, setImageUser] = useState(null);
  const [likedCats, setLikedCats] = useState([]);
  const [avatarSelected, setAvatarSelected] = useState(null);
  const getRandomNumberDispatch = () => {
    // random vals process for generate token for wish
    const attrTemp = Math.random();
    setToRandomDispatch(attrTemp);
  };



  useEffect(() => { }, []);


  const getEstatistics = async () => {
    try {
      setLoading(true);
      const res = await GET_USER_INFO_ESTADISTICS(_jwt);
      console.log('GET_USER_INFO_ESTADISTICS', res);
      setUser(res.data)
      setLoading(false);
    } catch (e) {

      setLoading(false);
    }
  };

  const getEntrepreneurship = async () => {
    try {
      setLoading(true);
      const res = await GET_USER_INFO_ENTREPRENEURSHIP(_jwt);
      console.log('GET_USER_INFO_ENTREPRENEURSHIP', res);
      setEntrepreneurship(res.data)
      setLoading(false);
    } catch (e) {

      setLoading(false);
    }
  };

  const getVisit = async () => {
    try {
      setLoading(true);
      const res = await GET_USER_INFO_VISIT(_jwt);
      console.log('GET_USER_INFO_VISIT', res);
      setVisit(res.data)
      setLoading(false);
    } catch (e) {

      setLoading(false);
    }
  };

  const getPanorama = async () => {
    try {
      setLoading(true);
      const res = await GET_USER_INFO_PANORAMA(_jwt);
      console.log('GET_USER_INFO_PANORAMA', res);
      setPanorama(res.data)
      setLoading(false);
    } catch (e) {

      setLoading(false);
    }
  };

  const getProduct = async () => {
    try {
      setLoading(true);
      const res = await GET_USER_INFO_PRODUCT(_jwt);
      console.log('GET_USER_INFO_PRODUCT', res);
      setProduct(res.data)
      setLoading(false);
    } catch (e) {

      setLoading(false);
    }
  };

  useEffect(() => {
    getEstatistics()
    getEntrepreneurship()
    getVisit()
    getPanorama()
    getProduct()
  }, []);

  const [resp, setRESP] = useState('')

  const senEmail = async (sendData, api) =>{
    try {
      setLoading(true);
      const URL_API_USER_DATA = `${GlobalVars.urlapi}/${api}/csv`;
      const res = await fetchPost(URL_API_USER_DATA,sendData,_jwt);
      console.log('csv', res.data);
      setLoading(false);
      setRESP(res.data)
    } catch (error) {
      setLoading(false);
    }
  }

  const [all, setAll] = useState(false)

  const senAllEmail = async (sendData, api) =>{
    try {
      setLoading(true);
     const getAll =[ `${GlobalVars.urlapi}/user/csv`,
      `${GlobalVars.urlapi}/entrepreneurship/csv`,
      `${GlobalVars.urlapi}/visit/csv`,
      `${GlobalVars.urlapi}/panorama/csv`,
      `${GlobalVars.urlapi}/product/csv`]

      let resp = await getAll.map(async (url, index)=>{
        const res = await fetchPost(url,sendData,_jwt);
        console.log('getAll',res);
        getAll.length -1 === index && setRESP(res.data)
      })
      await Promise.all(resp).then((res) => {
        setLoading(false)
        console.log(res);
        
      } )
      console.log('allEnd',resp);
     
      // setRESP(res.data)
    } catch (error) {
      setLoading(false);
    }
  }

  const fetchPost = async (url, data, token) => {
    console.log(data);
    
    try {
      let headers;
      if (token) {
        headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        };
      } else {
        headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };
      }
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      // console.warn(error);
      return "error";
    }
  };


  const card = (name, data, api) => {
    return(
      <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        alignSelf:'center',
        borderRadius:10 ,
        padding:10,
        paddingVertical:15,
        borderWidth:0.5,
        borderColor:"#0002",
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.46,
        
        elevation: 9,
marginVertical:10
      }}
    >
      <Text
       style={{
        color:GlobalVars.orange,
        fontWeight:'bold',
        fontSize:30,
        width: 80,
        textAlign: 'center',
      }}
      >{data}</Text>
      <Text
      style={{
        color:GlobalVars.orange,
        fontSize:15,
      }}
      >{name}</Text>
      <View
      style={{
        flexDirection:'row',
       }}
      >
      <TouchableOpacity>
        <View style={styles2.container}>
          <Image
            style={styles2.stretch}
            source={require("../../../assets/descargar.png")}
            />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=>{
        showChangePhoto();
        setSaving(api)
      }}
      >
        <View style={styles2.container}>
          <Image
            style={styles2.stretch}
            source={require("../../../assets/Correo.png")}
            />
          <Image
            style={{ width:10, height:10, top:13, left:17, position:'absolute' }}
            source={require("../../../assets/right.png")}
            />
        </View>
      </TouchableOpacity>
        </View>

    </View>
    )
  }

  return (
    <WrappingViews>
      <StatusBarComponent />
      <Header
        navigation={navigation}
        user={user}
        _jwt={_jwt}
        title="Estadísticas"
        ToRandomDispatch={ToRandomDispatch}
        isJustTitle
      />

      <ImageBackground
        source={require("../../../assets/images/trama_bg.png")}
        resizeMode="cover"
        style={styles.bgView}
      >
        <ScrollView
          style={styles.scrolling}
          contentContainerStyle={styles.wrapScrollView}
          colorScrollBar={GlobalVars.orange}
        >
          <View style={[styles.viewContainer, { backgroundColor: 'transparent', marginTop:-30 }]}>

         {card('usuarios',userCount,'user')}
         {card('Negocios',entrepreneurship, 'entrepreneurship')}
         {card('visitas',visit, 'visit' )}
         {card('Panoramas',panorama, 'panorama' )}
         {card('Productos',product, 'product' )}
         <View
         style={{
          width: '100%',
          height: 100
         }}
         ></View>
          </View>
        </ScrollView>

        <TouchableOpacity
         onPress={()=>{
          showChangePhoto();
          setAll(true)
        }}
        style={{
          width:Dimensions.get('screen').width*0.7,
          backgroundColor:GlobalVars.orange,
          alignSelf:'center',
          padding:10,
          borderRadius:7,
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top:-30
        }}
        >
          <Text
          style={{
            color:'white',
          }}
          >Enviar todas</Text>
        </TouchableOpacity>
      </ImageBackground>


      <ModalTemplate
        openModal={isOpenPhoto}
        onHelp={() => null}
        aditionalStyleModal={{
          justifyContent: "center",
          alignItems: "center",
          marginTop:-120,
        }}
        aditionalStyleContainer={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <ModalEstadistic
         loading={loading}
         onClose={showChangePhoto}
         api={saving}
         apiFNEmail={senEmail}
         apiSendAll={senAllEmail}
         setAllBolean={all}
         setAll={setAll}
         resp={resp}
         setRESP={setRESP}
        />
      </ModalTemplate>
    </WrappingViews>
  );
};

export default Estadisticas;

const styles2 = StyleSheet.create({
  container: {
    width: 23,
    height: 23,
    marginLeft:24
  },
  stretch: {
    width: 23,
    height: 23,
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



const styles1 = StyleSheet.create({
  touchableItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconstyle: {},
});
