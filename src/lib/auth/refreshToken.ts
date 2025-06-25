interface Token {
    access_token: string;
    [key: string]: unknown;
}

export async function refreshAccessToken(token: Token) {
    try {
        const res = await fetch("https://api.afrixus.org/api/v1/customer/refresh", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) throw new Error("Failed to refresh");

        return {
            ...token,
            access_token: data.access_token,
        };
    } catch (error) {
        console.error("Refresh token error:", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}
