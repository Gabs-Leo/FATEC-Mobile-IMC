import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Importa o Picker para selecionar sexo

export default function App() {
  const [altura, setAltura] = useState<string>("");
  const [peso, setPeso] = useState<string>("");
  const [idade, setIdade] = useState<string>("");
  const [sexo, setSexo] = useState<string>("Masculino");
  const [imc, setImc] = useState<number | null>(null);

  const calcularIMC = () => {
    const alturaFloat = parseFloat(altura.replace(",", "."));
    const pesoFloat = parseFloat(peso.replace(",", "."));
    const idadeInt = parseInt(idade);

    if (
      isNaN(alturaFloat) ||
      isNaN(pesoFloat) ||
      alturaFloat <= 0 ||
      pesoFloat <= 0 ||
      isNaN(idadeInt) ||
      idadeInt <= 0
    ) {
      Alert.alert(
        "Valores inválidos",
        "Por favor, insira valores válidos para peso, altura e idade.",
      );
      return;
    }

    const imcCalculado = pesoFloat / (alturaFloat * alturaFloat);
    setImc(imcCalculado);
    Keyboard.dismiss(); // Esconde o teclado após o cálculo
  };

  const getIMCCategory = (imc: number) => {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc >= 18.5 && imc < 24.9) return "Peso normal";
    if (imc >= 25 && imc < 29.9) return "Sobrepeso";
    if (imc >= 30 && imc < 34.9) return "Obesidade Grau I";
    if (imc >= 35 && imc < 39.9) return "Obesidade Grau II";
    return "Obesidade Grau III";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Altura (m)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      {/* Campo de Idade */}
      <TextInput
        style={styles.input}
        placeholder="Idade"
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
      />

      {/* Campo de Sexo usando Picker */}
      <Text style={styles.label}>Sexo:</Text>
      <Picker
        selectedValue={sexo}
        style={styles.picker}
        onValueChange={(itemValue) => setSexo(itemValue)}
      >
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Feminino" value="Feminino" />
      </Picker>

      <Button title="Calcular IMC" onPress={calcularIMC} />

      {imc !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Seu IMC: {imc.toFixed(2)}</Text>
          <Text style={styles.result}>{getIMCCategory(imc)}</Text>
          <Text style={styles.result}>Idade: {idade} anos</Text>
          <Text style={styles.result}>Sexo: {sexo}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "80%",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: "#333",
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  result: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
});
