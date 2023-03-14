export type MessageChat = {
    message: string;
    id: number;
};
export interface MessageChatProps {
    loading: boolean;
    updating: boolean;
    error: object | string | null;
    messageChat?: MessageChat | null;
}
