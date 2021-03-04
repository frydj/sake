package com.greenbooks.orders.orderdetail;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

@RestController
@RequestMapping({ "/orderdetail" })
public class OrderDetailController {

	  @Autowired
	  OrderDetailRepository orderDetailRepository;
	
	@GetMapping("/{orderid}")
	public Optional<OrderDetail> getOrderDetail(@PathVariable Long orderid) {
		return orderDetailRepository.findById(orderid);
	}
	
	@GetMapping()
    public @ResponseBody List<OrderDetail> getOrderDetails() {
        List<OrderDetail> orderDetails = new ArrayList<OrderDetail>();
        // Code to query the database and
        // add actors to the List will go here
        Connection con;
        try {
        	con = DriverManager.getConnection("jdbc:mysql://localhost:3306/greenBooks", "root", "Hamstringrunner003!");
        	Statement stmt = con.createStatement();
        	ResultSet rs = stmt.executeQuery("SELECT \n" + 
        			"orders.orderid, \n" + 
        			"orders.customerid, \n" + 
        			"CONCAT(customer.first_name, \" \", customer.last_name) as customerName, \n" + 
        			"orders.service_date, \n" + 
        			"orders.service,\n" + 
        			"orders.cu,\n" + 
        			"orders.pw,\n" + 
        			"orders.r,\n" + 
        			"orders.lr,\n" + 
        			"orders.misc,\n" + 
        			"(SELECT   \n" + 
        			"	CASE\n" + 
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
        			"  END) AS mow_total,\n" + 
        			"\n" + 
        			"(SELECT \n" + 
        			"	cast(((orders.cu + orders.pw + orders.r + orders.lr + orders.misc) * 0.80) as DECIMAL(10,2))\n" + 
        			"	END) AS extras_total, \n" + 
        			"\n" + 
        			"(SELECT   \n" + 
        			"        (CASE\n" + 
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
        			"  END) + cast(((orders.cu + orders.pw + orders.r + orders.lr + orders.misc) * 0.80) as DECIMAL(10,2))) as total,\n" + 
        			"\n" + 
        			"orders.notes\n" + 
        			"\n" + 
        			"FROM greenBooks.orders\n" + 
        			"\n" + 
        			"INNER JOIN greenBooks.customer\n" + 
        			"USING(customerid)\n" + 
        			"\n" + 
        			"ORDER BY orderid DESC;\n" + 
        			""
        			);
        	while (rs.next()) {

        	    // create a new Actor object
        	    OrderDetail newOrderDetail = new OrderDetail();

        	    // get the values from each column of the current row and add them to the new Actor
        	    newOrderDetail.setOrderid(rs.getLong("orderid"));
        	    newOrderDetail.setCustomerid(rs.getString("customerid"));
        	    newOrderDetail.setCustomerName(rs.getString("customerName"));
        	    newOrderDetail.setService_date(rs.getString("service_date"));
        	    newOrderDetail.setService(rs.getString("service"));
        	    newOrderDetail.setCu(rs.getString("cu"));
        	    newOrderDetail.setPw(rs.getString("pw"));
        	    newOrderDetail.setR(rs.getString("r"));
        	    newOrderDetail.setLr(rs.getString("lr"));
        	    newOrderDetail.setMisc(rs.getString("misc"));
        	    newOrderDetail.setMow_total(rs.getString("mow_total"));
        	    newOrderDetail.setExtras_total(rs.getString("extras_total"));
        	    newOrderDetail.setTotal(rs.getString("total"));
        	    newOrderDetail.setNotes(rs.getString("notes"));

        	    // add the new actor to the actors list
        	    orderDetailRepository.save(newOrderDetail);
        		orderDetails.add(newOrderDetail);
        	}
        } catch (SQLException e) {
        	e.printStackTrace();
        }
//        model.addAttribute("orderDetails", orderDetails);
        return orderDetails;
    }
}