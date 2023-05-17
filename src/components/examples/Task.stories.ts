import type { Meta, StoryObj } from '@storybook/react';
import { Task } from './Task';

const meta = {
    title: 'components/examples/Task',
    component: Task,
    tags: ['autodocs'],
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        task: {
            id: '1',
            title: 'Test Task',
            state: 'TASK_INBOX',
        },
    },
};

export const Pinned: Story = {
    args: {
        task: {
            ...Default.args,
            state: 'TASK_PINNED',
        },
    },
};

export const Archived: Story = {
    args: {
        task: {
            ...Default.args,
            state: 'TASK_ARCHIVED',
        },
    },
};
