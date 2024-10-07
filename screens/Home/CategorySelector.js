import React from "react";
import {styles} from "./homeStyles";
import { Pressable, ScrollView ,Text} from "react-native";
import {capitalizeFirstLetter} from "../utils/validations";

export default function CategorySelector({
    filterSelections,
    setFilterSelections,
    categories,
}){

    const handleFiltersChange = async (index)=>{
         const arr = [...filterSelections];
         arr[index] = !filterSelections[index];
         setFilterSelections(arr);
    }

    return (
      <ScrollView horizontal contentContainerStyle={{columnGap:20,display:"flex",flexDirection:"row",alignItems:"center"}}>
        {categories.map((cat,i)=>(
            <Pressable
              key={cat}
              style={[
                styles.catButton,
                {
                    backgroundColor: filterSelections[i]?"green":"rgba(0, 0, 0, 0.4)"
                }
              ]}
              onPress={()=>{
                handleFiltersChange(i);
              }}
             >
                <Text
                  style={[
                    styles.catButtonText,
                    {
                        color:filterSelections[i]? "#d4f9f7":"white"
                    }
                  ]}
                  >
                    {capitalizeFirstLetter(cat)}
                </Text>
            </Pressable>
        ))}
        
      </ScrollView>
    )

}