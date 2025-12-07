export enum Role {
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
    VIEWER = 'VIEWER',
    USER = 'USER',
}

export const RoleHierarchy: Record<Role, number> = {
    [Role.VIEWER]: 1,
    [Role.USER]: 2,
    [Role.ADMIN]: 10,
    [Role.OWNER]: 20
};
