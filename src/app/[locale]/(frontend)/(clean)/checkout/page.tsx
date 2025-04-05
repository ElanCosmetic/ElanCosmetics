import payload from "@/queries";
import { headers as nextHeaders } from 'next/headers';
import CheckoutBody from "./CheckoutBody";

const Checkout = async () => {
    const headers = await nextHeaders();
    const result = payload.auth({ headers });
    const user = (await result).user;

    const resultDelivery = payload.findGlobal({
        slug: "delivery"
    })

    const delivery = (await resultDelivery).tax;

    return (
        <div className="text-gray-700 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-18 px-5 md:px-10 py-5">
            <CheckoutBody user={user} delivery={delivery ? delivery : 0} />
        </div>
    );
}

export default Checkout;
