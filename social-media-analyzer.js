import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const App = () => {
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [mostUsedWords, setMostUsedWords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSocialMediaData();
  }, []);

  const fetchSocialMediaData = async () => {
    try {
      const response = await fetch('https://api.example.com/social-media-data');
      const data = await response.json();

      const { likes, comments, words } = data;
      setLikesCount(likes);
      setCommentsCount(comments);
      setMostUsedWords(words);
      setError(null);
    } catch (error) {
      console.error('Error fetching social media data:', error);
      setError('Error fetching social media data. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social Media Data</Text>
      <Text style={styles.metric}>Total Likes: {likesCount}</Text>
      <Text style={styles.metric}>Total Comments: {commentsCount}</Text>

      <Text style={styles.title}>Most Used Words:</Text>
      {mostUsedWords.map((word, index) => (
        <Text key={`word-${index}`} style={styles.word}>
          {word}
        </Text>
      ))}

      {error && <Text style={styles.error}>{error}</Text>}

      <Button title="Refresh" onPress={fetchSocialMediaData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  metric: {
    fontSize: 16,
    marginBottom: 8,
  },
  word: {
    fontSize: 16,
    marginBottom: 4,
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
});

export default App;
