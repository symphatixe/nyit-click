/* "use client";
// import React, { useState } from "react";

// const WelcomeHeader: React.FC = () => {
//     const [username, setUsername] = useState("Helen");

//     return(
//         <div>
//             <h1 className="text-6xl font-bold text-[#002D72]">
//             WELCOME <br /> {username.toUpperCase()}
//             </h1>
//         </div>
//     );
// }; 
// export default WelcomeHeader;
*/
"use client";
import { createClient } from "@/lib/utils/database/supabase/client";
import React, { useEffect, useState } from "react";

const WelcomeHeader: React.FC = () => {
    const [userData, setUserData] = useState<{
        first_name: string;
        last_name: string;
        email: string;
        created_at: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getUser() {
            try {
                const supabase = createClient();

                //get authenticated user
                const { data: authData, error: userError } = await supabase.auth.getUser();

                if (userError) {
                    setError(userError.message);
                    setLoading(false);
                    return;
                }

                if (!authData.user) {
                    setError("No user found");
                    setLoading(false);
                    return;
                }

                //fetch user data from users table
                const { data: userData, error: dbError } = await supabase
                    .from('users')
                    .select('first_name, last_name, email, created_at')
                    .eq('id', authData.user.id)
                    .single();

                if (dbError) {
                    setError(dbError.message);
                    setLoading(false);
                    return;
                }

                setUserData(userData);
                setLoading(false);
            } catch (err) {
                setError("An error occurred");
                setLoading(false);
            }
        }

        getUser();
    }, []); 

    if (loading) {
        return (
            <div>
                <h1 className="text-6xl font-bold text-[#002D72]">Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1 className="text-6xl font-bold text-red-600">Error: {error}</h1>
            </div>
        );
    }

    return (
        <div>
            {/* need to change the logo to display first char of first and last name instead of hard coded pic */}
            <h1 className="text-6xl font-bold text-[#002D72]">
                WELCOME <br />
                {userData?.first_name?.toUpperCase()} {userData?.last_name?.toUpperCase()}
            </h1>
            <p className="text-sm text-gray-600 mt-2">{userData?.email}</p>
        </div>
    );
};

export default WelcomeHeader;
