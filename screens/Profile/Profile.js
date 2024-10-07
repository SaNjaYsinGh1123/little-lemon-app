import { useCallback, useContext, useEffect, useState } from "react";
import {View, Text, KeyboardAvoidingView, Platform, Pressable, TextInput, ScrollView, Alert,Image} from "react-native";
import { styles } from "./profileStyles";
import { AppContext} from "../../AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateEmail, validateName, validatePhone } from "../utils/validations";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";

function Profile(){
  const {setOnboardingComplete, image, setImage} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [SaveLoading, setIsSaveLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [discard, setDiscord] = useState(1);
  const [orderChecked,setOrderChecked] = useState(false)
  const [passwordChecked,setPasswordChecked] = useState(false)
  const [specialOfferChecked,setSpecialOfferChecked] = useState(false)
  const [newslettersChecked,setNewslettersChecked] = useState(false)
  const [tempImage,setTempImage] = useState("")
  const navigation = useNavigation();

const storeProfileData = async()=>{
  const checkedStringified = JSON.stringify({
    orderChecked,
    passwordChecked,
    specialOfferChecked,
    newslettersChecked
  })
  try {
    setIsSaveLoading(true);
    await AsyncStorage.setItem("firstName",userFirstName);
    await AsyncStorage.setItem("lastName",userLastName);
    await AsyncStorage.setItem("email",userEmail);
    await AsyncStorage.setItem("number",phoneNumber);
    if(tempImage !== ""){
      console.log("yes in profiler");
      await AsyncStorage.setItem("userImage",tempImage);
      setImage(tempImage);
    }else{
      console.log("no");
      await AsyncStorage.removeItem("userImage");
      setImage("");
    }
    await AsyncStorage.setItem("checkedValues",checkedStringified);
    Alert.alert("profile Info Saved!")
  } catch (error) {
    console.log("error on profile page", error);
  }
  setIsSaveLoading(false);
}


const clearData = async ()=>{
  try {
    setClearLoading(true);
    await AsyncStorage.clear();
    setOnboardingComplete(false);

  } catch (error) {
    console.log("error in clear function on profile page",error);
  }
  setClearLoading(false)
}

const fieldsValid = ()=>{
  return (
    validateName(userFirstName) &&
    validateName(userLastName) &&
    validateEmail(userEmail) &&
    validatePhone(phoneNumber)
  )
}

const discardFunction=()=>{
  // navigation.navigate("Home");
  console.log("discard");
  setDiscord(discard+1)
}

const RemovePic=()=>{
  // navigation.navigate("Home");
  console.log("discard");
  setTempImage("")
}

const pickImage = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      // console.log(result.assets[0].uri);
      setTempImage(result.assets[0].uri);
    } else {
      Alert.alert('Image selection was canceled or failed.');
    }
  } catch (error) {
    console.log('Error picking image:', error);
  }
};

const checkboxConfig=[
  {
    labelText: "Order Statuses",
    stateValue:orderChecked,
    setfunction:setOrderChecked
  },
  {
    labelText: "Password changes",
    stateValue:passwordChecked,
    setfunction:setPasswordChecked
  },
  {
    labelText: "Special offers",
    stateValue:specialOfferChecked,
    setfunction:setSpecialOfferChecked
  },
  {
    labelText: "Newsletters",
    stateValue:newslettersChecked,
    setfunction:setNewslettersChecked
  },
]


useEffect(()=>{
  (
    async()=>{
      try {
        setIsLoading(true);
        const firstName = await AsyncStorage.getItem("firstName");
        const lastName = await AsyncStorage.getItem("lastName");
        const email = await AsyncStorage.getItem("email");
        const phone = await AsyncStorage.getItem("number");
        const userImage = await AsyncStorage.getItem("userImage");
        const userChecked = await AsyncStorage.getItem("checkedValues");

        setUserFirstName(firstName);
        setUserLastName(lastName);
        setUserEmail(email);
        setPhoneNumber(phone);
        if(userImage){
          setImage(userImage);
          setTempImage(userImage);
        }

        const parsedChecked = JSON.parse(userChecked);

        if(parsedChecked){
          setOrderChecked(parsedChecked.orderChecked);
          setPasswordChecked(parsedChecked.passwordChecked);
          setSpecialOfferChecked(parsedChecked.specialOfferChecked);
          setNewslettersChecked(parsedChecked.newslettersChecked);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  )();
},[discard])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios"? "padding":"height"}
    >
      <ScrollView contentContainerStyle={{alignItems:"center"}}>

            {isLoading && <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text>Loading...</Text></View>}
            {!isLoading && (
              <View style={styles.body}>
                <Text style={[styles.headerTwo, {color: "white"}]}>
                  Personal Information
                </Text>

                <View>
                  <Text style={styles.label}>Avatar</Text>
                  <View
                    style={{
                      display:"flex",
                      flexDirection:"row",
                      alignItems:"center",
                      columnGap:20
                    }}
                  >
                        {tempImage && (
                          <Image source={{ uri: tempImage }} style={styles.avatar} />
                          )}

                        {!tempImage && (
                          <View style={[styles.avatar,{backgroundColor:"green"}]}>
                                {userFirstName && (
                                  <Text style={{ fontSize: 24, color: "white" }}>
                                    {userFirstName.slice(0, 2).toUpperCase()}
                                  </Text>
                                )}   
                            </View> 
                        )}
                        <Pressable style={styles.changeButton} onPress={pickImage}>
                          <Text style={{fontSize:14,color:"white"}}>Change</Text>
                        </Pressable>
                        <Pressable style={styles.removeButton} onPress={RemovePic}>
                          <Text style={{fontSize:14,color:"black"}}>Remove</Text>
                        </Pressable>
                  </View>
                </View>
                <View>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    style={styles.textInput}
                    value={userFirstName}
                    onChangeText={setUserFirstName}
                    />

                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    style={styles.textInput}
                    value={userLastName}
                    onChangeText={setUserLastName}
                  />

                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.textInput}
                    value={userEmail}
                    onChangeText={setUserEmail}
                  />

                  <Text style={styles.label}>Phone number</Text>
                  <TextInput
                    style={styles.textInput}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>
            </View>
            )}

            <View style={styles.emailView}>
              <Text style={styles.headerTwo}>Email Notifications</Text>
              {checkboxConfig.map((configItem)=>(
                <View style={styles.checkboxContainer} key={configItem.labelText}>
                   <Checkbox value={configItem.stateValue} onValueChange={configItem.setfunction}/>
                   <Text style={styles.checkboxLabel}>{configItem.labelText}</Text>
                </View>
              ))}
            </View>
            <Pressable
              style={styles.logoutButton}
              onPress={()=> clearData()}
              disabled={clearLoading}
              >
              <Text style={styles.largeButtonText}>
                {clearLoading? "Loading...":"Logout"}
              </Text>
            </Pressable>
            <View style={{width:"100%",flex:1,flexDirection:"row",justifyContent:"space-around",marginTop:10,padding:5}}>
                <Pressable
                  style={[styles.bottomButtons,{backgroundColor:"#7c140e",width:"40%"}]}
                  onPress={()=>discardFunction()}
                  >
                    <Text style={styles.smallbuttonText}> Discard</Text>
                </Pressable>
                <Pressable 
                  style={[
                    styles.bottomButtons,
                    {
                      backgroundColor: SaveLoading?"rgba(0,0,0,0.5)":"black",
                      opacity: fieldsValid()?1: 0.5,
                      width:"40%"
                    }
                  ]}
                  onPress={()=>storeProfileData()}
                  disabled={!fieldsValid() || SaveLoading}
                  >
                  <Text style={styles.smallbuttonText}>
                    {SaveLoading?"Loading...":"Save Changes"}
                  </Text>
                </Pressable>
            </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}


export default Profile;