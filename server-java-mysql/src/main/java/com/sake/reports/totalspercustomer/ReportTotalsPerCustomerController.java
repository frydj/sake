package com.sake.reports.totalspercustomer;
import java.util.ArrayList;
import java.util.List;
//import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

@RestController
@RequestMapping({ "/reports/totalspercustomer" })
public class ReportTotalsPerCustomerController {

	
//	@GetMapping("/{orderid}")
//	public Optional<OrderDetail> getOrderDetail(@PathVariable Long orderid) {
//		return orderDetailRepository.findById(orderid);
//	}
	
	@CrossOrigin
	@GetMapping()
    public @ResponseBody List<ReportTotalsPerCustomer> getTotalsPerCustomer() {
        List<ReportTotalsPerCustomer> totalsPerCustomer = new ArrayList<ReportTotalsPerCustomer>();
        // Code to query the database and
        // add actors to the List will go here
        Connection con;
        try {
        	con = DriverManager.getConnection("jdbc:mysql://localhost:3306/sake", "root", "Hamstringrunner003!");
        	Statement stmt = con.createStatement();
        	ResultSet rs = stmt.executeQuery("SELECT \n" + 
        			"orders.customerid,\n" + 
        			"CONCAT(customer.first_name, \" \", customer.last_name) as 'customerName',\n" + 
        			"\n" + 
        			"\n" + 
        			"/* CASH TOTAL */\n" + 
        			"CASE WHEN\n" + 
        			"customer.payment_type = \"Cash\"\n" + 
        			"THEN\n" + 
        			"\n" + 
        			"\n" + 
        			"(SELECT   \n" + 
        			"\n" + 
        			"SUM(\n" + 
        			"	((CASE\n" + 
        			"    WHEN\n" + 
        			"      orders.service= 'MT'\n" + 
        			"        THEN\n" + 
        			"          cast(customer.mtrate as DECIMAL(10,2))\n" + 
        			"    WHEN\n" + 
        			"      orders.service= 'MTF'\n" + 
        			"        THEN\n" + 
        			"          cast(customer.mtfrate as DECIMAL(10,2))\n" + 
        			"    WHEN\n" + 
        			"      orders.service= 'MTB'\n" + 
        			"        THEN\n" + 
        			"          cast(customer.mtbrate as DECIMAL(10,2))\n" + 
        			"  END) + cast(((orders.cu + orders.pw + orders.r + orders.lr + orders.misc) * 0.80) as DECIMAL(10,2))))) \n" + 
        			"\n" + 
        			"  END as cash,\n" + 
        			"  \n" + 
        			"  \n" + 
        			"  /* CREDIT TOTAL */\n" + 
        			"  CASE WHEN\n" + 
        			"customer.payment_type = \"Credit\"\n" + 
        			"THEN\n" + 
        			"\n" + 
        			"\n" + 
        			"(SELECT   \n" + 
        			"\n" + 
        			"SUM(\n" + 
        			"	((CASE\n" + 
        			"    WHEN\n" + 
        			"      orders.service= 'MT'\n" + 
        			"        THEN\n" + 
        			"          cast(customer.mtrate as DECIMAL(10,2))\n" + 
        			"    WHEN\n" + 
        			"      orders.service= 'MTF'\n" + 
        			"        THEN\n" + 
        			"          cast(customer.mtfrate as DECIMAL(10,2))\n" + 
        			"    WHEN\n" + 
        			"      orders.service= 'MTB'\n" + 
        			"        THEN\n" + 
        			"          cast(customer.mtbrate as DECIMAL(10,2))\n" + 
        			"  END) + cast(((orders.cu + orders.pw + orders.r + orders.lr + orders.misc) * 0.80) as DECIMAL(10,2))))) \n" + 
        			"\n" + 
        			"  END as credit,\n" + 
        			"  \n" + 
        			"  /* GRAND TOTAL */\n" + 
        			"  \n" + 
        			"\n" + 
        			"(SELECT   \n" + 
        			"\n" + 
        			"SUM(\n" + 
        			"	((CASE\n" + 
        			"    WHEN\n" + 
        			"      orders.service= 'MT'\n" + 
        			"        THEN\n" + 
        			"          cast(customer.mtrate as DECIMAL(10,2))\n" + 
        			"    WHEN\n" + 
        			"      orders.service= 'MTF'\n" + 
        			"        THEN\n" + 
        			"          cast(customer.mtfrate as DECIMAL(10,2))\n" + 
        			"    WHEN\n" + 
        			"      orders.service= 'MTB'\n" + 
        			"        THEN\n" + 
        			"          cast(customer.mtbrate as DECIMAL(10,2))\n" + 
        			"  END) + cast(((orders.cu + orders.pw + orders.r + orders.lr + orders.misc) * 0.80) as DECIMAL(10,2))))) as total\n" + 
        			"\n" + 
        			"FROM sake.orders\n" + 
        			"\n" + 
        			"INNER JOIN sake.customer\n" + 
        			"USING(customerid)\n" + 
        			"\n" + 
        			"GROUP BY customer.customerid\n" + 
        			"\n" + 
        			"ORDER BY customer.last_name\n" + 
        			""
        			);
        	while (rs.next()) {

        	    // create a new Actor object
        	    ReportTotalsPerCustomer newTotalsPerCustomer = new ReportTotalsPerCustomer();

        	    // get the values from each column of the current row and add them to the new Actor
        	    newTotalsPerCustomer.setCustomerid(rs.getLong("customerid"));
        	    newTotalsPerCustomer.setCustomerName(rs.getString("customerName"));
        	    newTotalsPerCustomer.setCash(rs.getString("cash"));
        	    newTotalsPerCustomer.setCredit(rs.getString("credit"));
        	    newTotalsPerCustomer.setTotal(rs.getString("total"));


        	    // add the new actor to the actors list
        	    totalsPerCustomer.add(newTotalsPerCustomer);
        	}
        } catch (SQLException e) {
        	e.printStackTrace();
        }
//        model.addAttribute("orderDetails", orderDetails);
        return totalsPerCustomer;
    }
}