import React, { useState } from 'react';
import { useAuth } from '@/hooks/contextHooks/Auth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner"; 
import { useNavigate } from 'react-router-dom';
import  { useCreateWorkspaceModal } from "@/hooks/contextHooks/Workspace"; // ✅ Fixed import

const Useravtar = () => {
    const { Auth, logout } = useAuth();
    const { user } = Auth;
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const { setIsCreateWorkSpaceModalOpen } = useCreateWorkspaceModal(); // ✅ works with context

    async function handleLogout() {
        try {
            setIsLoggingOut(true);
            await logout();
            toast("You've been logged out successfully!");
            navigate('/auth/signin');
        } catch (error) {
            console.error("Logout failed:", error);
            toast("Hmm… something went wrong while logging out. Try again!");
        } finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={user?.avatar || "https://via.placeholder.com/150"} alt={user?.name || "User Avatar"} />
                        <AvatarFallback>{user?.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user?.name || "User"}</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* Create Workspace */}
                    <DropdownMenuItem onClick={() => setIsCreateWorkSpaceModalOpen(true)}>
                        Create Workspace
                    </DropdownMenuItem>

                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={handleLogout} 
                        disabled={isLoggingOut}
                        className="flex items-center gap-2"
                    >
                        {isLoggingOut && (
                            <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-500"></span>
                        )}
                        {isLoggingOut ? "Logging out..." : "Logout"}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Useravtar;
