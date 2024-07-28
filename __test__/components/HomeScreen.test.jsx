import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import HomeScreen from '../../app/screens/home/HomeScreen';
import { supabase } from '../../lib/supabase';
import ExpensesSummary from '../../app/components/ExpensesSummary';
import ToDoList from '../../app/screens/home/components/ToDoList';

jest.mock('../../lib/supabase', () => ({
    supabase: {
        auth: {
            getUser: jest.fn(),
        },
    },
}));

jest.mock('../../app/components/ExpensesSummary', () => 'ExpensesSummary');
jest.mock('../../app/screens/home/components/ToDoList', () => 'ToDoList');

describe('HomeScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', async () => {
        supabase.auth.getUser.mockResolvedValue({ data: { user: { id: '123' } } });

        let tree;
        await act(async () => {
            tree = renderer.create(<HomeScreen />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('contains the expected text elements', async () => {
        supabase.auth.getUser.mockResolvedValue({ data: { user: { id: '123' } } });

        let component;
        await act(async () => {
            component = renderer.create(<HomeScreen />);
        });
        const instance = component.root;

        expect(instance.findByType(Text).props.children).toContain('Expenses This Week');
    });

    it('contains the ExpensesSummary and ToDoList components', async () => {
        supabase.auth.getUser.mockResolvedValue({ data: { user: { id: '123' } } });

        let component;
        await act(async () => {
            component = renderer.create(<HomeScreen />);
        });
        const instance = component.root;

        expect(instance.findByType('ExpensesSummary')).toBeTruthy();
        expect(instance.findByType('ToDoList')).toBeTruthy();
    });
});
