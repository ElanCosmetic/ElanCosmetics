import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const SendHome = () => {

    const handleClick = () => {
        redirect('/');
    }
    return (
        <Button type="submit" onClick={handleClick}>Acasă</Button>
    )
}

export default SendHome;