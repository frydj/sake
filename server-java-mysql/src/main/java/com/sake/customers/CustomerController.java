package com.sake.customers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class CustomerController {

  @Autowired
  CustomerRepository customerRepository;

  @CrossOrigin
  @GetMapping()
  public List<Customer> getCustomers() {
    return customerRepository.findAll();
  }
  
  @GetMapping("/{custID}")
  public Optional<Customer> getCustomer(@PathVariable Long custID) {
    return customerRepository.findById(custID);
  }
  
@PostMapping()
  public Customer addCustomer(@RequestBody Customer customer) {
    return customerRepository.save(customer);
  }

@CrossOrigin
@DeleteMapping("/{custID}")
  public void deleteCustomer(@PathVariable Long custID) {
    customerRepository.deleteById(custID);
  }

@CrossOrigin
@PutMapping("/{custID}")
  public Customer updateProject(@PathVariable Long customerid, @RequestBody Customer customer) {
    Customer foundCustomer = customerRepository.findById(customerid).orElse(null);
    if (foundCustomer != null) {
    	
    	foundCustomer.setFirstName(customer.getFirstName());
    	foundCustomer.setLastName(customer.getLastName());
    	foundCustomer.setPhone(customer.getPhone());
    	foundCustomer.setEmail(customer.getEmail());
    	foundCustomer.setCompany(customer.getCompany());
    	foundCustomer.setAddress1(customer.getAddress1());
    	foundCustomer.setAddress2(customer.getAddress2());
    	foundCustomer.setCity(customer.getCity());
    	foundCustomer.setState1(customer.getState1());
    	foundCustomer.setZip(customer.getZip());
    	foundCustomer.setCountry(customer.getCountry());
    	foundCustomer.setNotes(customer.getNotes());
    	
      customerRepository.save(foundCustomer);
      return foundCustomer;
    }
    return null;
  }
}