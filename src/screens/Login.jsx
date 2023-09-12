import React, { useState } from 'react';
import { Alert, SafeAreaView, TextInput, Text,  StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0000CD",
    color: "white",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: 'white',
    width: 300,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  text : {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24, 
    textAlign: 'center', 
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    color: 'black',
    fontWeight: 'bold',
  },
});

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validacaoLogin = () => {
    if (email.trim() !='' || password.trim() != '') {
      navigation.navigate('Home');
    } else {
      Alert.alert('O preenchimento dos campos é obrigatório');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style = {styles.text}> 
        Página de login
      </Text>
      <TextInput
        placeholder = "E-mail"
        style = {styles.input}
        onChangeText = {setEmail}
        value = {email}
      />
      <TextInput 
        secureTextEntry
        placeholder = "Senha"
        style = {styles.input}
        onChangeText = {setPassword}
        value = {password}
      />
      <Button title = "Login" onPress = {validacaoLogin} style = {styles.button} />
    </SafeAreaView>
  );
};

export default Login;
