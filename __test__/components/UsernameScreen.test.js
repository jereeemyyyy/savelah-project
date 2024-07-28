import React from 'react';
import renderer, { act } from 'react-test-renderer';
import UsernameScreen from '../../app/screens/onboarding/UsernameScreen';
import { supabase } from '../../lib/supabase';

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
        }),
    };
});

jest.mock('../../lib/supabase', () => ({
    supabase: {
        auth: {
            getUser: jest.fn(),
        },
    },
}));

describe('UsernameScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', async () => {
        supabase.auth.getUser.mockResolvedValue({ data: { user: { id: '123' } } });

        let tree;
        await act(async () => {
            tree = renderer.create(<UsernameScreen />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('contains the expected text elements', async () => {
        supabase.auth.getUser.mockResolvedValue({ data: { user: { id: '123' } } });

        let component;
        await act(async () => {
            component = renderer.create(<UsernameScreen />);
        });
        const instance = component.root;

        expect(instance.findByProps({ testID: 'welcomeText' }).props.children).toBe('Welcome to SaveLah!');
        expect(instance.findByProps({ testID: 'introText' }).props.children).toBe('Get started by creating a Username.');
    });

    it('contains the username input component', async () => {
        supabase.auth.getUser.mockResolvedValue({ data: { user: { id: '123' } } });

        let component;
        await act(async () => {
            component = renderer.create(<UsernameScreen />);
        });
        const instance = component.root;

        expect(instance.findByProps({ testID: 'usernameInput' })).toBeTruthy();
    });

    it('contains the Next button', async () => {
        supabase.auth.getUser.mockResolvedValue({ data: { user: { id: '123' } } });

        let component;
        await act(async () => {
            component = renderer.create(<UsernameScreen />);
        });
        const instance = component.root;

        expect(instance.findByProps({ testID: 'nextButton' })).toBeTruthy();
    });
});
