import React from 'react';
import renderer from 'react-test-renderer';
import ProfilePictureScreen from '../../app/screens/onboarding/ProfilePictureScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase';

// Mock navigation and route
jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
        }),
        useRoute: () => ({
            params: {
                username: 'testuser',
                userId: 'testuser-id'
            }
        })
    };
});

// Mock expo-image-picker
jest.mock('expo-image-picker', () => ({
    launchImageLibraryAsync: jest.fn(() => ({
        canceled: false,
        assets: [{ uri: 'test-uri' }]
    }))
}));

// Mock supabase
jest.mock('../../lib/supabase', () => ({
    supabase: {
        storage: {
            from: () => ({
                upload: jest.fn(() => ({ error: null })),
                getPublicUrl: jest.fn(() => ({ data: { publicUrl: 'test-url' } }))
            })
        },
        from: () => ({
            update: jest.fn(() => ({ error: null }))
        }),
        auth: {
            getUser: jest.fn(() => ({ data: { user: { id: 'testuser-id' } } }))
        }
    }
}));

describe('ProfilePictureScreen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<ProfilePictureScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains the expected text elements', () => {
        const component = renderer.create(<ProfilePictureScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'titleText' }).props.children).toBe('Add a Profile Picture');
        expect(instance.findByProps({ testID: 'subtitleText' }).props.children).toBe('Customize your profile by adding a Profile Picture!');
    });

    it('contains the profile picture button', () => {
        const component = renderer.create(<ProfilePictureScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'profilePictureButton' })).toBeTruthy();
    });

    it('contains the Next button', () => {
        const component = renderer.create(<ProfilePictureScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'nextButton' })).toBeTruthy();
    });

    it('contains the Skip button', () => {
        const component = renderer.create(<ProfilePictureScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'skipButton' })).toBeTruthy();
    });
});
