import React from 'react';
import renderer from 'react-test-renderer';
import UsernameScreen from '../../app/screens/onboarding/UsernameScreen';

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
        }),
    };
});

describe('UsernameScreen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<UsernameScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains the expected text elements', () => {
        const component = renderer.create(<UsernameScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'welcomeText' }).props.children).toBe('Welcome to SaveLah!');
        expect(instance.findByProps({ testID: 'introText' }).props.children).toBe('Get started by creating a Username.');
    });

    it('contains the username input component', () => {
        const component = renderer.create(<UsernameScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'usernameInput' })).toBeTruthy();
    });

    it('contains the Next button', () => {
        const component = renderer.create(<UsernameScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'nextButton' })).toBeTruthy();
    });
});
