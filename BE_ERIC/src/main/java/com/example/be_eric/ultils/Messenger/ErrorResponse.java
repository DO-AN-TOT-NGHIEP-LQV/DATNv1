package com.example.be_eric.ultils.Messenger;

public class ErrorResponse {
    private String error_message;

    public ErrorResponse(String error_message) {
        this.error_message = error_message;
    }

    public String getErrorMessage() {
        return error_message;
    }

    public void setErrorMessage(String error_message) {
        this.error_message = error_message;
    }
}

