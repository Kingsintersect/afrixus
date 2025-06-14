import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, User } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react'

const menuItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
];

interface Navigation {
    activeSection: string,
    setActiveSection: Dispatch<SetStateAction<string>>
}

const Navigation = ({ activeSection, setActiveSection }: Navigation) => {
    return (

        <Card className='rounded-none border-b-0'>
            <CardContent className="p-0">
                <nav className="flex items-center justify-center gap-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`flex items-center px-4 py-3 text-left text-sm font-medium transition-colors ${activeSection === item.id
                                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className="w-4 h-4 mr-3" />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
            </CardContent>
        </Card>
    )
}

export default Navigation