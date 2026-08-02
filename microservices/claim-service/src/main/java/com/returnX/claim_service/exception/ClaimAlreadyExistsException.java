package com.returnX.claim_service.exception;

public class ClaimAlreadyExistsException extends RuntimeException {

    public ClaimAlreadyExistsException(String message) {
        super(message);
    }
}