// jest/setup.js
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated-carousel', () => 'Carousel');
