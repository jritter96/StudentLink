import React, { Component } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StatusBar } from 'react-native';
import UserProfile from './UserProfile';
import { genericStyles } from '../../styles/generic';
import { settingsStyles } from '../../styles/settings';
import {settingsEnum } from '../../enum/settingsEnum';

const endpoint = 'http://ec2-18-222-96-240.us-east-2.compute.amazonaws.com';

interface SettingsProps {
    userID: string;
    toggleNavBar: Function;
}

export default class Settings extends Component<SettingsProps> {
    constructor(props) {
        super(props);
        this.OnPressAPIButton = this.OnPressAPIButton.bind(this);
        this.OnPressUserButton = this.OnPressUserButton.bind(this);
        this.HandleUserProfileReturn = this.HandleUserProfileReturn.bind(this);
    }

    state = { settingsNav: settingsEnum.settings}

    OnPressAPIButton() {
        alert("renew API key");
        return;
    }

    OnPressUserButton() {
        this.setState({settingsNav: settingsEnum.userProfile})
        this.props.toggleNavBar(false);
        return;
    }

    HandleUserProfileReturn() {
        this.setState({settingsNav: settingsEnum.settings});
        this.props.toggleNavBar(true);
        return;
    }

    ShowSettingsViews(view: any) {
        switch (view) {
            case settingsEnum.settings:
                return this.SettingsMainView();
            case settingsEnum.userProfile:
                return <UserProfile
                            OnPressBackButton={this.HandleUserProfileReturn.bind(this)}
                       />
            default:
                return this.SettingsMainView();
        }
    }

    SettingsMainView() {
        return (
            <SafeAreaView style={genericStyles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={genericStyles.titleContainer}>
                    <Text style={genericStyles.title}>Settings</Text>
                </View>
                <View styles={settingsStyles.settingsContainer}>
                    <TouchableOpacity
                        onPress={this.OnPressAPIButton.bind(this)}
                        onLongPress={this.OnPressAPIButton.bind(this)}
                        style={settingsStyles.buttonContainer}
                    >
                        <View style={settingsStyles.buttonTitleContainer}>
                            <Text style={settingsStyles.buttonTitle}>Renew Canvas API Key</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.OnPressUserButton.bind(this)}
                        onLongPress={this.OnPressUserButton.bind(this)}
                        style={settingsStyles.buttonContainer}
                    >
                        <View style={settingsStyles.buttonTitleContainer}>
                            <Text style={settingsStyles.buttonTitle}>Manage User Profile</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    public render() {
        return (
            <View style={genericStyles.container}>
                {this.ShowSettingsViews(this.state.settingsNav)}
            </View>
        );
    }
}
