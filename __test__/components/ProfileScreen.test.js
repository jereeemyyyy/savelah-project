import React from 'react';
import renderer from 'react-test-renderer';
import ProfileScreen from '../../app/screens/profile/ProfileScreen';

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
        }),
    };
});

jest.mock('expo-router', () => ({
    useNavigation: () => ({
        navigate: jest.fn(),
        reset: jest.fn(),
    }),
}));


describe('ProfileScreen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<ProfileScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains the Profile component', () => {
        const component = renderer.create(<ProfileScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'profileComponent' })).toBeTruthy();
    });

    it('contains the Settings title and component', () => {
        const component = renderer.create(<ProfileScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'settingsTitle' }).props.children).toBe('Settings');
        expect(instance.findByProps({ testID: 'settingsComponent' })).toBeTruthy();
    });

    it('contains the Extensions title and component', () => {
        const component = renderer.create(<ProfileScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'extensionsTitle' }).props.children).toBe('Extensions');
        expect(instance.findByProps({ testID: 'extensionsComponent' })).toBeTruthy();
    });

    it('contains the Friends title and component', () => {
        const component = renderer.create(<ProfileScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'friendsTitle' }).props.children).toBe('Friends');
        expect(instance.findByProps({ testID: 'friendsComponent' })).toBeTruthy();
    });

    it('contains the SignOutButton component', () => {
        const component = renderer.create(<ProfileScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'signOutButton' })).toBeTruthy();
    });
});
