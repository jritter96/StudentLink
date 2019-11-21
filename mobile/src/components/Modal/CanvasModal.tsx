import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Linking,
    Modal,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import config from '../../../config/config';

export default class CanvasModal extends Component<{}, {}> {
    public render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <SafeAreaView
                    style={{
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                >
                    <ScrollView
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: 10,
                            marginTop: 50,
                            marginBottom: 100,
                            marginHorizontal: 20,
                            paddingHorizontal: 10,
                        }}
                    >
                        <View>
                            <TouchableOpacity>
                                <Ionicons
                                    name="ios-close"
                                    size={50}
                                    color="#444444"
                                />
                            </TouchableOpacity>
                            <Text>Linking your Canvas API Key is easy!</Text>
                            <Text>
                                1. In Settings, navigate to 'New Access Token'
                                under Approved Integrations
                            </Text>
                            <Text>{'\n'}</Text>
                            <Image
                                style={{
                                    width: null,
                                    height: 175,
                                    resizeMode: 'contain',
                                }}
                                source={require('../../assets/api-1.png')}
                            />
                            <Text>{'\n'}</Text>
                            <Text>
                                2. Optionally set an expiry and select 'Generate
                                Token'
                            </Text>
                            <Text>{'\n'}</Text>
                            <Image
                                style={{
                                    width: null,
                                    height: 175,
                                    resizeMode: 'contain',
                                }}
                                source={require('../../assets/api-2.png')}
                            />
                            <Text>{'\n'}</Text>
                            <Text>3. Copy your new token to clipboard</Text>
                            <Text>{'\n'}</Text>
                            <Image
                                style={{
                                    width: null,
                                    height: 175,
                                    resizeMode: 'contain',
                                }}
                                source={require('../../assets/api-3.png')}
                            />
                            <Text>{'\n'}</Text>
                            <Text
                                style={{ color: 'blue' }}
                                onPress={() =>
                                    Linking.openURL(config.canvasAPI)
                                }
                            >
                                Go to UBC Canvas
                            </Text>
                            <Text>{'\n'}</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        );
    }
}
