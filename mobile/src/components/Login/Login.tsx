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
import { viewEnum } from '../../enum/viewEnum';
import { hook } from 'cavy';

interface ILoginProps {
    handleSuccessfulLogin: (id: string) => void;
    handleViewChange: Function;
    toggleNavbar: Function;
}

class Login extends Component<ILoginProps, {}> {
    constructor(props: ILoginProps) {
        super(props);
        this.signupPress = this.signupPress.bind(this);
    }

    public render() {
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
                    ref={this.props.generateTestHook('Login.screen')}
                >
                    <View style={loginStyles.logoContainer}>
                        <View style={loginStyles.logoLine}>
                            <Text style={loginStyles.title}>StudentLink</Text>
                            <Ionicons
                                style={loginStyles.iconTitle}
                                name="md-school"
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
                            handleSuccessfulLogin={
                                this.props.handleSuccessfulLogin
                            }
                        />
                    </View>
                </KeyboardAvoidingView>
                <TouchableOpacity
                    onPress={this.signupPress}
                    style={loginStyles.buttonContainer}
                >
                    <Text style={loginStyles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }

    private signupPress() {
        this.props.handleViewChange(viewEnum.signup);
        this.props.toggleNavbar(false);
    }
}

const TestableLogin = hook(Login);
export default TestableLogin;
