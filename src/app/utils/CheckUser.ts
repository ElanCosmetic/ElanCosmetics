import { User } from "@/payload-types";
const CheckUser = async (): Promise<User | null> => {
    const response = await fetch("/api/users/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    })

    if (response.ok) {
        const data = await response.json();
        return data.user
    }

    return null
}

export default CheckUser

