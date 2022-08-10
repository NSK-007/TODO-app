package com.in28minutes.rest.webservices.restfulwebservices.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.lang.*;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class HelloWorldController {
	
//	@RequestMapping(method=RequestMethod.GET, path="/hello-world")
//	@GetMapping(path="/hello-world")
	@GetMapping("/hello-world")
	public String helloWorld() {
		return "Hello World!";
	}
	
	@GetMapping("/hello-world-bean")
	public HelloWorldBean helloWorldBean() {
		return new HelloWorldBean("Hello World Bean!");
	}
	
	@GetMapping("/")
	public String home() {
		return "Welcome Home!";
	}
	
	@GetMapping("/hello-world-bean/path-variable/{name}")
	public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
//		throw new RuntimeException("Something went wrong");
		return new HelloWorldBean(String.format("Hello World! %s", name));
	}
	
}
