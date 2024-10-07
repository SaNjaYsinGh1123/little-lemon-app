import {
    View,
    Text,
    Image,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    Platform

} from "react-native";
import { styles} from "./homeStyles"
import cook from "../images/cook.png"
import { useCallback, useEffect, useMemo, useState } from "react";
import  {menuDataUrl} from "./apiDefinitions";
import debounce from "lodash.debounce"
import MenuItem from "./MenuItem"
import CategorySelector from "./CategorySelector";

import {
  createTable,
  getMenuItems,
  saveMenuItems,
  deleteMenuItems,
  filterByQueryAndCategories,
} from "../../database"


function Home(){
    const [search,setSearch] = useState("");
    const [menuData, setMenuData] = useState([]);
     const categories = ["starters", "mains", "desserts", "drinks", "specials"];
     const [filterSelections, setFilterSelections] = useState(
        categories.map(() => false)
      );

    const [query, setQuery] =useState("");



   const fetchData = async()=>{
    let fetchedData = [];
    try{
      const res = await fetch(menuDataUrl);
      fetchedData = await res.json();
      console.log("yes");
    }catch (error){
        console.log("error fetching data", error);
    }
     return fetchedData
   }


   useEffect(()=>{
   
    (async ()=>{
      try{
        // console.log('createtTable',createTable);
        await createTable();
        // await deleteMenuItems();
        let menuItems = await getMenuItems();

        if(!menuItems.length){
          const menuItems = await fetchData();
          saveMenuItems(menuItems.menu);
        }
        menuItems = await getMenuItems();
        setMenuData(menuItems);
        console.log("yoo");

      }catch(error){
        console.log("error in fetching data, not saving in db ",error);
      }
    })();

   },[])

   useEffect(()=>{
     (async ()=>{
        const activeCategory = categories.filter((str, index)=>{
            if(filterSelections.every((sel)=> sel === false)){
                return true;
            }
            return filterSelections[index];
        });
        

        try{
            const menuItems = await filterByQueryAndCategories(query,activeCategory);
            console.log(menuItems);
            setMenuData(menuItems);    
        }catch(err){
            console.log(err);
        }
     })();

   },[filterSelections, query]);

   const lookup  =useCallback((q)=>{
      setQuery(q);
   },[]);


   const debouncedLookup = useMemo(()=>debounce(lookup,500),[lookup]);

   const handleSearchChange = (text)=>{
    setSearch(text);
    debouncedLookup(text);
 }
   

    return (
        <KeyboardAvoidingView
          style={{flex:1,flexDirection:"column",alignItems:"center"}}
          behavior={Platform.OS === "ios"? "padding":"height"}
        >

          <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <View>
                        <Text style={styles.headerOne}>Home</Text>
                        <Text style={styles.headerTwo}>Chicago</Text>
                        <Text style={styles.textBlock}>
                            We are a family owned Meditterranean restaurant, focused on
                            traditional recipes served with a modern twist.
                        </Text>
                    </View>
                    <Image source={cook} style={{width:130,height:"auto",resizeMode:"contain"}}/>
                </View>
                <TextInput 
                  style={{backgroundColor:"white",width:"90%",height:50,marginTop:20,marginBottom:40,marginHorizontal:"auto",borderRadius:10,paddingHorizontal:5,}}
                  value={search}
                  onChangeText={handleSearchChange}
                  placeholder="Search"
                  />
          </View>
          <View style={{height:80,alignSelf:"flex-start",paddingLeft:15,}}>
            <Text style={{alignSelf:"flex-start",fontSize:18,fontWeight:"bold"}}>ORDER FOR DELIVERY!</Text>
            <CategorySelector
               filterSelections = {filterSelections}
               setFilterSelections= {setFilterSelections}
               categories = {categories}
            />
          </View>
          <FlatList
            contentContainerStyle={{alignItems:"stretch", paddingHorizontal:15}}
            data={menuData}
            renderItem={({item}) => <MenuItem data={item} />}
            keyExtractor={(item)=> item.id}
            />
        </KeyboardAvoidingView>
    )
   
}


export default Home;