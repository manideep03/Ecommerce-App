package com.example.security.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.controllers.AuthController;
import com.example.models.Cart;
import com.example.models.Orders;
import com.example.models.Product;
import com.example.repository.CartRepository;
import com.example.repository.OrderRepository;
import com.example.repository.ProductRepository;

import net.bytebuddy.agent.builder.AgentBuilder.RedefinitionStrategy.BatchAllocator.ForTotal;

@Service
public class CartService {

	@Autowired
	CartRepository cartRepository;
	
	@Autowired
	ProductRepository productRepository;
	
	
	@Autowired
	OrderRepository orderRepository;
	
	
	@Autowired
	AuthController authController;
	

	
	public void addToCart(Long id ,Long qt) {
		Cart c1 = new Cart();
		Product p = productRepository.findById(id).get();
		Long t = p.getPrice() * qt;
		UserDetailsImpl myUserDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
	
		c1.setProduct(p);
		c1.setQuantity(qt);
		c1.setUser(myUserDetails.getId());
		c1.setTotal(t);
		
		cartRepository.save(c1);
	}
	
	
	/*
	 * public List<Cart> getCart() {
	 *  List<Cart> cart = new ArrayList<>();
	 * UserDetailsImpl myUserDetails = (UserDetailsImpl)
	 * SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	 * cartRepository.findByUser(myUserDetails.getId()).forEach(cart::add); return
	 * cart; }
	 */
	
	
	  public List<Cart> getCart() {
	  
	  UserDetailsImpl myUserDetails = (UserDetailsImpl)
	  SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	  
	  return cartRepository.findByUser(myUserDetails.getId());
	  
	  }
	  
	  public void deletecart(Long id) {
		  cartRepository.deleteById(id);
	  }
	 
	 
	
}
