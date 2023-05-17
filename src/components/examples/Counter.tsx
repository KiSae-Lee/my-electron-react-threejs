import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { decrement, increment } from '../../app/modules/examples/counterSlice';

interface CounterProps {
    title: string;
}

const Counter = ({ title }: CounterProps) => {
    const count = useSelector((state: RootState) => state.counterSlice.value);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(increment());
    };

    const handleDecrement = () => {
        dispatch(decrement());
    };

    return (
        <div>
            <h1>{title}</h1>
            <p>Count: {count}</p>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
        </div>
    );
};

export default Counter;
