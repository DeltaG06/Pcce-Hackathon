import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '@utils/constants';

interface AuthButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    type?: 'primary' | 'tertiary'; // 'primary' for login/signup, 'tertiary' for the link
}

const AuthButton: React.FC<AuthButtonProps> = ({ title, onPress, disabled, loading, type = 'primary' }) => {
    const buttonStyle = type === 'primary' ? styles.primaryButton : styles.tertiaryButton;
    const textStyle = type === 'primary' ? styles.primaryButtonText : styles.tertiaryButtonText;

    if (type === 'tertiary') {
        // Render as a text link
        return (
            <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.tertiaryContainer}>
                <Text style={textStyle}>{title}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity 
            style={[buttonStyle, disabled && styles.disabledButton]} 
            onPress={onPress} 
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={COLORS.card} />
            ) : (
                <Text style={textStyle}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    primaryButton: {
        backgroundColor: COLORS.primary, // Health Green color
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    primaryButtonText: {
        color: COLORS.card, // White text
        fontSize: 18,
        fontWeight: '600',
    },
    disabledButton: {
        backgroundColor: '#a2c8a3', // Lighter shade of primary for disabled state
    },
    tertiaryContainer: {
        marginTop: 15,
        padding: 5,
    },
    tertiaryButtonText: {
        color: '#007bff', // Standard link blue
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    // Required to prevent errors, though it has no specific visual style
    tertiaryButton: {} 
});

export default AuthButton;
