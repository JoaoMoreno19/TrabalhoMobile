import React, { useState } from 'react';
import { Alert, SafeAreaView, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0000CD",
    color: "#808080",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
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
      <Text> 
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
      <Button title = "Login" onPress = {validacaoLogin} />
    </SafeAreaView>
  );
};

export default Login;
