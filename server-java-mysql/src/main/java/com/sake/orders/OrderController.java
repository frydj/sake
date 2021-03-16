package com.sake.orders;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
public class OrderController {

  @Autowired
  OrderRepository orderRepository;

  @GetMapping()
  public List<Order> getOrders() {
    return orderRepository.findAll();
  }

  @GetMapping("/{orderid}")
  public Optional<Order> getOrder(@PathVariable Long orderid) {
    return orderRepository.findById(orderid);
  }
  
@PostMapping()
  public Order addOrder(@RequestBody Order order) {
    return orderRepository.save(order);
  }

@CrossOrigin
@DeleteMapping("/{orderid}")
  public void deleteOrder(@PathVariable Long orderid) {
	orderRepository.deleteById(orderid);
  }

@CrossOrigin
@PutMapping("/{orderid}")
  public Order updateOrder(@PathVariable Long orderid, @RequestBody Order order) {
    Order foundOrder = orderRepository.findById(orderid).orElse(null);
    if (foundOrder != null) {
    	foundOrder.setCustomerid(order.getCustomerid());
    	foundOrder.setServiceDate(order.getServiceDate());
    	foundOrder.setService(order.getService());
    	foundOrder.setCu(order.getCu());
    	foundOrder.setPw(order.getPw());
    	foundOrder.setR(order.getR());
    	foundOrder.setLr(order.getLr());
    	foundOrder.setMisc(order.getMisc());
    	foundOrder.setNotes(order.getNotes());
    	
    	orderRepository.save(foundOrder);
      return foundOrder;
    }
    return null;
  }

}