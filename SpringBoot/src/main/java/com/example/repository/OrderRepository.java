package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.example.models.Orders;

@Repository
public interface OrderRepository extends JpaRepository<Orders,Long>{
	
	List<Orders> findByUser(Long id);

}
