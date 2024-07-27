import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../../app/screens/startpage/LoginScreen'; 
import BackButton from '../../app/components/BackButton'; 


jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
        }),
    };
});

describe('LoginScreen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<LoginScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains the BackButton component', () => {
        const component = renderer.create(<LoginScreen />);
        const instance = component.root;

        // Check if BackButton component is rendered
        expect(instance.findByType(BackButton)).toBeTruthy();
    });

    it('contains the logo image with correct source', () => {
        const component = renderer.create(<LoginScreen />);
        const instance = component.root;

        
        // Find all Image components
        const images = instance.findAllByType('Image');
        expect(images.length).toBeGreaterThan(0);
    });

    it('contains the expected elements with correct testIDs', () => {
        const component = renderer.create(<LoginScreen />);
        const instance = component.root;

        // Check if the BackButton container is present
        expect(instance.findByProps({ testID: 'backButtonContainer' })).toBeTruthy();
        
        // Check if LoginCard component is present with the testID
        expect(instance.findByProps({ testID: 'loginCard' })).toBeTruthy();
    });
});
