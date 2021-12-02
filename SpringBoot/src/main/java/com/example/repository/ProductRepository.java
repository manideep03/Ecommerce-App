package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

	List<Product> findByCategory(String category);
	
	
	
}
