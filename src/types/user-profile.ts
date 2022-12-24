export type HandleFunction = (i: string, s: string) => Promise<void>;

export type ProfileProgress = {
    label: string;
    variant: string;
    value: number;
};

export type UserProfile = {
    id?: string;
    user?: string;
    avatar?: string;
    image?: string;
    name?: string;
    role?: string;
    about?: string;
    email?: string;
    work_email?: string;
    personal_email?: string;
    phone?: string;
    work_phone?: string;
    personal_phone?: string;
    birthdayText?: string;
    lastMessage?: string;
    status?: string;
    friends?: number;
    followers?: number;
    contact?: string;
    company?: string;
    location?: string;
    online_status?: string;
    unReadChatCount?: number;
    time?: string;
    tier?: string;
    Progress?: ProfileProgress;
};

export type Profile = {
    id: string;
    avatar: string;
    name: string;
    time: string;
};

export type UserType = {
    id: number;
    email: string;
    name: string;
    phoneNumber: string | number;
    firstName: string;
    lastName: string;
    status: number;
    user: string;
    profile: ProfileType;
    employeNumber: number;
    avatar: string;
    provider: ProviderType;
    idApprovalProfile: number | string | null;
    pass: string;
};

export type ProfileType = {
    id: number | string;
    description: string;
    type: string;
    idStatus?: boolean;
    menuDetails: MenuDetailsType[];
};

export type MenuDetailsType = {
    id: number;
    type: string;
    description: string;
    children: MenuDetailsChild[];
};

export type MenuDetailsChild = {
    id: number;
    type: string;
    url: string;
};

export type ProviderType = {
    idProvider: number | string;
    name: string;
};

export type ApprovalProfileType = {
    profileName: string;
    idProfile: number;
};
