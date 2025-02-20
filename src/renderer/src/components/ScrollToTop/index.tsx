import { ReactElement } from 'react';

interface ScrollToTopProps {
    children: ReactElement | null;
}

export default function ScrollToTop({ children }: ScrollToTopProps): ReactElement | null {
    return children || null;
}
