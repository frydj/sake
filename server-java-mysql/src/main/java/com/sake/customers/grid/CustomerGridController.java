package com.sake.customers.grid;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//import org.jsoup.Jsoup;
//import org.jsoup.nodes.Document;
//import org.jsoup.nodes.Element;
//import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

@RestController
@RequestMapping({ "/vcustomer" })
public class CustomerGridController {

	@Autowired
	CustomerGridRepository customerGridRepository;

	@GetMapping("/{custID}")
	public Optional<CustomerGrid> getCustomerGrid(@PathVariable Long custID) {
		return customerGridRepository.findById(custID);
	}

	@GetMapping()
	public @ResponseBody List<CustomerGrid> getCustomerGrid() throws IOException {
		List<CustomerGrid> customerGridDetails = new ArrayList<CustomerGrid>();
		// Query goes below
		Connection con;
		try {
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/sake", "root", "Hamstringrunner003!");
			Statement stmt = con.createStatement();
			ResultSet sortQ = stmt.executeQuery("select customers_grid_sort from params where session_id=666");
			if (sortQ.next()) {
				String sortS = sortQ.getString("customers_grid_sort");
				ResultSet filterQ = stmt.executeQuery("select customers_grid_filter from params where session_id=666");
				if (filterQ.next()) {
					String filterS = filterQ.getString("customers_grid_filter");
					// if NAME, then concat first + last
					// if ADDRESS, then concat 1, 2, city, state, zip
					// for FILTER
					ResultSet rs = stmt.executeQuery("select custID, concat(first_name, ' ', last_name) as name, \n"
							+ "company, phone, email, \n" + "\n" + "REPLACE(\n" + "  REPLACE(\n"
							+ "    REPLACE(trim(concat(address1,' ', address2, ' ', city, ' ', state1, ' ', zip)),\n"
							+ "      ' ','<>'),\n" + "    '><',''),\n" + "  '<>',' ') as address,\n" + "\n"
							+ "notes from customer " + filterS + " " + sortS
					// " WHERE product_id=" + "188" + "; "
					// " ORDER BY product_id desc"
					);
					while (rs.next()) {

						// create a new object
						CustomerGrid newCustomerGrid = new CustomerGrid();

						newCustomerGrid.setCustID(rs.getLong("custID"));
						newCustomerGrid.setName(rs.getString("name"));
						newCustomerGrid.setCompany(rs.getString("company"));
						newCustomerGrid.setPhone(rs.getString("phone"));
						newCustomerGrid.setEmail(rs.getString("email"));
						newCustomerGrid.setAddress(rs.getString("address"));
						newCustomerGrid.setNotes(rs.getString("notes"));

						customerGridRepository.save(newCustomerGrid);
						customerGridDetails.add(newCustomerGrid);
					}
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
//        model.addAttribute("orderDetails", orderDetails);
		return customerGridDetails;
	}
}
