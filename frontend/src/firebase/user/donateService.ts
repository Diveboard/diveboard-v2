import { functions, httpsCallable } from '../auth/firebaseAuth';


export const customDonation = async (amount: number, saveCard: boolean) => {
    const stripeData = httpsCallable(functions, 'oneTimeDonation');
    const resp = await stripeData({
        amount,
        saveCard,
    })
    console.log(resp.data)
    return resp.data;
};
