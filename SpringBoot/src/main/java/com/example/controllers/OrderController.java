package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Cart;
import com.example.models.Orders;
import com.example.security.services.OrderService;
import com.example.security.services.UserDetailsImpl;

@RestController
@RequestMapping("/api")
public class OrderController {
	
	@Autowired
	OrderService orderService;
	
	@GetMapping("/addOrder")
	public String addOrder() {
		return orderService.addOrder();
	}
	
	
	@GetMapping("/getOrders")
	public List<Orders> getOrders(){
		return orderService.getOrders();
	}

	

}
