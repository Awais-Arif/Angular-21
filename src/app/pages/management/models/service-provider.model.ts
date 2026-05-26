export interface ServiceProvider {
    userId?: number;
    id: number;
    fullName: string;
    bio: string;
    gender: string;
    profilePicture: string;
    businessAddress: string;
    businessPhoneNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
    isApproved: boolean;
}