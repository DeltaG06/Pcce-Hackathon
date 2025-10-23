import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TextInput, 
  TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router'; // Used to dismiss the modal

// Mock message data
const MOCK_MESSAGES = [
    { id: '1', text: 'Hello! How can I help you today? You can ask me about symptoms or medicine availability.', sender: 'bot' },
];

// NOTE: All styling is defined locally.
const ChatBotScreen: React.FC = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const newUserMessage = { id: String(Date.now()), text: input, sender: 'user' };
    
    // (Frontend stub: just echo the message as "searching")
    const botResponse = { 
        id: String(Date.now() + 1), 
        text: `Searching for: "${input}"... (AI Guy's domain)`, 
        sender: 'bot' 
    };
    
    setMessages([...messages, newUserMessage, botResponse]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}
      >
        {/* 1. Header with Title and Dismiss Button */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Health Assistant</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
            <AntDesign name="close" size={24} color="#343A40" />
          </TouchableOpacity>
        </View>

        {/* 2. Message List */}
        <ScrollView style={styles.messageList} contentContainerStyle={{ paddingBottom: 10 }}>
          {messages.map(msg => (
            <View 
              key={msg.id} 
              style={[
                styles.messageBubble, 
                msg.sender === 'user' ? styles.userBubble : styles.botBubble
              ]}
            >
              <Text style={msg.sender === 'user' ? styles.userText : styles.botText}>
                {msg.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* 3. Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask about symptoms, medicine..."
            placeholderTextColor="#6C757D"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <AntDesign name="arrow-up" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#343A40',
    },
    closeButton: {
        padding: 5,
    },
    messageList: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F7F9FC', // Light background for chat area
    },
    messageBubble: {
        padding: 12,
        borderRadius: 18,
        maxWidth: '75%',
        marginBottom: 10,
    },
    userBubble: {
        backgroundColor: '#070091ff', // Blue
        alignSelf: 'flex-end',
    },
    botBubble: {
        backgroundColor: '#E9ECEF', // Light gray
        alignSelf: 'flex-start',
    },
    userText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    botText: {
        color: '#333b42ff',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding:10,
    },
    textInput: {
        flex: 1,
        height: 45,
        backgroundColor: '#e4efffff',
        borderRadius: 22.5,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#343A40',
        marginRight: 10,
    },
    sendButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#002fffff',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ChatBotScreen;