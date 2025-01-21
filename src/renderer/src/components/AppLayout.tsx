import { ComponentProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
    return (
        <main className={twMerge('flex flex-row h-screen bg-[#F4FBF7]', className)} {...props}>
            {children}
        </main>
    );
};

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
    return (
        <aside className={twMerge('w-[271px] py-[30px] h-[100vh] px-[36px] overflow-auto bg-[#FFF6F1]', className)} {...props}>
            {children}
        </aside>
    );
};

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(({ children, className, ...props }, ref) => {
    return (
        <div ref={ref} className={twMerge('flex-shrink-1 overflow-auto py-[30px] px-[30px] w-[calc(100%-271px)]', className)} {...props}>
            {children}
        </div>
    );
});

Content.displayName = 'Content';
