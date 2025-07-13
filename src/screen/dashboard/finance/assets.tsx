import { GemIcon } from "lucide-react";

export default function AssetsManagement() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-card h-100 flex flex-col items-center justify-center rounded-md">
                <GemIcon className="h-12 w-12 animate animate-pulse mb-8" />
                <div className="text-2xl font-bold animate animate-pulse">
                Assets Management under development
                </div>
            </div>
        </div>
    )
}