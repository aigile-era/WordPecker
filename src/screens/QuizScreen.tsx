import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, ProgressBar, RadioButton } from 'react-native-paper';
import { db } from '../config/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

interface Word {
  id: string;
  word: string;
  meaning: string;
  example: string;
}

interface Question {
  word: Word;
  options: string[];
  correctAnswer: string;
}

export const QuizScreen = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = async () => {
    if (!user) return;

    try {
      const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'words'));
      const words = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Word[];

      const generatedQuestions = words.map(word => {
        // Rastgele 3 yanlış cevap seç
        const otherMeanings = words
          .filter(w => w.id !== word.id)
          .map(w => w.meaning)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        const options = [...otherMeanings, word.meaning].sort(() => Math.random() - 0.5);

        return {
          word,
          options,
          correctAnswer: word.meaning,
        };
      });

      setQuestions(generatedQuestions);
      setCurrentIndex(0);
      setScore(0);
      setShowResult(false);
    } catch (error) {
      console.error('Error generating questions:', error);
    }
  };

  const handleAnswer = async () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === questions[currentIndex].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer('');
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    generateQuestions();
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Title>Henüz kelime eklenmemiş</Title>
        <Paragraph>Kelime listesi oluşturup kelime ekleyerek sınava başlayabilirsiniz.</Paragraph>
      </View>
    );
  }

  if (showResult) {
    return (
      <View style={styles.container}>
        <Card style={styles.resultCard}>
          <Card.Content>
            <Title style={styles.resultTitle}>Sınav Tamamlandı!</Title>
            <Paragraph style={styles.score}>
              Skorunuz: {score} / {questions.length}
            </Paragraph>
            <Button mode="contained" onPress={restartQuiz} style={styles.button}>
              Tekrar Başla
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex + 1) / questions.length;

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} style={styles.progress} />
      
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.word}>{currentQuestion.word.word}</Title>
          <Paragraph style={styles.example}>{currentQuestion.word.example}</Paragraph>
          
          <RadioButton.Group onValueChange={value => setSelectedAnswer(value)} value={selectedAnswer}>
            {currentQuestion.options.map((option, index) => (
              <RadioButton.Item
                key={index}
                label={option}
                value={option}
                style={styles.radioButton}
              />
            ))}
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleAnswer}
        disabled={!selectedAnswer}
        style={styles.button}
      >
        {currentIndex === questions.length - 1 ? 'Bitir' : 'Sonraki'}
      </Button>
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
  card: {
    marginBottom: 20,
    elevation: 4,
  },
  word: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  example: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  radioButton: {
    marginVertical: 8,
  },
  button: {
    marginTop: 20,
  },
  resultCard: {
    marginTop: 40,
    elevation: 4,
  },
  resultTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
}); 