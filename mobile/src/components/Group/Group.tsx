import React, { Component } from 'react';
import { View, SafeAreaView, ActivityIndicator, Modal } from 'react-native';
import { genericStyles } from '../../styles/generic';
import DefaultGroupView from './DefaultGroupView';
import config from '../../../config/config';
import ChooseAGroupModal from '../Modal/ChooseAGroupModal';

interface IGroupProps {
    userID: string;
    handleGroupsChange: Function;
    groups: any[];
}

interface IGroupState {
    isLoading: boolean;
    displayResults: boolean;
    searchLoading: boolean;
    searchResults: any[];
}

const endpoint = config.endpoint;

export default class Group extends Component<IGroupProps, IGroupState> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            displayResults: false,
            searchLoading: false,
            searchResults: [],
        };
        this.getGroups = this.getGroups.bind(this);
        this.searchPress = this.searchPress.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.joinGroup = this.joinGroup.bind(this);
    }

    public componentDidMount() {
        if (this.props.groups.length === 0) {
            this.getGroups();
        } else {
            this.setState({ isLoading: false });
        }
    }

    public render() {
        return (
            <SafeAreaView style={genericStyles.container}>
                {this.renderGroupView()}
            </SafeAreaView>
        );
    }

    private renderGroupView() {
        if (this.state.isLoading) {
            return <ActivityIndicator />;
        } else {
            return (
                <View style={genericStyles.container}>
                    <DefaultGroupView
                        userID={this.props.userID}
                        searchPress={this.searchPress}
                        groups={this.props.groups}
                    />
                    <ChooseAGroupModal
                        visible={this.state.displayResults}
                        toggleVisible={this.toggleModal}
                        searchResults={this.state.searchResults}
                        isLoading={this.state.searchLoading}
                        joinGroup={this.joinGroup}
                    />
                </View>
            );
        }
    }

    private toggleModal(toggle: boolean) {
        this.setState({ displayResults: toggle });
    }

    private searchPress() {
        this.toggleModal(true);
        this.setState({ searchLoading: true });
        fetch(`${endpoint}/user/${this.props.userID}/match`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw `Error: problem retrieving user's groups`;
                }
            })
            .then(responseJson => {
                var searchResults = [];
                if (responseJson[0]) {
                    for (var group of responseJson) {
                        var names = group['group']['names'];
                        var id = group['group']['_id'];
                        searchResults.push({
                            name: group['groupName']
                                ? group['groupName']
                                : 'Study Group ' + (searchResults.length + 1),
                            members: names,
                            id: id,
                        });
                    }
                    this.setState({
                        searchLoading: false,
                        searchResults: searchResults,
                    });
                } else {
                    this.setState({
                        searchLoading: false,
                        searchResults: [],
                        displayResults: false,
                    });
                    this.getGroups();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    private getGroups() {
        fetch(`${endpoint}/user/${this.props.userID}/groups`, {
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
                    throw `Error: problem retrieving user's groups`;
                }
            })
            .then(responseJson => {
                var groups = [];
                for (var group of responseJson['groupsObj']) {
                    var names = group['names'];
                    var id = group['id'];
                    groups.push({
                        name: group['groupName']
                            ? group['groupName']
                            : 'Group ' + (groups.length + 1),
                        members: names,
                        id: id,
                    });
                }
                this.props.handleGroupsChange(groups);
                this.setState({ isLoading: false });
            })
            .catch(error => {
                console.log(error);
            });
    }

    private joinGroup(groupID, name) {
        this.toggleModal(false);
        fetch(`${endpoint}/group/join/${groupID}/${this.props.userID}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw `Error: problem retrieving user's groups`;
                }
            })
            .then(responseJson => {
                var groups = this.props.groups;
                var names = responseJson['names'];
                var id = responseJson['_id'];
                groups.push({
                    name: name,
                    members: names,
                    id: id,
                });
                this.props.handleGroupsChange(groups);
            })
            .catch(error => {
                console.log(error);
            });
    }
}
