package com.example.security.services;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.models.Cart;
import com.example.models.Orders;
import com.example.repository.CartRepository;
import com.example.repository.OrderRepository;

@Service
public class OrderService {
	
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	CartRepository cartRepository;
	
	public String addOrder() {
		
		 UserDetailsImpl myUserDetails = (UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		 List<Cart> c1 = cartRepository.findByUser(myUserDetails.getId());
		 
		 
		for (int i = 0; i < c1.size(); i++) {
			Orders o = new Orders();
			o.setProduct(c1.get(i).getProduct());
			o.setUser(myUserDetails.getId());
			
			o.setQuantity(c1.get(i).getQuantity());
			o.setTotal(c1.get(i).getTotal());
			orderRepository.save(o);
			cartRepository.delete(c1.get(i));	
		}
		
		return "Order placed";
		 
	}
	
	public List<Orders> getOrders(){
		 UserDetailsImpl myUserDetails = (UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		 return orderRepository.findByUser(myUserDetails.getId());
		 
	}
	
	
	

}
