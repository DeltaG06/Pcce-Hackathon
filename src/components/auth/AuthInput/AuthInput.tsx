import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import { COLORS } from '@utils/constants';

// FIX: Removed the unnecessary 'iconName' property requirement
interface AuthInputProps extends TextInputProps {
    // Note: No properties are required beyond standard TextInputProps
}

const AuthInput: React.FC<AuthInputProps> = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholderTextColor={COLORS.lightText}
                autoCapitalize="none"
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: COLORS.card, // White background
    },
    input: {
        height: 50,
        fontSize: 16,
        color: COLORS.text,
    },
});

export default AuthInput;