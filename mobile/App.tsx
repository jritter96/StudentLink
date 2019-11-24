import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Tester, TestHookStore } from 'cavy';
import io from 'socket.io-client';
import { appStyles } from './src/styles/app';
import Login from './src/components/Login/Login';
import Chat from './src/components/Chat/Chat';
import Group from './src/components/Group/Group';
import Schedule from './src/components/Schedule/Schedule';
import Settings from './src/components/Settings/Settings';
import Signup from './src/components/Signup/Signup';
import registerForPushNotificationsAsync from './src/utils/registerForPushNotificationsAsync';
import { viewEnum } from './src/enum/viewEnum';
import config from './config/config';

import validLoginSpec from './specs/validLoginSpec';
import invalidLoginSpec from './specs/invalidLoginSpec';
import groupSearchSpec from './specs/groupSearchSpec';
import scheduleCourseRefreshSpec from './specs/scheduleCourseRefreshSpec';
import navbarSpec from './specs/navBarSpec';
import Navbar from './src/components/Navbar/Navbar';

const endpoint = config.endpoint;
const testHookStore = new TestHookStore();

interface IAppState {
    chatBody: any[];
    schedule: any[];
    groups: any[];
    socket: any;
    navigator: number;
    navBarEnable: boolean;
    userID: string;
    firstName: string;
    lastName: string;
    createdAt: string;
}

console.disableYellowBox = true;

export default class AppWrapper extends Component<{}, IAppState> {
    constructor(props: any) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
        this.toggleNavBar = this.toggleNavBar.bind(this);
        this.handleScheduleChange = this.handleScheduleChange.bind(this);
        this.handleGroupsChange = this.handleGroupsChange.bind(this);
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
        this.handleSocketConnection = this.handleSocketConnection.bind(this);
        this.handleNewMessage = this.handleNewMessage.bind(this);

        this.state = {
            chatBody: [],
            schedule: [],
            groups: [],
            socket: '',
            navigator: viewEnum.login,
            navBarEnable: true,
            userID: '',
            firstName: '',
            lastName: '',
            createdAt: '',
        };
    }

    public render() {
        return (
            <Tester
                specs={[
                    invalidLoginSpec,
                    validLoginSpec,
                    navbarSpec,
                    groupSearchSpec,
                    scheduleCourseRefreshSpec,
                ]}
                store={testHookStore}
            >
                <View style={appStyles.container}>
                    <StatusBar barStyle={this.renderStatusBar()} />
                    <View style={appStyles.viewContainer}>
                        {this.showMainView(this.state.navigator)}
                    </View>
                    {this.showNavBar(
                        this.state.navigator,
                        this.state.navBarEnable
                    )}
                </View>
            </Tester>
        );
    }

    private showNavBar(showNav: any, navBarEnable: boolean) {
        if (showNav !== viewEnum.login && navBarEnable) {
            return <Navbar handleViewChange={this.handleViewChange} />;
        }
        return null;
    }

    public toggleNavBar(active: boolean) {
        this.setState({ navBarEnable: active });
    }

    public handleViewChange(view) {
        this.setState({ navigator: view });
    }

    public handleScheduleChange(courseSchedule: any[], groupSchedule: any[]) {
        const newSchedule = [];

        // iterate through courses
        for (const events of courseSchedule) {
            for (const event of events.times) {
                newSchedule.push({
                    _id: events._id,
                    isCourse: true,
                    eventName: events.courseCode,
                    day: event.day,
                    hourStart: event.hourStart,
                    minuteStart: event.minuteStart,
                    hourEnd: event.hourEnd,
                    minuteEnd: event.minuteEnd,
                });
            }
        }

        // iterate through groups
        // TODO: populate properly
        for (const events of groupSchedule) {
            for (const event of events['scheduled_meeting']) {
                newSchedule.push({
                    _id: events._id,
                    isCourse: false,
                    eventName: events.groupName,
                    day: event.day || 3,
                    hourStart: event.hourStart || 18,
                    minuteStart: event.minuteStart || 30,
                    hourEnd: event.hourEnd || 20,
                    minuteEnd: event.minuteEnd || 30,
                });
            }
        }

        // sort
        newSchedule.sort((a, b) => {
            return (
                a.day - b.day ||
                a.hourStart - b.hourStart ||
                a.hourEnd - b.hourEnd
            );
        });

        this.setState({ schedule: newSchedule });
    }

    public handleGroupsChange(groups: any[]) {
        this.setState({ groups });
        this.reloadChatBody();
    }

    public handleSuccessfulLogin(response: any) {
        this.setState({
            userID: response['_id'],
            firstName: response['firstName'],
            lastName: response['lastName'],
            createdAt: response['createdAt'],
        });

        this.toggleNavBar(true);
        this.handleViewChange(viewEnum.group);

        // initialize push notifications
        registerForPushNotificationsAsync(this.state.userID);

        // initialize socket functionality
        this.handleSocketConnection();

        return;
    }

    public handleLogout() {
        this.setState({
            chatBody: [],
            schedule: [],
            groups: [],
            socket: '',
            navigator: viewEnum.login,
            navBarEnable: true,
            userID: '',
            firstName: '',
            lastName: '',
            createdAt: '',
        });
    }

    private handleSocketConnection() {
        const socket = io(endpoint);
        this.setState({ socket });
        this.state.socket.emit('join', this.state.userID, chatBody => {
            this.setState({ chatBody });
        });
        this.state.socket.on('message', (groupId, newMessage) => {
            this.handleNewMessage(groupId, newMessage);
        });
    }

    public handleNewMessage(groupId: String, newChatObject: any) {
        const newChatBody = this.state.chatBody;
        for (const group of newChatBody) {
            if (group.groupId === groupId) {
                group.messages.push(newChatObject);
            }
        }
        this.setState({ chatBody: newChatBody });
        if (this.state.navigator === viewEnum.chat) {
            this.refs.chat.reloadChatroom(groupId);
        }
    }

    private reloadChatBody() {
        fetch(`${endpoint}/chat/user/${this.state.userID}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw `Error: problem retrieving user's chat object`;
                }
            })
            .then(responseJson => {
                this.setState({ chatBody: responseJson });
            })
            .catch(error => {
                console.log(error);
            });
    }

    private showMainView(view: any) {
        switch (view) {
            case viewEnum.login:
                return (
                    <Login
                        handleViewChange={this.handleViewChange}
                        handleSuccessfulLogin={this.handleSuccessfulLogin}
                        toggleNavbar={this.toggleNavBar}
                    />
                );
            case viewEnum.chat:
                return (
                    <Chat
                        ref="chat"
                        toggleNavBar={this.toggleNavBar}
                        userID={this.state.userID}
                        chatBody={this.state.chatBody}
                        socket={this.state.socket}
                        handleNewMessage={this.handleNewMessage}
                    />
                );
            case viewEnum.schedule:
                return (
                    <Schedule
                        userID={this.state.userID}
                        schedule={this.state.schedule}
                        handleScheduleChange={this.handleScheduleChange}
                    />
                );
            case viewEnum.group:
                return (
                    <Group
                        userID={this.state.userID}
                        groups={this.state.groups}
                        handleGroupsChange={this.handleGroupsChange}
                    />
                );
            case viewEnum.settings:
                return (
                    <Settings
                        userID={this.state.userID}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        createdAt={this.state.createdAt}
                        handleLogout={this.handleLogout}
                    />
                );
            case viewEnum.signup:
                return (
                    <Signup
                        handleViewChange={this.handleViewChange}
                        handleSuccessfulLogin={this.handleSuccessfulLogin}
                    />
                );
            default:
                return null;
        }
    }

    private renderStatusBar() {
        return this.state.navigator === viewEnum.login ||
            this.state.navigator === viewEnum.signup
            ? 'light-content'
            : 'dark-content';
    }
}
