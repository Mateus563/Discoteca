import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {StyleSheet, Text, View, Button, Pressable, FlatList, TextInput,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import * as SQLite from "expo-sqlite";

export default function Discoteca() {
    const [discoteca, setDiscoteca] = useState([]);
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState(0);
    const [tempo, setTempo] = useState(0);
    const [tipoAlbum, setTipoAlbum] = useState("");
    const [lancamento, setLancamento] = useState(0);
    
    async function buscarDiscoteca() {
        const resposta = await fetch("https://6ae534cf28393034b08e2fb4.mockapi.io/Discoteca");
        const dados = await resposta.json();
        setDiscoteca(dados);
    }

    async function salvarDiscoteca() {
        await fetch("https://6ae534cf28393034b08e2fb4.mockapi.io/Discoteca", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: nome, valor: valor, tempo: tempo, tipoAlbum: tipoAlbum, lancamento: lancamento }),
        });
        setNome("");
        setValor("");
        setTempo("");
        setTipoAlbum("");
        setLancamento("");

        buscarDiscoteca();
    }

    useEffect(() => {
        buscarDiscoteca();
    }, []);

    return (
        <SafeAreaView style={styles.tela} edges={["bottom"]}>
            <Stack.Screen options={{ title: "Meus álbuns" }} />

            <TextInput
                style={styles.campo}
                value={nome}
                onChangeText={setNome}
                placeholder="Nome do Álbum"
            />
            <TextInput
                style={styles.campo}
                value={valor}
                onChangeText={setValor}
                placeholder="Valor"
            />
            <TextInput
                style={styles.campo}
                value={tempo}
                onChangeText={setTempo}
                placeholder="Tempo"
            />
            <TextInput
                style={styles.campo}
                value={tipoAlbum}
                onChangeText={setTipoAlbum}
                placeholder="Tipo de Álbum"
            />
            <TextInput
                style={styles.campo}
                value={lancamento}
                onChangeText={setLancamento}
                placeholder="Lançamento"
            />

            <Button title="Salvar Disco" onPress={salvarDiscoteca} />

            <FlatList
              style={styles.lista}
                data={discoteca}
                renderItem={({ item }) => (
                    <Text style={styles.item}>
                       {item.id} - {item.nome} - {item.valor}
                    </Text>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  campo: {
    borderWidth: 1,
    borderColor: "#D9DDE3",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#111827",
    marginBottom: 12,
  },

  lista: {
    flex: 1,
    marginTop: 16,
  },

  item: {
    backgroundColor: "#F1F3F6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    fontSize: 15,
    color: "#111827",
  },
});