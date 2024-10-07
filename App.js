import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home/Home';
import Profile from './screens/Profile/Profile';
import HomeNavHeader from './screens/Home/HomeNavHeader';
import ProfileNavHeader from './screens/Profile/ProfileNavHeader';
import { AppContext } from './AppContext';
import Onboarding from './screens/Onboarding/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingNavHeader from './screens/Onboarding/OnboardingNavHeader';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [image, setImage] = useState("");

  useEffect(()=>{
    (
      async()=>{
        try {
          setIsLoading(true);
          const email = await AsyncStorage.getItem("email");
          console.log("!email is false if email is some string");
          setOnboardingComplete(!!email)
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
      }
    )();

  },[]);

  if(isLoading) return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text>Loading...</Text></View>
  return (
    <AppContext.Provider
      value={{ onboardingComplete, setOnboardingComplete, image, setImage}}
    >
        <NavigationContainer>
          <Stack.Navigator>
            {onboardingComplete? (<>

              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  header: ()=> <HomeNavHeader/>
                }}
                />
                
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                  header:()=> <ProfileNavHeader/>
                }}
              />
            
            </>):(<>
             <Stack.Screen
               name="Onboarding"
               component={Onboarding}
               options={{
                header:()=> <OnboardingNavHeader/>
               }}
             />
            </>)}

                
          </Stack.Navigator>
        </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
