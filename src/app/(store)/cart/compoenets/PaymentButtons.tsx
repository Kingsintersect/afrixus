import Image from 'next/image';
import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    to?: string;
    isLoading?: boolean;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface PaymentButtonProps extends ButtonProps {
    variant?: 'stripe' | 'paycomet' | 'paystack';
}

const PaymentButton: FC<PaymentButtonProps> = ({
    to,
    children,
    className = '',
    isLoading = false,
    disabled = false,
    variant = 'stripe',
    onClick,
    ...props
}) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (disabled || isLoading) return;

        if (to) {
            console.log(`Navigating to: ${to}`);
        }

        onClick?.(e);
    };

    const buttonConfig = {
        paystack: {
            colors: 'border-teal-200 focus:ring-teal-100 dark:focus:ring-teal-600',
            icon: '/icons/paystack-logo.svg',
            text: 'Check out with Stripe',
            alt: 'Stripe Payment'
        },
        stripe: {
            colors: 'border-purple-200 focus:ring-purple-100 dark:focus:ring-purple-600',
            icon: '/icons/Stripe-wordmark-blurple.svg',
            text: 'Check out with Stripe',
            alt: 'Stripe Payment'
        },
        paycomet: {
            colors: 'border-blue-200 focus:ring-blue-100 dark:focus:ring-blue-600',
            icon: '/icons/paycomet-logo-1.png',
            text: 'Pay with Paycomet',
            alt: 'Paycomet Payment'
        }
    };

    const config = buttonConfig[variant];

    return (
        <button
            type="button"
            className={`
                relative inline-flex items-center justify-center px-5 py-2.5 
                text-sm font-medium rounded-lg transition-all duration-200
                text-gray-900 bg-white border hover:bg-gray-100 
                focus:ring-4 focus:outline-none
                dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
                dark:disabled:hover:bg-gray-800
                ${config.colors}
                ${className}
            `}
            onClick={handleClick}
            disabled={disabled || isLoading}
            aria-label={config.text}
            {...props}
        >
            {isLoading ? (
                <>
                    <div className="w-4 h-4 mr-3 animate-spin border-2 border-gray-300 border-t-gray-900 rounded-full dark:border-gray-600 dark:border-t-white" />
                    Processing...
                </>
            ) : (
                <>
                    <div className="relative w-20 h-7 mr-3 flex-shrink-0">
                        <Image
                            alt={config.alt}
                            src={config.icon}
                            className="object-contain"
                            fill
                            sizes="80px"
                        />
                    </div>
                    {children || config.text}
                </>
            )}
        </button>
    );
};

export const PaystackPaymentButton: FC<ButtonProps> = (props) => (
    <PaymentButton {...props} variant="paystack" />
);

export const StripePaymentButton: FC<ButtonProps> = (props) => (
    <PaymentButton {...props} variant="stripe" />
);

export const PaycometPaymentButton: FC<ButtonProps> = (props) => (
    <PaymentButton {...props} variant="paycomet" />
);

