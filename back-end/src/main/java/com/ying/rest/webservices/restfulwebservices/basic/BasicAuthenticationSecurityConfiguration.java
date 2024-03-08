package com.ying.rest.webservices.restfulwebservices.basic;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

//@Configuration  
//I dont want BasicAuthenticationSecurityConfiguration to be picked up, so I comment @Configuration
public class BasicAuthenticationSecurityConfiguration {
	//spring security filter chain
	//if you start defining a chain, you need to define the entire chain, 
	//by default,spring security would authenticate all requests	
	//disabling csrf
	//whenever you have a session, it is very important that you enable csrf,
	//over here we are creating REST API and therefore we dont need to have any session,
	// so we would want to create a stateless rest api
	
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http.authorizeHttpRequests(//http support chaining of calls
				auth -> auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()//allowing options request on all URLs
				.anyRequest().authenticated()
				)//enable authentication for every request
		
					//enable basic authentication
					.httpBasic(Customizer.withDefaults())
					
					//configuring stateless session
					.sessionManagement(
							session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
							)
					.csrf().disable()
					.build();
	}
	

}
