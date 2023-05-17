import { Meta, StoryObj } from '@storybook/react';
import { CoinTracker } from './CoinTracker';

const meta = {
    title: 'components/example/CoinTracker',
    component: CoinTracker,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof CoinTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };
