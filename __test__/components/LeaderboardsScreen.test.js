import React from 'react';
import renderer from 'react-test-renderer';
import LeaderboardScreen from '../../app/screens/leaderboards/LeaderBoardsScreen';

// Mock LeaderboardList component
jest.mock('../../app/screens/leaderboards/components/LeaderBoardList', () => 'LeaderboardList');

describe('LeaderboardScreen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<LeaderboardScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains the expected text elements', () => {
        const component = renderer.create(<LeaderboardScreen />);
        const instance = component.root;

        expect(instance.findByProps({testID: 'leaderboards'}).props.children).toBe('Leaderboards');
    });

    it('contains the LeaderboardList component', () => {
        const component = renderer.create(<LeaderboardScreen />);
        const instance = component.root;

        expect(instance.findByType('LeaderboardList')).toBeTruthy();
    });
});
