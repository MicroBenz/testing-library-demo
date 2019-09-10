import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import '@testing-library/jest-dom/extend-expect';

import Counter, { useCounter } from './Counter';

//@ts-check
describe('Counter', () => {
  it('Display correct type', () => {
    const rendered = render(<Counter />);
    expect(rendered.getByTestId('counter-title')).not.toBeNull();
    expect(rendered.getByTestId('counter-title')).toHaveTextContent('Hi! I am Simple Counter');
    cleanup();

    const renderedAdvance = render(<Counter isAdvance />);
    expect(renderedAdvance.getByTestId('counter-title')).not.toBeNull();
    expect(renderedAdvance.getByTestId('counter-title')).toHaveTextContent('Hi! I am Advance Counter');
  });

  it('Simple: Should behave correctly', () => {
    const { getByTestId } = render(<Counter />);
    const counterValueDOM = getByTestId('counter-value');
    const incrementDOM = getByTestId('btn-increment');
    const decrementDOM = getByTestId('btn-decrement');
  
    expect(() => {
      expect(getByTestId('holy-text')).toHaveTextContent('HOLY MOLLY');
    }).toThrow();

    expect(counterValueDOM).toHaveTextContent('0');
    fireEvent.click(incrementDOM);
    expect(counterValueDOM).toHaveTextContent('1');
    fireEvent.click(incrementDOM);
    expect(counterValueDOM).toHaveTextContent('2');
    expect(() => {
      expect(getByTestId('holy-text')).toHaveTextContent('HOLY MOLLY');
    }).toThrow();
    for (let i = 0 ; i <= 10 ; i += 1) {
      fireEvent.click(incrementDOM);
    }
    expect(counterValueDOM).toHaveTextContent('13');
    expect(() => {
      expect(getByTestId('holy-text')).toHaveTextContent('HOLY MOLLY');
    }).toThrow();
    fireEvent.click(decrementDOM);
    expect(counterValueDOM).toHaveTextContent('12');
  });

  // Requirement: +3 -1 , if absolute value of counter is divisable by 10 -> also render "HOLY MOLLY" text
  it('Advance: Should behave correctly', () => {
    const { getByTestId } = render(<Counter isAdvance />);
    const counterValueDOM = getByTestId('counter-value');
    const incrementDOM = getByTestId('btn-increment');
    const decrementDOM = getByTestId('btn-decrement');
    const holyDOM = getByTestId('holy-text');

    expect(counterValueDOM).toHaveTextContent('0');
    expect(holyDOM).toHaveTextContent('HOLY MOLLY');

    fireEvent.click(incrementDOM);
    expect(counterValueDOM).toHaveTextContent('3');
    expect(() => {
      expect(getByTestId('holy-text')).toHaveTextContent('HOLY MOLLY');
    }).toThrow();
    expect(holyDOM).toHaveTextContent('HOLY MOLLY');

    fireEvent.click(incrementDOM);  
    expect(counterValueDOM).toHaveTextContent('6');

    fireEvent.click(incrementDOM);
    expect(counterValueDOM).toHaveTextContent('9');

    fireEvent.click(decrementDOM);
    expect(counterValueDOM).toHaveTextContent('8');

    fireEvent.click(decrementDOM);
    expect(counterValueDOM).toHaveTextContent('7');

    fireEvent.click(incrementDOM);
    expect(counterValueDOM).toHaveTextContent('10');
    expect(holyDOM).toHaveTextContent('HOLY MOLLY');
    for (let i = 0 ; i < 20 ; i += 1) {
      fireEvent.click(decrementDOM);
    }
    expect(counterValueDOM).toHaveTextContent('-10');
    expect(holyDOM).toHaveTextContent('HOLY MOLLY');
  });
});

describe('Counter hooks', () => {
  describe('Simple', () => {
    it('should work', () => {
      const { result } = renderHook(() => useCounter());
      expect(result.current.counter).toBe(0);
      act(() => {
        result.current.increment();
      });
      expect(result.current.counter).toBe(1);
      act(() => {
        result.current.increment();
        result.current.increment();
        result.current.increment();
        result.current.increment();
      });

      act(() => {
        result.current.decrement();
        result.current.decrement();
      });
      expect(result.current.counter).toBe(3);
    });
  });

  describe('Advance', () => {
    it('should work', () => {
      const { result } = renderHook(() => useCounter(true));
      expect(result.current.counter).toBe(0);
      act(() => {
        result.current.increment();
      });
      expect(result.current.counter).toBe(3);
      act(() => {
        result.current.increment();
        result.current.increment();
        result.current.increment();
        result.current.increment();
      });
      expect(result.current.counter).toBe(15);
      act(() => {
        result.current.decrement();
        result.current.decrement();
      });
      expect(result.current.counter).toBe(13);
    });
  });
});
