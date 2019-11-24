import React, { Component } from 'react';
import {
    TouchableOpacity,
    SafeAreaView,
    View,
    Text,
    ScrollView,
} from 'react-native';
import Chatroom from './Chatroom';
import { genericStyles } from '../../styles/generic';
import { chatStyles } from '../../styles/chat';
import { chatEnum } from '../../enum/chatEnum';

const MAX_CHARACTERS = 33;

interface ChatProps {
    toggleNavBar: Function;
    userID: String;
    chatBody: any[];
    socket: any;
    handleNewMessage: (groupId: String, newChatObject: any) => void;
}

interface ChatState {
    chatNav: any;
    chatSel: any;
}

export default class Chat extends Component<ChatProps, ChatState> {
    constructor(props: any) {
        super(props);
        this.state = {
            chatNav: chatEnum.chat,
            chatSel: '',
        };
        this.OnPressButton = this.OnPressButton.bind(this);
        this.HandleChatroomReturn = this.HandleChatroomReturn.bind(this);
        this.reloadChatroom = this.reloadChatroom.bind(this);
    }

    public reloadChatroom(groupId: String) {
        if (this.state.chatNav === chatEnum.chatroom && this.state.chatSel === groupId) {
            this.refs.chatroom.reloadChatroom();
        }
        return;
    }

    private OnPressButton(chatID: any) {
        this.setState({ chatSel: chatID });
        this.setState({ chatNav: chatEnum.chatroom });
        this.setState({ chatSel: chatID });
        this.props.toggleNavBar(false);
        return;
    }

    public HandleChatroomReturn() {
        this.setState({ chatNav: chatEnum.chat });
        this.props.toggleNavBar(true);
        return;
    }

    private ShowChatViews(view: any) {
        switch (view) {
            case chatEnum.chat:
                return this.ChatMainView();
            case chatEnum.chatroom:
                var i: number, chatIndex = 0;
                for (i = 0; i < this.props.chatBody.length; i++) {
                    if (this.props.chatBody[i].groupId === this.state.chatSel) {
                        chatIndex = i;
                        break;
                    }
                    if (i === this.props.chatBody.length - 1) {
                        chatIndex = -1;
                    }
                }
                if (chatIndex < 0) {
                    console.log("err: No chat object for groupID " + this.state.chatSel)
                    this.HandleChatroomReturn();
                }
                console.log("chat index: ");
                console.log(chatIndex);
                console.log("Chatbody: ");
                console.log(this.props.chatBody);
                return (
                    <Chatroom
                        ref="chatroom"
                        handleChatroomReturn={this.HandleChatroomReturn.bind(this)}
                        messages={this.props.chatBody[chatIndex].messages}
                        userID={this.props.userID}
                        groupID={this.state.chatSel}
                        groupName={this.props.chatBody[chatIndex].groupName}
                        socket={this.props.socket}
                        handleNewMessage={this.props.handleNewMessage}
                    />
                );
            default:
                return this.ChatMainView();
        }
    }

    private ChatMainView() {
        return (
            <View style={genericStyles.container}>
                <View style={genericStyles.titleContainer}>
                    <Text style={genericStyles.title}>Messages</Text>
                </View>
                <View style={chatStyles.scrollContainer}>
                    <ScrollView
                        contentContainerStyle={chatStyles.contentContainer}
                    >
                        {this.renderChats()}
                    </ScrollView>
                </View>
            </View>
        );
    }

    private renderChats() {
        var tempArray = [], i;
        for(i = 0; i < this.props.chatBody.length; i++)
        {
            if (this.props.chatBody[i] != null) {
                tempArray[i] = this.props.chatBody[i];
            }
        }
        return tempArray.map(chatObject => (
            <View key={chatObject.groupID}>
                <TouchableOpacity
                    onPress={this.OnPressButton.bind(this, chatObject.groupId)}
                    onLongPress={this.OnPressButton.bind(this, chatObject.groupId)}
                    style={chatStyles.buttonContainer}
                >
                    <View style={chatStyles.buttonTitleContainer}>
                        <Text style={chatStyles.buttonTitle}>{chatObject.groupName}</Text>
                    </View>
                    <View style={chatStyles.buttonSubtitleContainer}>
                        <Text style={chatStyles.buttonSubtitle}>
                            {chatObject.messages.length === 0 ?
                                "No Messages" :
                                chatObject.messages[chatObject.messages.length - 1].message.length > MAX_CHARACTERS ?
                                    chatObject.messages[chatObject.messages.length - 1].message.substring(0, MAX_CHARACTERS) + "..." :
                                    chatObject.messages[chatObject.messages.length - 1].message
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={chatStyles.whiteSpace} />
            </View>
        ));
    }

    public render() {
        return (
            <SafeAreaView style={genericStyles.container}>
                {this.ShowChatViews(this.state.chatNav)}
            </SafeAreaView>
        );
    }
}
