export const States = {
    PENDING: "PENDING",
    USER_CREATION: "USER_CREATION",
    USER_LOG_IN: "USER_LOG_IN",
    USER_AUTHENTICATED: "USER_AUTHENTICATED",
};
  
export const persona = {
    VENDOR: "Vendor",
    ADMIN: "Admin",
    USER: "End User"
};

export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}