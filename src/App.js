import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  const db =  require('./assets/db-new.json')
  const [sistema] = useState(['Selecione um sistema', 'Guarapiranga', 'Cantareira', 'Alto Tiete', 'Marsilac', 'Oriental', 'Rio Claro'])
  const [sistemaSelecionado, setsistemaSelecionado] = useState([])
  const [periodo] = useState(['Selecione o periodo', 'JAN', 'FEV'])
  const [periodoSelecionado, setperiodoSelecionado] = useState([])
  const [selectedData, setSelectedData] = useState('{}')
  

  useEffect(() => {
    let data = db
    let filteredData = data.filter(function(item) {
      return item.data === periodoSelecionado && item.nome === sistemaSelecionado
    })

    setSelectedData(JSON.stringify(filteredData, null, 2))
  }, [periodoSelecionado, sistemaSelecionado])
  
  return (
    <View style={styles.container}>
      <Image source={require('./sabesp.png')} style={styles.logo}/>
      <Picker
        selectedValue={sistemaSelecionado}
        style={{height:30, width: 150, alignSelf:'center'}}
        onValueChange={(itemValue) =>
          setsistemaSelecionado(itemValue)
        }>
          {
            sistema.map(cr =>{
              return <Picker.Item label={cr} value={cr} />
            })
          }
      </Picker>
      <Picker
        selectedValue={periodoSelecionado}
        style={{height:30, width: 150, alignSelf:'center'}}
        onValueChange={(itemValue) =>
          setperiodoSelecionado(itemValue)
        }>
          {
            periodo.map(cr =>{
              return <Picker.Item label={cr} value={cr} />
            })
          }
      </Picker>
      <Text style={styles.textStyles}>{selectedData}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  logo: {
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
    width: '12%',
    height: '12%',
    alignSelf: 'flex-start'

  },
  textStyles: {
    marginBottom: '1%',
    color: 'black',
    alignSelf: 'center'
}
});