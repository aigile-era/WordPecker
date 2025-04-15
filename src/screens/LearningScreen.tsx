import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Card, Title, Paragraph, Button, ProgressBar } from 'react-native-paper';
import { db } from '../config/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

interface Word {
  id: string;
  word: string;
  meaning: string;
  example: string;
  learned: boolean;
}

export const LearningScreen = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const flipAnimation = new Animated.Value(0);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    if (!user) return;

    try {
      const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'words'));
      const fetchedWords = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Word[];
      setWords(fetchedWords);
      setProgress(0);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const handleNext = async () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowMeaning(false);
      setProgress((currentIndex + 1) / words.length);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowMeaning(false);
      setProgress((currentIndex - 1) / words.length);
    }
  };

  const toggleMeaning = () => {
    Animated.spring(flipAnimation, {
      toValue: showMeaning ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setShowMeaning(!showMeaning);
  };

  const markAsLearned = async () => {
    if (!user || !words[currentIndex]) return;

    try {
      const wordRef = doc(db, 'users', user.uid, 'words', words[currentIndex].id);
      await updateDoc(wordRef, {
        learned: true,
      });

      setWords(prev => prev.map((word, index) => 
        index === currentIndex ? { ...word, learned: true } : word
      ));

      handleNext();
    } catch (error) {
      console.error('Error marking word as learned:', error);
    }
  };

  if (words.length === 0) {
    return (
      <View style={styles.container}>
        <Title>Henüz kelime eklenmemiş</Title>
        <Paragraph>Kelime listesi oluşturup kelime ekleyerek öğrenmeye başlayabilirsiniz.</Paragraph>
      </View>
    );
  }

  const currentWord = words[currentIndex];
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} style={styles.progress} />
      
      <Animated.View style={[styles.cardContainer, { transform: [{ rotateY: frontInterpolate }] }]}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.word}>{currentWord.word}</Title>
            {showMeaning && (
              <>
                <Paragraph style={styles.meaning}>{currentWord.meaning}</Paragraph>
                <Paragraph style={styles.example}>{currentWord.example}</Paragraph>
              </>
            )}
          </Card.Content>
        </Card>
      </Animated.View>

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handlePrevious}
          disabled={currentIndex === 0}
          style={styles.button}
        >
          Önceki
        </Button>
        <Button 
          mode="contained" 
          onPress={toggleMeaning}
          style={styles.button}
        >
          {showMeaning ? 'Kelimeyi Göster' : 'Anlamı Göster'}
        </Button>
        <Button 
          mode="contained" 
          onPress={handleNext}
          disabled={currentIndex === words.length - 1}
          style={styles.button}
        >
          Sonraki
        </Button>
      </View>

      {showMeaning && (
        <Button 
          mode="contained" 
          onPress={markAsLearned}
          style={[styles.button, styles.learnedButton]}
        >
          Öğrendim
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  progress: {
    marginBottom: 20,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    elevation: 4,
  },
  word: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  meaning: {
    fontSize: 18,
    marginBottom: 10,
  },
  example: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  learnedButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
  },
}); 