import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white">
            <div className="bg-white text-gray-800 rounded-2xl shadow-2xl p-10 max-w-md w-full text-center animate-fade-in-down">
                <div className="text-6xl mb-4">🚫</div>
                <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
                <p className="text-gray-600 mb-6">
                    {`You don't have permission to view this page. Please contact the administrator if you believe this is an error.`}
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
                >
                    <ArrowLeft size={18} />
                    Go back home
                </Link>
            </div>
        </div>
    );
}
