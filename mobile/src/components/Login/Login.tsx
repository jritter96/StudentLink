import React, { Component } from 'react';
import {
    Text,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { loginGradient, loginStyles } from '../../styles/login';
import LoginForm from './LoginForm';

interface LoginProps {
    HandleSuccessfulLogin: Function;
}

interface LoginState {}

export default class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
    }

    render() {
        return (
            <LinearGradient
                colors={loginGradient}
                style={{
                    flex: 1,
                }}
            >
                <KeyboardAvoidingView
                    behavior="padding"
                    style={loginStyles.container}
                >
                    <View style={loginStyles.logoContainer}>
                        <View style={loginStyles.logoLine}>
                            <Text style={loginStyles.title}>StudentLink</Text>
                            <Ionicons
                                style={loginStyles.iconTitle}
                                name="ios-school"
                                size={45}
                                color="white"
                            />
                        </View>
                        <View>
                            <Text style={loginStyles.titleTwo}>
                                Swiftly Study with Students
                            </Text>
                        </View>
                    </View>
                    <View>
                        <LoginForm
                            HandleSuccessfulLogin={
                                this.props.HandleSuccessfulLogin
                            }
                        />
                    </View>
                </KeyboardAvoidingView>
                <TouchableOpacity style={loginStyles.buttonContainer2}>
                    <Text style={loginStyles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }
}
