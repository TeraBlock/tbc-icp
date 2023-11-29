import { Principal } from 'azle';

// Initialize with a hardcoded principal
const authorizedPrincipals: Principal[] = [
    Principal.fromText("2vxsx-fae")
];

// Function to check if a user is authorized
export function isAuthorized(callerPrincipal: Principal): boolean {
    return authorizedPrincipals.some(authPrincipal => authPrincipal.compareTo(callerPrincipal)=="eq");
}

// Function to add a new authorized principal
export function addAuthorizedPrincipal(newPrincipal: Principal): void {
    if (!authorizedPrincipals.some(principal => principal.compareTo(newPrincipal)=="eq")) {
        authorizedPrincipals.push(newPrincipal);
    }
}

// Function to remove an authorized principal
export function removeAuthorizedPrincipal(principalToRemove: Principal): void {
    const index = authorizedPrincipals.findIndex(principal => principal.compareTo(principalToRemove)=="eq");
    if (index >= 0) {
        authorizedPrincipals.splice(index, 1);
    }
}

// Function to list all authorized principals
export function listAuthorizedPrincipals(): Principal[] {
    return authorizedPrincipals;
}
