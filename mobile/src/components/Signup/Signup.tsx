import React, { Component } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signupStyles } from '../../styles/signup';
import { LinearGradient } from 'expo-linear-gradient';
import { loginGradient, loginStyles } from '../../styles/login';
import { loginFormStyles } from '../../styles/loginForm';

const endpoint = 'http://ec2-18-222-96-240.us-east-2.compute.amazonaws.com';

interface SignupProps {
    handleViewChange: Function;
    handleSuccessfulLogin: Function;
}

interface SignupState {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    pushNotificationToken: string;
    canvasToken: string;
    errorMessage: string;
    busy: boolean;
}

export default class Signup extends Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            pushNotificationToken: '',
            canvasToken: '',
            errorMessage: '',
            busy: false,
        };

        this.handleFirstnameUpdate = this.handleFirstnameUpdate.bind(this);
        this.handleLastnameUpdate = this.handleLastnameUpdate.bind(this);
        this.handleUsernameUpdate = this.handleUsernameUpdate.bind(this);
        this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
        this.handleNotificationTokenUpdate = this.handleNotificationTokenUpdate.bind(
            this
        );
        this.createUser = this.createUser.bind(this);
        this.handleCanvasTokenUpdate = this.handleCanvasTokenUpdate.bind(this);
    }

    private firstnameInput: any;
    private lastnameInput: any;
    private usernameInput: any;
    private passwordInput: any;
    private notificationTokenInput: any;
    private canvasTokenInput: any;

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
                    style={signupStyles.container}
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
                        <View style={loginFormStyles.errorContainer}>
                            <Text style={loginFormStyles.errorText}>
                                {this.state.errorMessage}
                            </Text>
                        </View>
                        <TextInput
                            placeholder="first name"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            returnKeyType="next"
                            autoCorrect={false}
                            onSubmitEditing={() => this.lastnameInput.focus()}
                            onChangeText={this.handleFirstnameUpdate}
                            ref={input => (this.firstnameInput = input)}
                            style={signupStyles.input}
                        />
                        <TextInput
                            placeholder="last name"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            returnKeyType="next"
                            autoCorrect={false}
                            onSubmitEditing={() => this.usernameInput.focus()}
                            onChangeText={this.handleLastnameUpdate}
                            ref={input => (this.lastnameInput = input)}
                            style={signupStyles.input}
                        />
                        <TextInput
                            placeholder="username"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            keyboardType="username-address"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onSubmitEditing={() => this.passwordInput.focus()}
                            onChangeText={this.handleUsernameUpdate}
                            ref={input => (this.usernameInput = input)}
                            style={signupStyles.input}
                        />
                        <TextInput
                            placeholder="password"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            returnKeyType="next"
                            secureTextEntry
                            onSubmitEditing={() =>
                                this.notificationTokenInput.focus()
                            }
                            onChangeText={this.handlePasswordUpdate}
                            ref={input => (this.passwordInput = input)}
                            style={signupStyles.input}
                        />
                        <TextInput
                            placeholder="push notification token"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                this.canvasTokenInput.focus()
                            }
                            onChangeText={this.handleNotificationTokenUpdate}
                            ref={input => (this.notificationTokenInput = input)}
                            style={signupStyles.input}
                        />
                        <TextInput
                            placeholder="canvas token"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            returnKeyType="go"
                            onChangeText={this.handleCanvasTokenUpdate}
                            ref={input => (this.canvasTokenInput = input)}
                            style={signupStyles.input}
                        />
                        <TouchableOpacity
                            style={loginStyles.buttonContainer}
                            disabled={this.state.busy}
                        >
                            <Text
                                style={loginStyles.buttonText}
                                onPress={this.createUser}
                            >
                                SIGN UP
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </LinearGradient>
        );
    }

    private handleFirstnameUpdate(input: any) {
        this.setState({
            firstname: input,
        });
    }

    private handleLastnameUpdate(input: any) {
        this.setState({
            lastname: input,
        });
    }

    private handleUsernameUpdate(input: any) {
        this.setState({
            username: input,
        });
    }

    private handlePasswordUpdate(input: any) {
        this.setState({
            password: input,
        });
    }

    private handleNotificationTokenUpdate(input: any) {
        this.setState({
            pushNotificationToken: input,
        });
    }

    private handleCanvasTokenUpdate(input: any) {
        this.setState({
            canvasToken: input,
        });
    }

    private createUser() {
        this.setState({ busy: true });
        fetch(`${endpoint}/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                username: this.state.username,
                password: this.state.password,
                pushNotificationToken: this.state.pushNotificationToken,
                token: this.state.canvasToken,
            }),
        })
            .then(response => {
                if (response.ok) return response.json();
                else throw 'Error: invalid authentication';
            })
            .then(response => {
                this.setErrorMessage(false);
                // find id located in response['_id']
                this.props.handleSuccessfulLogin(response['_id']);
            })
            .catch(error => {
                this.setErrorMessage(true);
            });
    }

    private setErrorMessage(arg: any) {
        if (arg === true) {
            this.setState({
                errorMessage: 'Sorry! Your username or password was invalid.',
            });
            Keyboard.dismiss();
            this.passwordInput.clear();
        } else {
            this.setState({
                errorMessage: '',
            });
        }
    }
}
