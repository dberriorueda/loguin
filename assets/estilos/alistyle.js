import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcomeText:{
      fontSize:18,
      fontWeight:'bold',
      marginBottom:10,
    },
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      backgroundColor: 'blue',
      padding: 20,
      width: 200,
      borderRadius: 15,
    },
    optionIcon: {
      fontSize: 24,
      marginRight: 10,
    },
    optionText: {
      fontSize: 16,
    },
  });
  export {styles}