import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { View, Text } from 'react-native'; // Import necessary components from react-native
import BudgetsScreen from '../../app/screens/budgets/BudgetsScreen';
import { supabase } from '../../lib/supabase';
import BudgetModal from '../../app/screens/budgets/components/BudgetModal';
import AddCategoryModal from '../../app/screens/budgets/components/AddCategoryModal';
import TotalBudget from '../../app/screens/budgets/components/TotalBudget';
import CategoryList from '../../app/screens/budgets/components/CategoryList';
import AddCategoryButton from '../../app/screens/budgets/components/AddCategoryButton';

jest.mock('../../lib/supabase', () => ({
    supabase: {
        auth: {
            getUser: jest.fn(),
        },
        rpc: jest.fn(),
        channel: jest.fn().mockReturnValue({
            on: jest.fn().mockReturnThis(),
            subscribe: jest.fn().mockResolvedValue({
                data: { categories: [] },
            }),
        }),
    },
}));


jest.mock('../../app/screens/budgets/components/BudgetModal', () => 'BudgetModal');
jest.mock('../../app/screens/budgets/components/AddCategoryModal', () => 'AddCategoryModal');
jest.mock('../../app/screens/budgets/components/TotalBudget', () => 'TotalBudget');
jest.mock('../../app/screens/budgets/components/CategoryList', () => 'CategoryList');
jest.mock('../../app/screens/budgets/components/AddCategoryButton', () => 'AddCategoryButton');

describe('BudgetsScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', async () => {
        supabase.auth.getUser.mockResolvedValue({ data: { user: { id: '123' } } });
        supabase.rpc.mockResolvedValue({ data: [] });

        let tree;
        await act(async () => {
            tree = renderer.create(<BudgetsScreen />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('contains the expected text elements', async () => {
        supabase.auth.getUser.mockResolvedValue({ data: { user: { id: '123' } } });
        supabase.rpc.mockResolvedValue({ data: [] });

        let component;
        await act(async () => {
            component = renderer.create(<BudgetsScreen />);
        });
        const instance = component.root;

        expect(instance.findByType(Text).props.children).toContain('Set up a monthly budget goal');
    });

    it('contains the BudgetModal, AddCategoryModal, TotalBudget, CategoryList, and AddCategoryButton components', async () => {
        supabase.auth.getUser.mockResolvedValue({ data: { user: { id: '123' } } });
        supabase.rpc.mockResolvedValue({ data: [] });

        let component;
        await act(async () => {
            component = renderer.create(<BudgetsScreen />);
        });
        const instance = component.root;

        expect(instance.findByType('BudgetModal')).toBeTruthy();
        expect(instance.findByType('AddCategoryModal')).toBeTruthy();
        expect(instance.findByType('TotalBudget')).toBeTruthy();
        expect(instance.findByType('CategoryList')).toBeTruthy();
        expect(instance.findByType('AddCategoryButton')).toBeTruthy();
    });
});
