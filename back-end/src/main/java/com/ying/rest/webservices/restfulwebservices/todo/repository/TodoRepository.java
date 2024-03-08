package com.ying.rest.webservices.restfulwebservices.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ying.rest.webservices.restfulwebservices.todo.Todo;


public interface TodoRepository extends JpaRepository<Todo, Integer>{//id's type is integer
	
	List<Todo> findByUsername(String name);

}
