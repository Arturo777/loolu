import { UserProfile, UserType, ProfileType, ProviderType, ApprovalProfileType, MenuDetailsType } from 'types/user-profile';

export interface FriendsCardProps {
    avatar: string;
    location: string;
    name: string;
}

export interface UserProfileCardProps extends UserProfile {
    profile: string;
}

export interface UserSimpleCardProps {
    avatar: string;
    name: string;
    status: string;
}

export interface SecurityStateProps {
    error: object | string | null;
    loading: boolean;
    usersList: UserType[];
    currentUser?: UserType;
    loadingEditInfo: boolean;
    profiles: ProfileType[];
    providers: ProviderType[];
    approvalProfiles: ApprovalProfileType[];
    fetching: boolean;
    menuOptions: MenuDetailsType[];
}

export type UserProfileStyle2 = {
    image: string;
    name: string;
    designation: string;
    badgeStatus: string;
    subContent: string;
    email: string;
    phone: string;
    location: string;
    progressValue: string;
};

export type AuthStateProps = {
    userName?: string;
    loading: boolean;
    error: object | string | null;
    user: UserType | null;
    merchants: MerchantType[] | null;
};

export type ProfileStateProps = {
    error: object | string | null;
    loading: boolean;
    fetching: boolean;
    profiles: ProfileType[];
};

export type NewProfileType = {
    type: string;
    description: string;
    menus: string[];
    idStatus?: boolean;
};

export type MerchantType = {
    merchantId: number;
    name: string;
    isFather: boolean;
    status?: boolean;
};
