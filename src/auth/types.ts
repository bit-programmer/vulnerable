export type AuthType = {
    username: string | null;
    token: string | null;
    signin: (username: string, password: string) => Promise<void>;
    signout: () => void;
}
