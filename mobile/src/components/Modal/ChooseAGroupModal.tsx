import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { modalStyles } from '../../styles/modal';
import { Ionicons } from '@expo/vector-icons';
import GroupContainer from '../Group/GroupContainer';
import config from '../../../config/config';
import { hook } from 'cavy';

const endpoint = config.endpoint;

interface ChooseAGroupModalProps {
    visible: boolean;
    toggleVisible: (toggle: boolean) => void;
    joinGroup: Function;
    searchResults: any[];
    isLoading: boolean;
}

class ChooseAGroupModal extends Component<ChooseAGroupModalProps> {
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.visible}
            >
                <SafeAreaView style={modalStyles.container}>
                    <ScrollView style={this.renderModalStyle()}>
                        <TouchableOpacity
                            onPress={this.props.toggleVisible.bind(this, false)}
                        >
                            <Ionicons
                                name="ios-close"
                                size={50}
                                color="#444444"
                            />
                        </TouchableOpacity>

                        <Text style={modalStyles.titleHeader}>
                            Choose a group to join:
                        </Text>
                        <View
                            style={modalStyles.chooseAGroupContent}
                            ref={this.props.generateTestHook('Group.groupList')}
                        >
                            {this.renderSearchResults()}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        );
    }

    private renderSearchResults() {
        if (this.props.isLoading) {
            return <ActivityIndicator />;
        } else {
            return this.props.searchResults.map((memberGroup, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={this.props.joinGroup.bind(
                        this,
                        memberGroup['id'],
                        memberGroup['name']
                    )}
                >
                    <GroupContainer group={memberGroup} key={index} />
                </TouchableOpacity>
            ));
        }
    }

    private renderModalStyle() {
        return {
            ...modalStyles.content,
            ...{
                marginTop: 75,
            },
        };
    }
}

const TestableChooseAGroupModal = hook(ChooseAGroupModal);
export default TestableChooseAGroupModal;
