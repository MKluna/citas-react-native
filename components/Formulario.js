import React, {useState} from 'react';
import shortid from 'shortid';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Formulario = ({citas, setCitas, setmostrar}) => {
  const [fecha, setfecha] = useState('');
  const [hora, sethora] = useState('');
  const [paciente, setpaciente] = useState('');
  const [propietario, setpropietario] = useState('');
  const [telefono, settelefono] = useState('');
  const [sintomas, setsintomas] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const crearNuevaCita = () => {
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' ||
      sintomas.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === ''
    ) {
      mostrarAlerta();
      return;
    }
    const cita = {paciente, propietario, telefono, fecha, hora, sintomas};
    cita.id = shortid.generate();
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);
    setmostrar(false);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Todos los campos son obligatorios', [
      {
        text: 'OK',
      },
    ]);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = date => {
    const opciones = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };
    setfecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = hours => {
    const opciones = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    };
    sethora(hours.toLocaleString('en-US', opciones));
    hideTimePicker();
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente: </Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setpaciente(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Dueño: </Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setpropietario(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Teléfono de Contacto: </Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => settelefono(texto)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha : </Text>
          <Button title="Seleccionar fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
          />
          <Text>{fecha}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora : </Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
            is24Hour
          />
          <Text>{hora}</Text>
        </View>
        <View>
          <Text style={styles.label}>Síntomas: </Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={texto => setsintomas(texto)}
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => crearNuevaCita()}
            style={styles.btnSubmit}>
            <Text style={styles.txtSubmit}>Crear nueva cita &times;</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  txtSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
