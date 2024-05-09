import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

// Default theme colors
const defaultTheme = {
  primaryColor: '#2196F3',
  secondaryColor: '#757575',
};

const SocialApp = () => {
  const [likesReceived, setLikesReceived] = useState(0);
  const [likesGiven, setLikesGiven] = useState(0);
  const [mentionsReceived, setMentionsReceived] = useState(0);
  const [mostUsedWords, setMostUsedWords] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [theme, setTheme] = useState(defaultTheme);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    fetchSocialMediaData();
  }, []);

  const fetchSocialMediaData = async () => {
    try {
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock data for testing
      const data = {
        likesReceived: 150,
        likesGiven: 75,
        mentionsReceived: 20,
        mostUsedWords: ['Hello', 'World', 'React'],
      };

      const { likesReceived, likesGiven, mentionsReceived, mostUsedWords } = data;
      setLikesReceived(likesReceived);
      setLikesGiven(likesGiven);
      setMentionsReceived(mentionsReceived);
      setMostUsedWords(mostUsedWords);
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
      <Text key={`word-${index}`} style={[styles.word, { fontSize }]}>
        {word}
      </Text>
    ));
  };

  const handleColorChange = (color) => {
    setTheme({ ...theme, primaryColor: color });
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.secondaryColor }]}>
      <Text style={[styles.title, { color: theme.primaryColor }]}>Social Media Data</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.primaryColor} style={styles.loader} />
      ) : (
        <React.Fragment>
          <Text style={[styles.metric, { fontSize }]}>Likes Received: {likesReceived}</Text>
          <Text style={[styles.metric, { fontSize }]}>Likes Given: {likesGiven}</Text>
          <Text style={[styles.metric, { fontSize }]}>Mentions Received: {mentionsReceived}</Text>

          <Text style={[styles.title, { color: theme.primaryColor }]}>Most Used Words:</Text>
          {renderMostUsedWords()}

          {error && <Text style={[styles.error, { color: theme.primaryColor }]}>{error}</Text>}

          <Button title="Refresh" onPress={fetchSocialMediaData} color={theme.primaryColor} />
        </React.Fragment>
      )}

      <View style={styles.settingsContainer}>
        <Text style={styles.settingsTitle}>Settings</Text>
        <View style={styles.colorPicker}>
          <Text style={styles.colorPickerLabel}>Theme Color:</Text>
          <Button
            title="Blue"
            onPress={() => handleColorChange('#2196F3')}
            color={theme.primaryColor}
          />
          <Button
            title="Green"
            onPress={() => handleColorChange('#4CAF50')}
            color={theme.primaryColor}
          />
          <Button
            title="Purple"
            onPress={() => handleColorChange('#9C27B0')}
            color={theme.primaryColor}
          />
        </View>
        <View style={styles.fontSizePicker}>
          <Text style={styles.fontSizeLabel}>Font Size:</Text>
          <Button title="Small" onPress={() => handleFontSizeChange(12)} color={theme.primaryColor} />
          <Button title="Medium" onPress={() => handleFontSizeChange(16)} color={theme.primaryColor} />
          <Button title="Large" onPress={() => handleFontSizeChange(20)} color={theme.primaryColor} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 8,
  },
  word: {
    marginBottom: 4,
  },
  error: {
    marginTop: 16,
  },
  loader: {
    marginVertical: 20,
  },
  settingsContainer: {
    marginTop: 20,
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorPickerLabel: {
    marginRight: 10,
  },
  fontSizePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fontSizeLabel: {
    marginRight: 10,
  },
});

export default SocialApp;
