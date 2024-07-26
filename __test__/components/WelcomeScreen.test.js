import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from '../../app/screens/startpage/WelcomeScreen'; // Update with the correct path

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
        }),
    };
});

describe('WelcomeScreen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<WelcomeScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains the expected text elements', () => {
        const component = renderer.create(<WelcomeScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'headerText' }).props.children).toBe('Easiest way to manage your finances!');
        expect(instance.findByProps({ testID: 'getStartedButtonText' }).props.children).toBe('Get started');
        expect(instance.findByProps({ testID: 'loginPromptText' }).props.children).toBe('Already have an account?');
        expect(instance.findByProps({ testID: 'loginButtonText' }).props.children).toBe('Login');
    });

    it('navigates to SignUp screen when Get started button is pressed', () => {
        const mockNavigate = jest.fn();

        jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: mockNavigate });

        const component = renderer.create(<WelcomeScreen />);
        const instance = component.root;

        const getStartedButton = instance.findByProps({ testID: 'getStartedButton' });
        getStartedButton.props.onPress();

        expect(mockNavigate).toHaveBeenCalledWith('SignUp');
    });

    it('navigates to Login screen when Login button is pressed', () => {
        const mockNavigate = jest.fn();

        jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({ navigate: mockNavigate });

        const component = renderer.create(<WelcomeScreen />);
        const instance = component.root;

        const loginButton = instance.findByProps({ testID: 'loginButton' });
        loginButton.props.onPress();

        expect(mockNavigate).toHaveBeenCalledWith('Login');
    });
});
