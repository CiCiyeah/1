import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {Calendar,LocaleConfig} from 'react-native-calendars';

import {
 StyleSheet,
 Text,
 View,
 Image,
 TextInput,
 Button,
 TouchableOpacity,
 Alert,
 ScrollView,
} from "react-native";



  
const Stack = createNativeStackNavigator();
export default function App() {
  return (
  <NavigationContainer>
  <Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Register" component={RegisterScreen} />
  <Stack.Screen name ="Store" component={StoreScreen}/>
  <Stack.Screen name ="WrongPassword" component={PasswordScreen}/>
  <Stack.Screen name ="FailRegister" component={FailRegisterScreen}/>
  </Stack.Navigator>
  </NavigationContainer>
  );
 }
 
 const StoreScreen  = ({navigation}) => {
  return(
    <View style ={styles.container}>
    <Text> This is store page</Text>
    <StatusBar style="auto" />
    <TouchableOpacity style={styles.loginBtn} onPress={() =>
navigation.navigate("Home")}>
 <Text style={styles.loginText}>Home</Text>
 </TouchableOpacity>
    </View>
    
  );
 };
 const PasswordScreen  = ({navigation}) => {
  return(
    <View style ={styles.container}>
    <Text> Wrong email or password </Text>
    <StatusBar style="auto" />
    <TouchableOpacity style={styles.loginBtn} onPress={() =>
navigation.navigate("Home")}>
 <Text style={styles.loginText}>Home</Text>
 </TouchableOpacity>
    </View>
    
  );
 };
 const FailRegisterScreen  = ({navigation}) => {
  return(
    <View style ={styles.container}>
    <Text> User already exists </Text>
    <StatusBar style="auto" />
    <TouchableOpacity style={styles.loginBtn} onPress={() =>
navigation.navigate("Home")}>
 <Text style={styles.loginText}>Home</Text>
 </TouchableOpacity>
    </View>
    
  );
 };
 const HomeScreen = ({navigation}) => {
  var emailCorrect =1;
  var passwordCorrect =1;
  var register = false;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  function onLoginPressed(){
    // Set initial error values to empty
    setEmailError("")
    setPasswordError("")
    // Check if the user has entered both fields correctly
    if ("" === email) {
    setEmailError("Please enter your email")
    emailCorrect=0;
    }
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    setEmailError("Please enter a valid email")
    emailCorrect=0;
    }
    if ("" === password) {
    setPasswordError("Please enter a password")
    passwordCorrect=0;
    }
    else if (password.length < 8) {
    setPasswordError("The password must be 8 characters or longer")
    passwordCorrect=0;
    }
    // Authentication calls will be made here...
    // Check if email has an account associated with it
    if(emailCorrect ==1 && passwordCorrect==1)
    {
      fetch("http://10.0.2.2:3080/auth", {
      method: "POST",
      headers: {
      'Content-Type': 'application/json'
      },

      body: JSON.stringify({email, password,register})
      })
      .then(r => r.json())
      .then(r => {
        if ('success' === r.message) {
        console.log("You are logged i:) ")
        navigation.navigate("Store")
        } else {
        navigation.navigate("WrongPassword")
        console.log("Wrong email or password")
        }
      })
    }
    }
    return (
      
      <View style={styles.container}>
      <Text style={styles.loginText}>Chung Wing Hong</Text>
      <Text style={styles.loginText}>1155177482</Text>
      <Image style={styles.image} source={require("./assets/favicon.png")} />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
      <TextInput
      style={styles.TextInput}
      placeholder="Email."
      placeholderTextColor="#003f5c"
      onChangeText={(email) => setEmail(email)} />
      </View>
      <View style ={styles.errorView}>
      {emailError !== "" && <Text>{emailError}</Text>}
      </View>
      <View style={styles.inputView}>
      <TextInput
      style={styles.TextInput}
      placeholder="Password."
      placeholderTextColor="#003f5c"
      secureTextEntry={true}
      onChangeText={(password) => setPassword(password)} /> 
      </View>
      <View style ={styles.errorView}>
      {passwordError !== "" && <Text>{passwordError}</Text>}
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => onLoginPressed()}>
 <Text style={styles.loginText}>Login</Text>
 </TouchableOpacity>
 <TouchableOpacity style={styles.loginBtn} onPress={() =>
navigation.navigate("Register")}>
 <Text style={styles.loginText}>Register</Text>
 </TouchableOpacity>
 </View>
 );
};
const RegisterScreen = ({navigation}) => {
  var emailCorrect =1;
  var passwordCorrect =1;
  var rePasswordCorrect =1;
  var register = true;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [gender,setGender] = useState("Male");
  const [mood,setMood]= useState('Male');
  const[selected,setSelected]= useState('');
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [repasswordError, rePasswordError] = useState("")
  function onRegisterPressed(props){
    // Set initial error values to empty
    setEmailError("")
    setPasswordError("")
    rePasswordError("")
    // Check if the user has entered both fields correctly
    if ("" === email) {
    setEmailError("Please enter your email")
    emailCorrect =0;
    }
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    setEmailError("Please enter a valid email")
    emailCorrect=0;
    }
    if ("" === password) {
    setPasswordError("Please enter a password")
    passwordCorrect=0;
    }
    if (password.length < 8) {
    setPasswordError("The password must be 8 characters or longer")
    passwordCorrect=0;
    }
    if("" === rePassword){
    rePasswordError("Please re-enter the password")
    rePasswordCorrect=0;
    }
    if (password !== rePassword) {
    rePasswordError("Not the same")
    rePasswordCorrect=0;
    }
    // Authentication calls will be made here...
    if(emailCorrect==1&&passwordCorrect==1&&rePasswordCorrect==1)
    {
      fetch("http://10.0.2.2:3080/auth", {
      method: "POST",
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password,register,gender,selected})
      })
      .then(r => r.json())
      .then(r => {
        if ('signed in' === r.message) {
        console.log("should be signed in")
        navigation.navigate("Store")
        } else {
        console.log("Sign in failed")
        navigation.navigate("FailRegister")
        }
      })
    }
  }
 
    
    
    return (
      <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
      <Text>Chung Wing Hong</Text>
      <Text>1155177482</Text>
      <Image style={styles.image} source={require("./assets/favicon.png")} />
      <StatusBar style="auto" />
      <View style={styles.inputView}>

      <TextInput
      style={styles.TextInput}
      placeholder="Email."
      placeholderTextColor="#003f5c"
      onChangeText={(email) => setEmail(email)} />
      </View>
      <View style ={styles.errorView}>
      {emailError !== "" && <Text>{emailError}</Text>}
      </View>
      <View style={styles.inputView}>
      <TextInput
      style={styles.TextInput}
      placeholder="Password."
      placeholderTextColor="#003f5c"
      secureTextEntry={true}
      onChangeText={( password) => setPassword(password)} /> 
      </View>
      <View style ={styles.errorView}>
      {passwordError !== "" && <Text>{passwordError}</Text>}
      </View>
      <View style={styles.inputView}>
      <TextInput
      style={styles.TextInput}
      placeholder="Re-enter Password."
      placeholderTextColor="#003f5c"
      secureTextEntry={true}
      onChangeText={(rePassword) => setrePassword(rePassword)} /> 
      </View>
   
      <View style ={styles.errorView}>
      {rePasswordError !== "" && <Text>{repasswordError}</Text>}
      </View>
      <TouchableOpacity style={styles.button} onPress={() =>
      navigation.navigate("Home")}>
      <Text style={styles.button}>Home</Text>
      </TouchableOpacity>
      <View style={styles.wrapper}>
        {['Male','Female'].map(gender=>(
        
            <View key={gender} style={styles.mood}>
            <Text style={styles.gender}>{gender}</Text>
            <TouchableOpacity style={styles.outter}
            onPress={()=> setMood(gender)}>
            {mood === gender && <View style ={styles.inner}/>}
      </TouchableOpacity>
      </View>
       ))}
       </View>
       <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
      />
      
      <TouchableOpacity style={styles.loginBtn} onPress={() => 
      onRegisterPressed()}>
 <Text style={styles.loginText}>Register</Text>
 </TouchableOpacity>
 </View>
</ScrollView>
 )
};

const styles = StyleSheet.create({
  button:{
    margintop: 1,
    marginright: 2,
    top:0,
    right:0,
  },

  gender:{
      marginHorizontal:15,
  },
  mood:{
    marginHorizontal:15,
    alignItems:'center',
  },
  wrapper:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:10,
  },
  container: {
  flex: 1,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
  },
  inner:{
    width:25,
    height:25,
    backgroundColor:'gray',
    borderRadius:10,
  },
  outter:{
    width:30,
    height:30,
    borderWidth:1,
    borderRadius: 15,
    justifyContent:'center',
    alignItems:'center',
  },
  image: {
  marginBottom: 40,
  },
  inputView: {
  backgroundColor: "#FFC0CB",
  borderRadius: 30,
  width: "70%",
  height: 45,
  marginBottom: 20,
  alignItems: "center",
  },
  TextInput: {
  height: 50,
  flex: 1,
 padding: 10,
 marginLeft: 20,
 },
 forgot_button: {
 height: 30,
 marginBottom: 30,
 },
 loginBtn: {
 width: "80%",
 borderRadius: 25,
 height: 50,
 alignItems: "center",
 justifyContent: "center",
 marginTop: 40,
 backgroundColor: "#FF1493",
 },
});
