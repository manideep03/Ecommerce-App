package com.example.security.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.Product;
import com.example.repository.ProductRepository;


@Service
public class ProductService {
	
	@Autowired
	ProductRepository productRepository;
	
	
	public void addProduct(Product product) {
		
		productRepository.save(product);
		
	}
	
	
	public List<Product> getAll(){
		
		List<Product> products = productRepository.findAll();
		return products;
		
	}
	
	public Optional<Product> getProductById(Long id) {
		
		return productRepository.findById(id);
	}
	
	
	public List<Product> getByCategory(String category) {
		
		List<Product> products = productRepository.findByCategory(category);
		
		return products;
	}
	
	
	public void deleteProductById(Long id) {
		
		productRepository.deleteById(id);
		
	}

}
