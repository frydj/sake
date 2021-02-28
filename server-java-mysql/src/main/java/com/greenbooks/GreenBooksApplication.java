package com.greenbooks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class GreenBooksApplication {

	public static void main(String[] args) {
		SpringApplication.run(GreenBooksApplication.class, args);
	}
	
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:3000","http://localhost:3001","http://localhost:5000","http://3.133.106.228:3000","http://3.133.106.228:5000","http://172.31.17.23","http://ip-172-31-17-23.us-east-2.compute.internal","http://172.31.17.23:3000","http://172.31.17.23:5000");
            }
        };
    }
}
