import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

const SocialApp = () => {
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [mostUsedWords, setMostUsedWords] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching social media data:', error);
      setError('Error fetching social media data. Please try again later.');
      setLoading(false);
    }
  };

  const renderMostUsedWords = () => {
    if (mostUsedWords.length === 0) {
      return <Text>No words found.</Text>;
    }

    return mostUsedWords.map((word, index) => (
      <Text key={`word-${index}`} style={styles.word}>
        {word}
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social Media Data</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#000" style={styles.loader} />
      ) : (
        <React.Fragment>
          <Text style={styles.metric}>Total Likes: {likesCount}</Text>
          <Text style={styles.metric}>Total Comments: {commentsCount}</Text>

          <Text style={styles.title}>Most Used Words:</Text>
          {renderMostUsedWords()}

          {error && <Text style={styles.error}>{error}</Text>}

          <Button title="Refresh" onPress={fetchSocialMediaData} />
        </React.Fragment>
      )}
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
  loader: {
    marginVertical: 20,
  },
});

export default SocialApp;
