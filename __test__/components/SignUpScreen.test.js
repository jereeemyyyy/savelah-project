import React from 'react';
import renderer from 'react-test-renderer';
import SignUpScreen from '../../app/screens/startpage/SignUpScreen';

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
        }),
    };
});

describe('SignUpScreen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<SignUpScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains the expected text elements', () => {
        const component = renderer.create(<SignUpScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'registrationHeaderText' }).props.children).toBe('Registration');
        expect(instance.findByProps({ testID: 'createAccountText' }).props.children).toBe('Create an account to continue');
    });

    it('contains the BackButton component', () => {
        const component = renderer.create(<SignUpScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'backButton' })).toBeTruthy();
    });

    it('contains the RegistrationCard component', () => {
        const component = renderer.create(<SignUpScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'registrationCard' })).toBeTruthy();
    });
});
