import { functions, httpsCallable } from '../auth/firebaseAuth';

export const customDonation = async (amount: number, saveCard: boolean, token: string) => {
    const stripeData = httpsCallable(functions, 'oneTimeDonation');
    const resp = await stripeData({
        amount,
        saveCard,
        token
    })
    return resp.data;
};

export const subDonation = async (token: string, subType: string) => {
    const subData = httpsCallable(functions, 'subDonation');
    const resp = await subData({
        token,
        subType
        // subType: 'fiveForTwelve' | 'threeForTwelve'
    })
    return resp.data;
};
