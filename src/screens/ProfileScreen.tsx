import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Avatar, List, Divider } from 'react-native-paper';
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

interface Stats {
  totalWords: number;
  learnedWords: number;
  totalLists: number;
  quizzesTaken: number;
  averageScore: number;
}

export const ProfileScreen = () => {
  const [stats, setStats] = useState<Stats>({
    totalWords: 0,
    learnedWords: 0,
    totalLists: number,
    quizzesTaken: 0,
    averageScore: 0,
  });
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    if (!user) return;

    try {
      // Kelime istatistikleri
      const wordsQuery = query(
        collection(db, 'users', user.uid, 'words')
      );
      const wordsSnapshot = await getDocs(wordsQuery);
      const words = wordsSnapshot.docs.map(doc => doc.data());
      
      const learnedWords = words.filter(word => word.learned).length;

      // Liste istatistikleri
      const listsQuery = query(
        collection(db, 'users', user.uid, 'wordLists')
      );
      const listsSnapshot = await getDocs(listsQuery);
      const totalLists = listsSnapshot.size;

      // Quiz istatistikleri
      const quizzesQuery = query(
        collection(db, 'users', user.uid, 'quizzes')
      );
      const quizzesSnapshot = await getDocs(quizzesQuery);
      const quizzes = quizzesSnapshot.docs.map(doc => doc.data());
      
      const totalQuizzes = quizzes.length;
      const totalScore = quizzes.reduce((sum, quiz) => sum + quiz.score, 0);
      const averageScore = totalQuizzes > 0 ? totalScore / totalQuizzes : 0;

      setStats({
        totalWords: words.length,
        learnedWords,
        totalLists,
        quizzesTaken: totalQuizzes,
        averageScore,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Text 
            size={80} 
            label={user?.email?.[0].toUpperCase() || 'U'} 
          />
          <Title style={styles.email}>{user?.email}</Title>
        </Card.Content>
      </Card>

      <Card style={styles.statsCard}>
        <Card.Content>
          <Title>İstatistikler</Title>
          <List.Item
            title="Toplam Kelime"
            description={stats.totalWords.toString()}
            left={props => <List.Icon {...props} icon="book" />}
          />
          <Divider />
          <List.Item
            title="Öğrenilen Kelime"
            description={stats.learnedWords.toString()}
            left={props => <List.Icon {...props} icon="check-circle" />}
          />
          <Divider />
          <List.Item
            title="Toplam Liste"
            description={stats.totalLists.toString()}
            left={props => <List.Icon {...props} icon="format-list-bulleted" />}
          />
          <Divider />
          <List.Item
            title="Alınan Quiz Sayısı"
            description={stats.quizzesTaken.toString()}
            left={props => <List.Icon {...props} icon="quiz" />}
          />
          <Divider />
          <List.Item
            title="Ortalama Quiz Puanı"
            description={`%${(stats.averageScore * 100).toFixed(1)}`}
            left={props => <List.Icon {...props} icon="star" />}
          />
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Çıkış Yap
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    margin: 16,
    elevation: 4,
  },
  profileContent: {
    alignItems: 'center',
    padding: 20,
  },
  email: {
    marginTop: 10,
    fontSize: 20,
  },
  statsCard: {
    margin: 16,
    elevation: 4,
  },
  logoutButton: {
    margin: 16,
    backgroundColor: '#f44336',
  },
}); 