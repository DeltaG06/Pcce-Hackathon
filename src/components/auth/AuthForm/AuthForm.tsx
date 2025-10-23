import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
// Uses the styles file to get the formContainer style
import screenStyles from '@screens/AuthScreen/AuthScreen.styles'; 

// FIX: Use PropsWithChildren to automatically include the 'children' prop
interface AuthFormProps {
    // We can add other non-children props here if needed later
    // For now, it's just a type wrapper for the children
}

// Define the component using the PropsWithChildren interface
const AuthForm: React.FC<PropsWithChildren<AuthFormProps>> = ({ children }) => {
    // The children (AuthInput components) are rendered inside the formContainer view
    return (
        <View style={screenStyles.formContainer}>
            {children}
        </View>
    );
};

export default AuthForm;