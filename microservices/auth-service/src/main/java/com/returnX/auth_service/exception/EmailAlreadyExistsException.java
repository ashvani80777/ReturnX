package com.returnX.auth_service.exception;

public class EmailAlreadyExistsException extends RuntimeException{
    public EmailAlreadyExistsException(String msg){
        super(msg);
    }
}
