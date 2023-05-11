import {showMessage} from "react-native-flash-message";

const showError = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        duration: 5000,
        message
    })
}

const showSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        duration: 5000,
        message,
        backgroundColor: '#8BC34A',
        color: '#FFFFFF',
    })
}

const showInfo = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        duration: 5000,
        message
    })
}

export { 
    showError, 
    showSuccess
}