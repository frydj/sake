package com.greenbooks.customers.search;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

//import com.example.greenbooks.models.CustomerSearchRepository;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

@Controller
@RequestMapping({ "/customersearch" })
public class CustomerSearchController {
    @GetMapping()
    public @ResponseBody List<CustomerSearch> getCustomerSearch() {
        List<CustomerSearch> customerSearch = new ArrayList<CustomerSearch>();
        // Code to query the database and
        // add actors to the List will go here
        Connection con;
        try {
        	con = DriverManager.getConnection("jdbc:mysql://localhost:3306/greenBooks", "root", "Planners0!");
        	Statement stmt = con.createStatement();
        	ResultSet rs = stmt.executeQuery("select\n" + 
        			"customerid,\n" + 
        			"CONCAT(\n" + 
        			"'(#',\n" + 
        			"customerid,\n" + 
        			"') ',\n" + 
        			"first_name,\n" + 
        			"' ',\n" + 
        			"last_name)\n" + 
        			"as returnedQuery\n" + 
        			"FROM greenBooks.customer\n" + 
        			"\n" + 
        			"WHERE\n" + 
        			"\n" + 
        			"CASE WHEN\n" + 
        			"(LENGTH((select search from greenBooks.customersearchinput\n" + 
        			"	order by id desc\n" + 
        			"	limit 1)) - LENGTH(REPLACE((select search from greenBooks.customersearchinput\n" + 
        			"	order by id desc\n" + 
        			"	limit 1), ' ', ''))) > 0\n" + 
        			"THEN\n" + 
        			"\n" + 
        			"/*bigger than 1 WHERE clause goes here*/\n" + 
        			"/* FIRST AND */\n" + 
        			"((first_name like CONCAT('%',\n" + 
        			"(SELECT \n" + 
        			"	LEFT(search, LOCATE(' ', search) - 1)\n" + 
        			"	from greenBooks.customersearchinput\n" + 
        			"	order by id DESC\n" + 
        			"	limit 1),\n" + 
        			"	'%'))\n" + 
        			"OR\n" + 
        			"(last_name like CONCAT('%',\n" + 
        			"(SELECT \n" + 
        			"	LEFT(search, LOCATE(' ', search) - 1)\n" + 
        			"	from greenBooks.customersearchinput\n" + 
        			"	order by id DESC\n" + 
        			"	limit 1),\n" + 
        			"	'%'))\n" + 
        			"OR\n" + 
        			"(email like CONCAT('%',\n" + 
        			"(SELECT \n" + 
        			"	LEFT(search, LOCATE(' ', search) - 1)\n" + 
        			"	from greenBooks.customersearchinput\n" + 
        			"	order by id DESC\n" + 
        			"	limit 1),\n" + 
        			"	'%'))\n" + 
        			"OR\n" + 
        			"(phone like CONCAT('%',\n" + 
        			"(SELECT \n" + 
        			"	LEFT(search, LOCATE(' ', search) - 1)\n" + 
        			"	from greenBooks.customersearchinput\n" + 
        			"	order by id DESC\n" + 
        			"	limit 1),\n" + 
        			"	'%')))\n" + 
        			"/* SECOND AND */\n" + 
        			"AND\n" + 
        			"(first_name like CONCAT('%',\n" + 
        			"(SELECT \n" + 
        			"    MID(search, \n" + 
        			"    LOCATE(' ', search) + 1,\n" + 
        			"    LENGTH(SUBSTRING_INDEX(search, ' ', 2)) - LENGTH(SUBSTRING_INDEX(search, ' ', 1)))	from greenBooks.customersearchinput\n" + 
        			"	order by id DESC\n" + 
        			"	limit 1)\n" + 
        			"    ,\n" + 
        			"	'%'))\n" + 
        			"    OR\n" + 
        			"    (last_name like CONCAT('%',\n" + 
        			"(SELECT \n" + 
        			"    MID(search, \n" + 
        			"    LOCATE(' ', search) + 1,\n" + 
        			"    LENGTH(SUBSTRING_INDEX(search, ' ', 2)) - LENGTH(SUBSTRING_INDEX(search, ' ', 1)))	from greenBooks.customersearchinput\n" + 
        			"	order by id DESC\n" + 
        			"	limit 1)\n" + 
        			"    ,\n" + 
        			"	'%'))\n" + 
        			"        OR\n" + 
        			"    (email like CONCAT('%',\n" + 
        			"(SELECT \n" + 
        			"    MID(search, \n" + 
        			"    LOCATE(' ', search) + 1,\n" + 
        			"    LENGTH(SUBSTRING_INDEX(search, ' ', 2)) - LENGTH(SUBSTRING_INDEX(search, ' ', 1)))	from greenBooks.customersearchinput\n" + 
        			"	order by id DESC\n" + 
        			"	limit 1)\n" + 
        			"    ,\n" + 
        			"	'%'))\n" + 
        			"        OR\n" + 
        			"    (phone like CONCAT('%',\n" + 
        			"(SELECT \n" + 
        			"    MID(search, \n" + 
        			"    LOCATE(' ', search) + 1,\n" + 
        			"    LENGTH(SUBSTRING_INDEX(search, ' ', 2)) - LENGTH(SUBSTRING_INDEX(search, ' ', 1)))	from greenBooks.customersearchinput\n" + 
        			"	order by id DESC\n" + 
        			"	limit 1)\n" + 
        			"    ,\n" + 
        			"	'%'))\n" + 
        			"/*end WHERE clause*/\n" + 
        			"ELSE\n" + 
        			"\n" + 
        			"(first_name like CONCAT('%',\n" + 
        			"	(select search from greenBooks.customersearchinput\n" + 
        			"	order by id desc\n" + 
        			"	limit 1),\n" + 
        			"	'%')\n" + 
        			"OR\n" + 
        			"last_name like CONCAT('%',\n" + 
        			"	(select search from greenBooks.customersearchinput\n" + 
        			"	order by id desc\n" + 
        			"	limit 1),\n" + 
        			"	'%')\n" + 
        			"OR\n" + 
        			"email like CONCAT('%',\n" + 
        			"	(select search from greenBooks.customersearchinput\n" + 
        			"	order by id desc\n" + 
        			"	limit 1),\n" + 
        			"	'%')\n" + 
        			"OR\n" + 
        			"phone like CONCAT('%',\n" + 
        			"	(select search from greenBooks.customersearchinput\n" + 
        			"	order by id desc\n" + 
        			"	limit 1),\n" + 
        			"	'%'))\n" + 
        			"END\n" + 
        			"LIMIT 7\n" + 
        			"\n" + 
        			"\n" + 
        			""
        			);
        	while (rs.next()) {

        	    // create a new Actor object
        	    CustomerSearch newCustomerSearch = new CustomerSearch();

        	    // get the values from each column of the current row and add them to the new Actor
        	    newCustomerSearch.setReturnedQuery(rs.getString("returnedQuery"));
        	    newCustomerSearch.setCustomerid(rs.getLong("customerid"));

        	    // add the new actor to the actors list
        		customerSearch.add(newCustomerSearch);
        	}
        } catch (SQLException e) {
        	e.printStackTrace();
        }
//        model.addAttribute("orderDetails", orderDetails);
        return customerSearch;
    }

    @PostMapping()
    public CustomerSearch searchThis(@RequestBody CustomerSearch inputQuery) {
      return inputQuery;
    }

}