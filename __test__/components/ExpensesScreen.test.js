import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Text, View } from 'react-native';
import ExpensesScreen from '../../app/screens/expenses/ExpensesScreen';
import { supabase } from '../../lib/supabase';
import ExpensesSummary from '../../app/components/ExpensesSummary';
import ExpensesCategoryButton from '../../app/screens/expenses/components/ExpensesCategoryButton';

jest.mock('../../lib/supabase', () => ({
    supabase: {
        auth: {
            getUser: jest.fn(),
        },
    },
}));

jest.mock('../../app/components/ExpensesSummary', () => 'ExpensesSummary');
jest.mock('../../app/screens/expenses/components/ExpensesCategoryButton', () => 'ExpensesCategoryButton');

describe('ExpensesScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', async () => {
        supabase.auth.getUser.mockResolvedValue({ data: { user: { id: '123' } } });

        let tree;
        await act(async () => {
            tree = renderer.create(<ExpensesScreen />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('contains the expected text elements', async () => {
        supabase.auth.getUser.mockResolvedValue({ data: { user: { id: '123' } } });

        let component;
        await act(async () => {
            component = renderer.create(<ExpensesScreen />);
        });
        const instance = component.root;

        expect(instance.findByType(Text).props.children).toContain('Expenses This Week');
    });

    it('contains the ExpensesSummary and ExpensesCategoryButton components', async () => {
        supabase.auth.getUser.mockResolvedValue({ data: { user: { id: '123' } } });

        let component;
        await act(async () => {
            component = renderer.create(<ExpensesScreen />);
        });
        const instance = component.root;

        expect(instance.findByType('ExpensesSummary')).toBeTruthy();
        expect(instance.findByType('ExpensesCategoryButton')).toBeTruthy();
    });
});
