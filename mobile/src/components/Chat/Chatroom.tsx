import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    StatusBar,
    FlatList,
} from 'react-native';
import { chatroomStyles } from '../../styles/chatroom';
import config from '../../../config/config';

const endpoint = config.endpoint;

interface ChatroomProps {
    handleChatroomReturn: Function;
    messages: any[];
    userID: String;
    groupID: String;
    socket: any;
    handleNewMessage: (a: any, b: any) => void;
}

interface ChatroomState {
    messages: any[];
    newMessage: String;
}

export default class Chatroom extends Component<ChatroomProps, ChatroomState> {
    constructor(props: any) {
        super(props);
        this.state = {
            messages: this.props.messages,
            newMessage: '',
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.OnPressBackButton = this.OnPressBackButton.bind(this);
    }

    private sendMessage() {
        this.props.socket.emit(
            'sendMessage',
            this.props.userID,
            this.props.groupID,
            this.state.newMessage,
            this.props.handleNewMessage
        );
        this.setState({ newMessage: '' });
        return;
    }

    private OnPressBackButton() {
        this.state.messages.reverse();
        this.props.handleChatroomReturn();
        return;
    }
    public render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={chatroomStyles.container}
            >
                <StatusBar barStyle="dark-content" />
                <View style={chatroomStyles.topContainer}>
                    <View style={chatroomStyles.titleContainer}>
                        <Text style={chatroomStyles.title}>
                            {this.props.groupID}
                        </Text>
                    </View>
                </View>
                <View style={chatroomStyles.backButtonContainer}>
                    <TouchableOpacity onPress={this.OnPressBackButton}>
                        <Text style={chatroomStyles.backButtonTitle}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={chatroomStyles.whitespace} />
                <View style={chatroomStyles.listContainer}>
                    <FlatList
                        inverted={true}
                        data={this.state.messages.reverse()}
                        renderItem={({ item }) => {
                            if (item.senderId === this.props.userID) {
                                return (
                                    <View
                                        style={
                                            chatroomStyles.outgoingMessageContainer
                                        }
                                    >
                                        <View
                                            style={
                                                chatroomStyles.outgoingMessageBox
                                            }
                                        >
                                            <Text
                                                style={
                                                    chatroomStyles.messageText
                                                }
                                            >
                                                {item.message}
                                            </Text>
                                            <Text
                                                style={
                                                    chatroomStyles.messageTimeStamp
                                                }
                                            >
                                                {new Date(
                                                    item.createdAt
                                                ).toLocaleTimeString('en-US')}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            } else {
                                return (
                                    <View
                                        style={
                                            chatroomStyles.incomingMessageContainer
                                        }
                                    >
                                        <View
                                            style={
                                                chatroomStyles.incomingMessageBox
                                            }
                                        >
                                            <Text
                                                style={
                                                    chatroomStyles.messageSender
                                                }
                                            >
                                                {item.senderName}
                                            </Text>
                                            <Text
                                                style={
                                                    chatroomStyles.messageText
                                                }
                                            >
                                                {item.message}
                                            </Text>
                                            <Text
                                                style={
                                                    chatroomStyles.messageTimeStamp
                                                }
                                            >
                                                {new Date(
                                                    item.createdAt
                                                ).toLocaleTimeString('en-US')}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={chatroomStyles.bottomContainer}>
                    <View>
                        <TextInput
                            style={chatroomStyles.input}
                            multiline={true}
                            value={this.state.newMessage}
                            onChangeText={newMessage => {
                                this.setState({ newMessage });
                            }}
                        />
                        <View style={chatroomStyles.sendButtonContainer}>
                            <TouchableOpacity onPress={this.sendMessage}>
                                <Text style={chatroomStyles.sendButtonText}>
                                    Send
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
