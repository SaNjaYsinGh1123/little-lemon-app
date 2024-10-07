import React from "react";
import { StyleSheet,View,Text,Image } from "react-native";
import { getImageUrl } from "./apiDefinitions";

export default function MenuItem({data}){
   console.log("yo");
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.name}</Text>
            <View style={{display:"flex",flexDirection:"row"}}>
                <View>
                    <Text style={styles.description}>{data.description}</Text>
                    <Text style={styles.price}>${data.price}</Text>
                </View>
                <Image
                style={{width:50,height:60}}
                  source={{uri: getImageUrl(data.image)}}
                  accessibilityLabel={data.name}
                />
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
      width: "100%",
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
    description: { marginTop: 10, width: 290, marginRight: 10 },
    title: {
      fontWeight: "bold",
    },
    price: {
      fontWeight: "700",
      color: "rgba(0, 0, 0, 0.8)",
      marginTop: 10,
    },
    image: {
      width: 50,
      height: 60,
    },
  });