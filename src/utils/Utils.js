import jwt_decode from "jwt-decode";

export const checkAuth = () => {

    let token = localStorage.getItem('token');
    let decodedToken = jwt_decode(token);
    let isValid = decodedToken.exp*1000 > Date.now();
    console.log('Auth is ', isValid ? 'valid' : 'expired')
}

export const sortMessage = (messages) => {
    let newMessages = {}
    messages.forEach(message => {
        if (message.senderId in newMessages) {
            newMessages[`${message.senderId}`].messages.push({body: message.body, status: message.status})
        } else {
            newMessages[`${message.senderId}`] = {messages: [], senderName: message.senderName}
            newMessages[`${message.senderId}`].messages.push({body: message.body, status: message.status})
        }
    })
    return newMessages;
}