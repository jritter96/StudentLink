import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { genericStyles } from '../../styles/generic';
import { settingsStyles } from '../../styles/settings';
import SettingsForm from './SettingsForm';

interface IGroupProps {
    userID: string;
    handleLogout: () => void;
}

interface IGroupState {
    isLoading: boolean;
}

export default class Group extends Component<IGroupProps, IGroupState> {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    public render() {
        if (this.state.isLoading) {
            return (
                <View style={genericStyles.container}>
                    <ActivityIndicator />
                </View>
            );
        } else {
            return (
                <SafeAreaView>
                    <View>
                        <Text style={genericStyles.title}>Settings</Text>
                    </View>
                    <ScrollView
                        contentContainerStyle={settingsStyles.container}
                        keyboardShouldPersistTaps={true}
                    >
                        <View
                            style={{
                                borderBottomColor: '#AAAAAA',
                                borderBottomWidth: 1,
                                marginVertical: 10,
                            }}
                        />

                        <Text style={settingsStyles.header}>Edit Profile</Text>
                        <SettingsForm userID={this.props.userID} />
                        <View
                            style={{
                                borderBottomColor: '#AAAAAA',
                                borderBottomWidth: 1,
                                marginVertical: 10,
                            }}
                        />
                        <TouchableOpacity
                            onPress={this.props.handleLogout}
                            style={{
                                ...settingsStyles.button,
                                ...settingsStyles.logoutButton,
                            }}
                        >
                            <Text style={settingsStyles.settingsButtonText}>
                                LOG OUT
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            );
        }
    }
}
