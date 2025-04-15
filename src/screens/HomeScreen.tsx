import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.welcomeText}>
          Hoş geldin, {user?.email}
        </Title>
      </View>

      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Kelime Listeleri</Title>
            <Paragraph>Kelime listelerinizi görüntüleyin ve yönetin</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('WordList')}>
              Listelere Git
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Öğrenme Modu</Title>
            <Paragraph>Yeni kelimeler öğrenmeye başlayın</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('Learning')}>
              Öğrenmeye Başla
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Sınav Modu</Title>
            <Paragraph>Öğrendiğiniz kelimeleri test edin</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('Quiz')}>
              Sınava Başla
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Profil</Title>
            <Paragraph>Hesap ayarlarınızı ve ilerlemenizi görüntüleyin</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('Profile')}>
              Profile Git
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
  },
  card: {
    marginBottom: 15,
    elevation: 4,
  },
});

export default HomeScreen;
