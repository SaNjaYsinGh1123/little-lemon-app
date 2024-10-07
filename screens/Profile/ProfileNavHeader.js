import React, { useContext, useEffect, useState }  from "react";
import {View,Text, StyleSheet,Image,Pressable} from "react-native"
import arrow from "../images/arrow-left.png";
import logo from "../images/Logo.png"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../AppContext";


export default function ProfileNavHeader(){
   const [isLoading, setIsLoading] = useState(false);
   const [userFirstName, setUserFirstName] = useState("");
   const [navImage,setNavImage] = useState("");
   const {image}  = useContext(AppContext);
   const navigation = useNavigation();
   useEffect(()=>{
    (
        async()=>{
            
            try {
                setIsLoading(true);
                const firstName = await AsyncStorage.getItem("firstName");
                const userImage = await AsyncStorage.getItem("userImage");
                setUserFirstName(firstName);
                console.log("userImage in profile",userImage);
                setNavImage(userImage);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
    )();
   }, [image]);

   return (
    <View style={{display:"flex",flexDirection:"row",paddingTop:30,paddingHorizontal:10,justifyContent:"space-between",alignItems:"center"}}>
        {isLoading && <View><Text>Loading...</Text></View>}
        {!isLoading && <>
        <Pressable style={({pressed}) =>[{height:40,width:40,borderWidth:1,borderColor:"black",borderRadius:90,display:"flex",justifyContent:"center",alignItems:"center"},{ backgroundColor: pressed ? "green" : "white" },]}
               onPress={()=>navigation.goBack()}>
            <Image source={arrow} style={{height:32,width:32,resizeMode:"contain"}}/>
        </Pressable>
        <Image source={logo} style={{height:70,width:200,resizeMode:"contain"}}/>
        {navImage && <Image source={{uri: navImage}} style={{height:44,width:44,borderRadius:90,display:"flex",justifyContent:"center",alignItems:"center"}}/>}
        {!navImage && (
          <View style={{backgroundColor:"green",height:44,width:44,borderRadius:90,display:"flex",justifyContent:"center",alignItems:"center"}}>
            {userFirstName && (
                <Text style={{fontSize:22}}>
                  {userFirstName.slice(0,2).toUpperCase()}
                </Text>
             )}
          </View>
        )}
     </>
        }
    </View>
   )




}