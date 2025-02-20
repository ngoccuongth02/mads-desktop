import { useRef } from 'react';

const useDebounce = (callback: () => void, delay: number) => {
    const timer = useRef<NodeJS.Timeout | null>(null);

    const debouncedFunction = () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            callback();
        }, delay);
    };

    return debouncedFunction;
};

export default useDebounce;
