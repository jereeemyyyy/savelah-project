import React from 'react';
import renderer from 'react-test-renderer';
import IntroScreen from '../../app/screens/onboarding/IntroScreen';

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
                userId: '123',
            },
        }),
    };
});

describe('IntroScreen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<IntroScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains the expected text elements', () => {
        const component = renderer.create(<IntroScreen />);
        const instance = component.root;
        const welcomeText = instance.findByProps({ testID: 'welcomeText' }).props.children.join('');
        
        expect(welcomeText).toBe('Welcome testuser!');
        expect(instance.findByProps({ testID: 'introText' }).props.children).toBe('Here’s a short intro on how to use the app.');
    });

    it('contains the BackButton component', () => {
        const component = renderer.create(<IntroScreen />);
        const instance = component.root;

        expect(instance.findByProps({testID: 'backButton'})).toBeTruthy();
    });

    it('contains the Carousel component', () => {
        const component = renderer.create(<IntroScreen />);
        const instance = component.root;

        expect(instance.findByProps({testID: 'carousel'})).toBeTruthy();
    });

    it('contains the Finish button', () => {
        const component = renderer.create(<IntroScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'finishButton' })).toBeTruthy();
    });
});
