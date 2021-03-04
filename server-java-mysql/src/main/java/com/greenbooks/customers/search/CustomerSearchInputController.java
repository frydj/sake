package com.greenbooks.customers.search;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
//import java.util.ArrayList;
import java.util.List;
//import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping({ "/customersearchinput" })
public class CustomerSearchInputController {
    
	@Autowired
	CustomerSearchInputRepository customerSearchInputRepository;
	

	  @GetMapping()
	  public @ResponseBody List<CustomerSearchInput> getCustomerSearchInput() {
		        List<CustomerSearchInput> searchCritera = new ArrayList<CustomerSearchInput>();
		        // Code to query the database and
		        // add actors to the List will go here
		  Connection con;
	        try {
	        	con = DriverManager.getConnection("jdbc:mysql://localhost:3306/greenBooks", "root", "Hamstringrunner003!");
	        	Statement stmt = con.createStatement();
	        	ResultSet rs = stmt.executeQuery("select search from greenBooks.customersearchinput\n" + 
	        			"order by id desc\n" + 
	        			"limit 1"
	        			);
	        	while (rs.next()) {

	        	    // create a new Actor object
	        	    CustomerSearchInput newCustomerSearchInput = new CustomerSearchInput();

	        	    // get the values from each column of the current row and add them to the new Actor
	        	    // newCustomerSearchInput.setId(rs.getLong("id"));
	        	    newCustomerSearchInput.setSearch(rs.getString("search"));

	        	    // add the new actor to the actors list
	        	    searchCritera.add(newCustomerSearchInput);
	        	}
	        } catch (SQLException e) {
	        	e.printStackTrace();
	        }
//	        model.addAttribute("orderDetails", orderDetails);
	        return searchCritera;
	    }
	
	
    @PostMapping()
    public CustomerSearchInput searchThis(@RequestBody CustomerSearchInput search) {
      return customerSearchInputRepository.save(search);
    }
    
}