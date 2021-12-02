package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Cart;
import com.example.security.services.CartService;


@RequestMapping("/api")
@RestController

public class CartController {
	
	@Autowired
	CartService cartService;
	
	@GetMapping("/addToCart/{id}/{qt}")
	public String addToCart(@PathVariable Long id,@PathVariable Long qt) {
		cartService.addToCart(id,qt);
		return "added to CART";
	}
	
	@GetMapping("/getCart")
	public List<Cart> getCart(){
		return cartService.getCart();
	}
	
	@DeleteMapping("/deleteCart/{id}")
	public String deletecart(@PathVariable Long id) {
		cartService.deletecart(id);
		return "Item deleted";
	}

}
