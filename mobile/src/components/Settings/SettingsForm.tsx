import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Keyboard,
    KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { genericStyles } from '../../styles/generic';
import { infoButtonStyles } from '../../styles/button';
import { loginFormStyles } from '../../styles/loginForm';
import config from '../../../config/config';
import CanvasModal from '../Modal/CanvasModal';

const endpoint = config.endpoint;

interface ISettingsFormProps {
    userID: string;
}

interface ISettingsFormState {
    firstName: string;
    lastName: string;
    canvasToken: string;
    statusMessage: string;
    showCanvasModal: boolean;
}

export default class SettingsForm extends Component<
    ISettingsFormProps,
    ISettingsFormState
> {
    private firstNameInput: any;
    private lastNameInput: any;
    private canvasTokenInput: any;

    constructor(props: ISettingsFormProps) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            canvasToken: '',
            statusMessage: '',
            showCanvasModal: false,
        };

        this.handleFirstNameUpdate = this.handleFirstNameUpdate.bind(this);
        this.handleLastNameUpdate = this.handleLastNameUpdate.bind(this);
        this.handleCanvasTokenUpdate = this.handleCanvasTokenUpdate.bind(this);
        this.submitPress = this.submitPress.bind(this);
        this.toggleCanvasModal = this.toggleCanvasModal.bind(this);
    }

    public render() {
        return (
            <KeyboardAvoidingView style={loginFormStyles.container}>
                <CanvasModal
                    visible={this.state.showCanvasModal}
                    toggleVisible={this.toggleCanvasModal}
                />
                <View>
                    <Text
                        style={{
                            color: '#70CAD1',
                            textAlign: 'center',
                            paddingVertical: 5,
                        }}
                    >
                        {this.state.statusMessage}
                    </Text>
                </View>
                <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#444444"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={this.handleFirstNameUpdate}
                    ref={input => (this.firstNameInput = input)}
                    style={{
                        ...loginFormStyles.input,
                        ...{
                            borderColor: '#444444',
                            borderWidth: 1,
                            color: '#444444',
                        },
                    }}
                />
                <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#444444"
                    returnKeyType="go"
                    onChangeText={this.handleLastNameUpdate}
                    ref={input => (this.lastNameInput = input)}
                    style={{
                        ...loginFormStyles.input,
                        ...{
                            borderColor: '#444444',
                            borderWidth: 1,
                            color: '#444444',
                        },
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        marginBottom: 15,
                    }}
                >
                    <TextInput
                        placeholder="Canvas Token"
                        placeholderTextColor="#444444"
                        returnKeyType="go"
                        onChangeText={this.handleCanvasTokenUpdate}
                        ref={input => (this.canvasTokenInput = input)}
                        style={{
                            ...{
                                flex: 5,
                                backgroundColor: 'rgba(255,255,255,0.3)',
                                borderRadius: 25,
                                color: '#FFFFFF',
                                height: 50,
                                paddingHorizontal: 25,
                                width: '60%',
                            },
                            ...{
                                borderColor: '#444444',
                                borderWidth: 1,
                                color: '#444444',
                            },
                        }}
                    />
                    <TouchableOpacity
                        onPress={this.toggleCanvasModal.bind(this, true)}
                        style={{
                            ...genericStyles.buttonCircular,
                            ...infoButtonStyles.color,
                        }}
                    >
                        <Ionicons
                            name="md-information"
                            size={50}
                            color="#FFFFFF"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={this.submitPress}
                    style={loginFormStyles.buttonContainer}
                >
                    <Text style={loginFormStyles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }

    public toggleCanvasModal(toggle: boolean) {
        this.setState({
            showCanvasModal: toggle,
        });
    }

    private handleFirstNameUpdate(input: any) {
        this.setState({
            firstName: input,
        });
    }

    private handleLastNameUpdate(input: any) {
        this.setState({
            lastName: input,
        });
    }

    private handleCanvasTokenUpdate(input: any) {
        this.setState({
            canvasToken: input,
        });
    }

    private submitPress() {
        let requestBody = {};

        if (this.state.firstName !== '') {
            requestBody = {
                ...requestBody,
                ...{ firstName: this.state.firstName },
            };
        }
        if (this.state.lastName !== '') {
            requestBody = {
                ...requestBody,
                ...{ lastName: this.state.lastName },
            };
        }
        if (this.state.canvasToken !== '') {
            requestBody = {
                ...requestBody,
                ...{ canvasToken: this.state.canvasToken },
            };
        }

        fetch(`${endpoint}/user/${this.props.userID}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => {
                Keyboard.dismiss();
                this.firstNameInput.clear();
                this.lastNameInput.clear();
                this.canvasTokenInput.clear();

                if (response.ok)
                    this.setState({
                        statusMessage: 'Successfully submitted changes',
                    });
                else throw 'Error submitting change request';
            })
            .catch(error => {
                this.setState({ statusMessage: error });
            });
    }
}
