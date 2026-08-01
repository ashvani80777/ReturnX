package com.returnX.user_service.exception;

public class ResourceAlreadyExistsException extends RuntimeException{
    public ResourceAlreadyExistsException(String msg){
        super(msg);
    }
}
