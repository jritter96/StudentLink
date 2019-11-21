import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    ScrollView,
    TouchableOpacity,
    Linking,
    Modal,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import config from '../../../config/config';
import { modalStyles } from '../../styles/modal';

interface ICanvasModalProps {
    visible: boolean;
    toggleVisible: (toggle: boolean) => void;
}

export default class CanvasModal extends Component<ICanvasModalProps, {}> {
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
                    <ScrollView style={modalStyles.content}>
                        <View>
                            <TouchableOpacity
                                onPress={this.props.toggleVisible.bind(
                                    this,
                                    false
                                )}
                            >
                                <Ionicons
                                    name="ios-close"
                                    size={50}
                                    color="#444444"
                                />
                            </TouchableOpacity>
                            <Text style={modalStyles.titleHeader}>
                                Linking your Canvas API Key is easy!
                            </Text>
                            <Text style={modalStyles.text}>
                                1. In Settings, navigate to 'New Access Token'
                                under Approved Integrations
                            </Text>
                            <Image
                                style={modalStyles.image}
                                source={require('../../assets/api-1.png')}
                            />
                            <Text style={modalStyles.text}>
                                2. Optionally set an expiry and select 'Generate
                                Token'
                            </Text>
                            <Image
                                style={modalStyles.image}
                                source={require('../../assets/api-2.png')}
                            />
                            <Text style={modalStyles.text}>
                                3. Copy your new token to clipboard
                            </Text>
                            <Image
                                style={modalStyles.image}
                                source={require('../../assets/api-3.png')}
                            />
                            <View style={modalStyles.buttonContainer}>
                                <Text
                                    style={modalStyles.button}
                                    onPress={() =>
                                        Linking.openURL(config.canvasAPI)
                                    }
                                >
                                    Go to UBC Canvas
                                </Text>
                            </View>
                            <Text>{'\n'}</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        );
    }
}
