import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import io from 'socket.io-client';
import { appStyles } from './src/styles/app';
import Login from './src/components/Login/Login';
import Navbar from './src/components/Navbar/Navbar';
import Chat from './src/components/Chat/Chat';
import Group from './src/components/Group/Group';
import Schedule from './src/components/Schedule/Schedule';
import Settings from './src/components/Settings/Settings';
import registerForPushNotificationsAsync from './src/utils/registerForPushNotificationsAsync';
import { viewEnum } from './src/enum/viewEnum';
import config from './config/config';

const endpoint = config.endpoint;

interface IAppState {
    chatBody: any[];
    schedule: any[];
    socket: any;
    navigator: number;
    navBarEnable: boolean;
    userID: string;
}

export default class App extends Component<{}, IAppState> {
    constructor(props: any) {
        super(props);

        this.handleViewChange = this.handleViewChange.bind(this);
        this.toggleNavBar = this.toggleNavBar.bind(this);
        this.handleScheduleChange = this.handleScheduleChange.bind(this);
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
        this.handleSocketConnection = this.handleSocketConnection.bind(this);

        this.state = {
            chatBody: [],
            schedule: [],
            socket: '',
            navigator: viewEnum.schedule,
            navBarEnable: true,
            userID: '',
        };
    }

    public render() {
        return (
            <View style={appStyles.container}>
                <StatusBar barStyle={this.renderStatusBar()} />
                <View style={appStyles.viewContainer}>
                    {this.showMainView(this.state.navigator)}
                </View>
                {this.showNavBar(this.state.navigator, this.state.navBarEnable)}
            </View>
        );
    }

    public toggleNavBar(active: boolean) {
        this.setState({ navBarEnable: active });
    }

    public handleViewChange(view) {
        this.setState({ navigator: view });
    }

    public handleScheduleChange(schedule: any[]) {
        this.setState({ schedule });
    }

    public handleSuccessfulLogin(id: string) {
        this.setState({ userID: id });
        this.handleViewChange(viewEnum.group);

        // initialize push notifications
        registerForPushNotificationsAsync(id);

        // initialize socket functionality
        this.handleSocketConnection();

        return;
    }

    private handleSocketConnection() {
        const socket = io(endpoint);
        this.setState({ socket });
        this.state.socket.emit('join', this.state.userID, chatBody => {
            this.setState({ chatBody });
        });
    }

    private showMainView(view: any) {
        switch (view) {
            case viewEnum.login:
                return (
                    <Login handleSuccessfulLogin={this.handleSuccessfulLogin} />
                );
            case viewEnum.chat:
                return <Chat toggleNavBar={this.toggleNavBar} />;
            case viewEnum.schedule:
                return (
                    <Schedule
                        userID={this.state.userID}
                        schedule={this.state.schedule}
                        handleScheduleChange={this.handleScheduleChange}
                    />
                );
            case viewEnum.group:
                return <Group userID={this.state.userID} />;
            case viewEnum.settings:
                return <Settings userID={this.state.userID} />;
            default:
                return null;
        }
    }

    private showNavBar(showNav: any, navBarEnable: boolean) {
        if (showNav !== viewEnum.login && navBarEnable) {
            return <Navbar handleViewChange={this.handleViewChange} />;
        }
        return null;
    }

    private renderStatusBar() {
        return this.state.navigator === viewEnum.login
            ? 'light-content'
            : 'dark-content';
    }
}
