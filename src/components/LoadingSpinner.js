import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'native-base';

const LoadingSpinner = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator style={{marginTop: 15}} size="large" color="#233240" />
    </View>
)

export default LoadingSpinner;