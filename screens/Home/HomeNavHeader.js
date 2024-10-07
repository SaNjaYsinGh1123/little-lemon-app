import React, {useContext,useEffect,useState} from "react";
import {View, Image, StyleSheet, Text, Pressable} from "react-native";
import logo from "../images/Logo.png"
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeNavHeader(){
 const [isLoading,setIsLoading] = useState(false);
 const [userFirstName,setUserFirstName] = useState("");
 const navigation =  useNavigation();
 const {image, setImage} = useContext(AppContext);
 
    useEffect(()=>{
    (
        async()=>{
        try {
            setIsLoading(true);
            const firstName = await AsyncStorage.getItem("firstName");
            const userImage = await AsyncStorage.getItem("userImage");
            console.log('userImage',userImage);
            setUserFirstName(firstName);
            setImage(userImage);
        } catch (error) {
            console.log(error);
        }
        }
    )();

    },[]);

    return (
        <View style={styles.container}>
            <View style={{width:44,background:"green"}}/>
            <Image source={logo} style={styles.logo}/>
            {image && (
                <Pressable onPress={()=> navigation.navigate("Profile")}>
                    <Image source={{uri: image}} style={{height:50,width:50,borderRadius:50,marginRight:10}}/>
                </Pressable>
            )}
            {!image && (
                <Pressable 
                    style={styles.avator}
                    onPress={()=> navigation.navigate("Profile")}
                >
                    {userFirstName && (
                        <Text style={{fontSize:22}}>
                            {userFirstName.slice(0,2).toUpperCase()}
                        </Text>
                    )}
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        paddingTop:30,
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal:10
    },
    logo:{
        height:70,
        width:200,
        resizeMode:"contain"
    },
    avator:{
        height:44,
        width:44,
        backgroundColor:"green",
        borderRadius:50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderColor:"black",
        borderWidth:1
    }
})