import React, {useContext, useState} from 'react';
import {Button, Card, Icon, Text} from '@ui-kitten/components';
import {StyleSheet, View, FlatList, TextInput} from 'react-native';
import {StoreContext} from '../context/storeContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BottomSheetModal from './bottomSheetModal';

const styles = StyleSheet.create({
  container: {flex: 1},
  card: {flex: 1, margin: 5},
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 999,
    borderRadius: 60,
    width: 60,
    height: 60,
  },
  modalView: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: '50%',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  textInput: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'lightgrey',
    marginVertical: 10,
  },
  modalButton: {
    marginVertical: 10,
  },
  cardText: {textAlign: 'center', fontWeight: 'bold'},
});

export const Compradores = () => {
  const {compradores, setCompradores} = useContext(StoreContext);
  const [nombreComprador, setNombreComprador] = useState('');
  const [mailComprador, setMailcomprador] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [primaraPantalla, setPrimeraPantalla] = useState(true);
  const [colorComprador] = useState('red');

  const crearComprador = () => {
    setCompradores([
      ...compradores,
      {
          nombre: nombreComprador,
          email: mailComprador,
          color: colorComprador,
          id: Math.random().toString(10),
      },
    ]);
    console.log(compradores);
    setNombreComprador('');
    setMailcomprador('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <BottomSheetModal
        visible={modalVisible}
        onClosePressed={() => setModalVisible(false)}
        title='Crear un comprador'>
        <>
            {primaraPantalla && (
              <PrimeraPantalla
                nombreComprador={nombreComprador}
                setNombreComprador={setNombreComprador}
                mailComprador={mailComprador}
                setMailcomprador={setMailcomprador}
                crearComprador={crearComprador}
                setPrimeraPantalla={setPrimeraPantalla}
              />
            )}
        </>
      </BottomSheetModal>
      <Button
        style={styles.button}
        accessoryLeft={PlusIcon}
        onPress={() => setModalVisible(true)}
      />
      <FlatList
        data={compradores}
        numColumns={2}
        renderItem={({item}) => {
          return (
            <Card
            style={{...styles.card, backgroundColor: item.color}}
            key={item.id}>
            <Text style={styles.cardText}>{item.nombre} - {item.email}</Text>
            </Card>
          );
        }}
      />
    </View>
  );
};

const PrimeraPantalla = ({
    nombreComprador,
    setNombreComprador,
    mailComprador,
    setMailcomprador,
    crearComprador,
    setPrimeraPantalla,
  }) => {
    return (
      <>
        <TextInput
          placeholder="Nombre del Comprador"
          style={styles.textInput}
          value={nombreComprador}
          onChangeText={(nuevoTexto) => {
            setNombreComprador(nuevoTexto);
            console.log(nuevoTexto);
          }}
        />
        <TouchableOpacity onPress={() => setPrimeraPantalla(false)}>
          <TextInput
            placeholder="Email del Comprador"
            style={styles.textInput}
            value={mailComprador}
            onChangeText={(nuevoTexto) => {
              setMailcomprador(nuevoTexto);
              console.log(nuevoTexto);
            }}
          />
        </TouchableOpacity>
        <Button style={styles.modalButton} onPress={() => crearComprador()}>
          Crear Comprador
        </Button>
      </>
    );
  };

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;