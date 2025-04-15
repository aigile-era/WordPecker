import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button, FAB, Portal, Modal, TextInput } from 'react-native-paper';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

interface WordList {
  id: string;
  name: string;
  description: string;
  wordCount: number;
  createdAt: Date;
}

export const WordListScreen = () => {
  const [lists, setLists] = useState<WordList[]>([]);
  const [visible, setVisible] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    if (!user) return;

    try {
      const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'wordLists'));
      const fetchedLists = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as WordList[];
      setLists(fetchedLists);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  const createNewList = async () => {
    if (!user || !newListName.trim()) return;

    try {
      const docRef = await addDoc(collection(db, 'users', user.uid, 'wordLists'), {
        name: newListName.trim(),
        description: newListDescription.trim(),
        wordCount: 0,
        createdAt: new Date(),
      });

      setLists(prev => [...prev, {
        id: docRef.id,
        name: newListName.trim(),
        description: newListDescription.trim(),
        wordCount: 0,
        createdAt: new Date(),
      }]);

      setNewListName('');
      setNewListDescription('');
      setVisible(false);
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const deleteList = async (listId: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'wordLists', listId));
      setLists(prev => prev.filter(list => list.id !== listId));
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const renderItem = ({ item }: { item: WordList }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph>Kelime Sayısı: {item.wordCount}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => deleteList(item.id)}>Sil</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Title>Yeni Liste Oluştur</Title>
          <TextInput
            label="Liste Adı"
            value={newListName}
            onChangeText={setNewListName}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Açıklama"
            value={newListDescription}
            onChangeText={setNewListDescription}
            mode="outlined"
            style={styles.input}
          />
          <Button mode="contained" onPress={createNewList} style={styles.button}>
            Oluştur
          </Button>
        </Modal>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
}); 