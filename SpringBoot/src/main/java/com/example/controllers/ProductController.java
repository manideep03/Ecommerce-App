package com.example.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Product;
import com.example.security.services.ProductService;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:8081")
public class ProductController {
	
	@Autowired
	ProductService productService;
	
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SELLER')")
	@PostMapping("/addProduct")
	public String addProduct(@RequestBody Product product) {
		productService.addProduct(product);
		
		return "product added";
	}
	
	
	@GetMapping("/getAll")
	public List<Product> getAll(){
		return productService.getAll();
	}
	
	@GetMapping("/getById")
	public Optional<Product> getById(@PathVariable Long id){
		return productService.getProductById(id);
	}
	
	
	
	@GetMapping("/getByCategory")
	public List<Product> getByCatergory(@PathVariable String catergory){
		return productService.getByCategory(catergory);
	}
	
	
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SELLER')")
	@DeleteMapping("deleteById")
	public String deleteById(@PathVariable Long id) {
		productService.deleteProductById(id);
		
		return "deleted the product";
	}


}
