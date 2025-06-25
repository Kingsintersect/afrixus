import { Badge } from '@/components/ui/badge'
import React from 'react'
import { MessageSquare } from 'lucide-react';
import { Communication } from '@/schemas/customer-schema';

interface CustomerCommunicationsProps {
	communications: Communication[] | undefined;
}

const CustomerCommunications = ({ communications }: CustomerCommunicationsProps) => {
	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-gray-900">Communication History</h2>

			<div className="space-y-4">
				{communications?.map((comm) => (
					<div key={comm.id} className="p-4 border rounded-lg bg-white">
						<div className="flex justify-between items-start mb-2">
							<div className="flex items-center">
								<MessageSquare className="w-4 h-4 text-gray-400 mr-2" />
								<span className="font-medium text-gray-900">{comm.type}</span>
							</div>
							<Badge className="bg-green-100 text-green-700 text-xs">
								{comm.status}
							</Badge>
						</div>
						<div className="text-gray-700 mb-1">{comm.subject}</div>
						<div className="text-sm text-gray-500">
							{new Date(comm.created_at).toLocaleDateString()}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default CustomerCommunications