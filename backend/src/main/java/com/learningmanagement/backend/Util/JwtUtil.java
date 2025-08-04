package com.learningmanagement.backend.Util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET = "your-secret-key-1234567890";
    private static final long EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour

    private static final Algorithm algorithm = Algorithm.HMAC256(SECRET);

    public String generateToken(String email) {
        return JWT.create()
                .withSubject(email)
                .withIssuer("lms-app")
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(algorithm);
    }

    public String validateAndExtractEmail(String token) throws JWTVerificationException {
        DecodedJWT jwt = JWT.require(algorithm)
                .withIssuer("lms-app")
                .build()
                .verify(token);
        return jwt.getSubject();
    }
}
