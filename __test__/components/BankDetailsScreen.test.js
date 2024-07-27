import React from 'react';
import renderer from 'react-test-renderer';
import BankDetailsScreen from '../../app/screens/onboarding/BankDetailsScreen';

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

describe('BankDetailsScreen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<BankDetailsScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains the expected text elements', () => {
        const component = renderer.create(<BankDetailsScreen />);
        const instance = component.root;

        expect(instance.findByProps({ testID: 'headerText' }).props.children).toBe('Enter Bank Account Details');
        expect(instance.findByProps({ testID: 'descriptionText' }).props.children).toBe('Receive real time updates to update your expenses whenever you make a payment.');
    });

    it('contains the BackButton component', () => {
        const component = renderer.create(<BankDetailsScreen />);
        const instance = component.root;

        expect(instance.findByProps({testID: 'backButton'})).toBeTruthy();
    });

    it('contains the TextInput component', () => {
        const component = renderer.create(<BankDetailsScreen />);
        const instance = component.root;

        expect(instance.findByProps({testID: 'bankDetailsInput'})).toBeTruthy();
    });

    it('contains the TouchableOpacity component', () => {
        const component = renderer.create(<BankDetailsScreen />);
        const instance = component.root;

        expect(instance.findByProps({testID: 'nextButton'})).toBeTruthy();
    });
});
