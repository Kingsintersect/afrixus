import React from 'react';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
} from 'lucide-react';
import { SITE_NAME } from '@/lib/config';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const socialLinks = [
        { icon: Facebook, href: "https://facebook.com", name: "Facebook" },
        { icon: Twitter, href: "https://twitter.com", name: "Twitter" },
        { icon: Instagram, href: "https://instagram.com", name: "Instagram" },
        { icon: Youtube, href: "https://youtube.com", name: "YouTube" }
    ];

    const paymentMethods = [
        "Stripe", "Paycomet",
    ];

    return (
        <footer className="bg-gray-900 text-white mt-10">
            {/* Bottom Section */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                        {/* Social Links */}
                        <div className="flex items-center space-x-6">
                            <span className="text-gray-400 text-sm font-medium">Follow us:</span>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        aria-label={social.name}
                                        className="text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <social.icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-400 text-sm font-medium">We accept:</span>
                            <div className="flex items-center space-x-2">
                                {paymentMethods.map((method, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded px-2 py-1 text-xs font-medium text-gray-800"
                                    >
                                        {method}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} {SITE_NAME.toLowerCase()}. All rights reserved.
                            {/* |{' '} */}
                            {/* <a href="/privacy#" className="hover:text-white transition-colors duration-200">
                                Privacy Policy
                            </a>
                            {' | '}
                            <a href="/terms#" className="hover:text-white transition-colors duration-200">
                                Terms of Service
                            </a> */}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;