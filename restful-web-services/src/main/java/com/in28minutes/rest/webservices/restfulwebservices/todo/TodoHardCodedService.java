package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class TodoHardCodedService {
	private static List<Todo> todos = new ArrayList<>();
	private static long idCounter = 0;
	
	static {
		todos.add(new Todo(++idCounter, "in28minutes", "Learn to Dance", new Date(), false));
		todos.add(new Todo(++idCounter, "in28minutes", "Learn about MicroServices", new Date(), false));
		todos.add(new Todo(++idCounter, "in28minutes", "Learn Angular", new Date(), false));
	}
	
	public List<Todo> findAll(){
		return  todos;
	}
	
	public Todo deleteById(long id){
		Todo todo = findById(id);
		todos.remove(todo);
		return todo;
	}
	
	public Todo findById(long id) {
		for(Todo t : todos) {
			if(t.getId() == id)
				return t;
		}
		return null;
	}
	
	public Todo save(Todo todo) {
		if(todo.getId()==-1 || todo.getId()==0) {
			todo.setId(++idCounter);
			todos.add(todo);
		}
		else {
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}
}
