package com.sake.reports.totalsbydate;
import java.util.ArrayList;
import java.util.List;
//import java.util.Optional;

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
@RequestMapping({ "/reports/totalsbydate" })
public class ReportTotalsByDateController {

	
//	@GetMapping("/{orderid}")
//	public Optional<OrderDetail> getOrderDetail(@PathVariable Long orderid) {
//		return orderDetailRepository.findById(orderid);
//	}
	
	@GetMapping()
    public @ResponseBody List<ReportTotalsByDate> getTotalsByDate() {
        List<ReportTotalsByDate> totalsByDate = new ArrayList<ReportTotalsByDate>();
        // Code to query the database and
        // add actors to the List will go here
        Connection con;
        try {
        	con = DriverManager.getConnection("jdbc:mysql://localhost:3306/sake", "root", "Hamstringrunner003!");
        	Statement stmt = con.createStatement();
        	ResultSet rs = stmt.executeQuery("SELECT\n" + 
        			"  o.service_date as serviceDate,\n" + 
        			"  SUM(CASE WHEN c.payment_type = 'Cash' THEN\n" + 
        			"        CASE o.service\n" + 
        			"          WHEN 'MT'  THEN CAST(c.mtrate AS DECIMAL(10,2))\n" + 
        			"          WHEN 'MTF' THEN CAST(c.mtfrate AS DECIMAL(10,2))\n" + 
        			"          WHEN 'MTB' THEN CAST(c.mtbrate AS DECIMAL(10,2))\n" + 
        			"        END + \n" + 
        			"        CAST(((o.cu + o.pw + o.r + o.lr + o.misc) * 0.80) AS DECIMAL(10,2))\n" + 
        			"      END\n" + 
        			"  ) AS cash,\n" + 
        			"  SUM(CASE WHEN c.payment_type = 'Credit' THEN\n" + 
        			"        CASE o.service\n" + 
        			"          WHEN 'MT'  THEN CAST(c.mtrate AS DECIMAL(10,2))\n" + 
        			"          WHEN 'MTF' THEN CAST(c.mtfrate AS DECIMAL(10,2))\n" + 
        			"          WHEN 'MTB' THEN CAST(c.mtbrate AS DECIMAL(10,2))\n" + 
        			"        END + \n" + 
        			"        CAST(((o.cu + o.pw + o.r + o.lr + o.misc) * 0.80) AS DECIMAL(10,2))\n" + 
        			"      END\n" + 
        			"  ) AS credit,\n" + 
        			"  SUM(CASE o.service\n" + 
        			"        WHEN 'MT'  THEN CAST(c.mtrate AS DECIMAL(10,2))\n" + 
        			"        WHEN 'MTF' THEN CAST(c.mtfrate AS DECIMAL(10,2))\n" + 
        			"        WHEN 'MTB' THEN CAST(c.mtbrate AS DECIMAL(10,2))\n" + 
        			"      END + \n" + 
        			"      CAST(((o.cu + o.pw + o.r + o.lr + o.misc) * 0.80) AS DECIMAL(10,2))\n" + 
        			"  ) AS total\n" + 
        			"FROM sake.orders o\n" + 
        			"JOIN sake.customer c USING (customerid)\n" + 
        			"GROUP BY o.service_date\n" + 
        			"ORDER BY o.service_date;"
        			);
        	while (rs.next()) {

        	    // create a new Actor object
        	    ReportTotalsByDate newTotalsByDate = new ReportTotalsByDate();

        	    // get the values from each column of the current row and add them to the new Actor
        	    newTotalsByDate.setServiceDate(rs.getString("serviceDate"));
        	    newTotalsByDate.setCash(rs.getString("cash"));
        	    newTotalsByDate.setCredit(rs.getString("credit"));
        	    newTotalsByDate.setTotal(rs.getString("total"));

        	    // add the new actor to the actors list
        	    totalsByDate.add(newTotalsByDate);
        	}
        } catch (SQLException e) {
        	e.printStackTrace();
        }
//        model.addAttribute("orderDetails", orderDetails);
        return totalsByDate;
    }
}