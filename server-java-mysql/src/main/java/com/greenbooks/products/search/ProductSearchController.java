package com.greenbooks.products.search;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.greenbooks.products.Product;

//import com.example.greenbooks.models.CustomerSearchRepository;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

@Controller
@RequestMapping({ "/productsearch" })
public class ProductSearchController {
    @GetMapping()
    public @ResponseBody List<Product> searchProducts() {
        List<Product> searchProducts = new ArrayList<Product>();
        // Code to query the database and
        // add actors to the List will go here
        Connection con;
        try {
        	con = DriverManager.getConnection("jdbc:mysql://localhost:3306/greenBooks", "root", "Planners0!");
        	Statement stmt = con.createStatement();
        	ResultSet rs = stmt.executeQuery("/* title or SKU matching exact input */\n" + 
        			"select * from products \n" + 
        			"where title like \n" + 
        			"(CONCAT(\"%\", (select product_search_input from params where session_id=666), \"%\"))\n" + 
        			"or SKU like \n" + 
        			"(CONCAT(\"%\", (select product_search_input from params where session_id=666), \"%\"))\n" + 
        			"\n" + 
        			"/* title or SKU contains 1st word AND 2nd word (and 3rd) */\n" + 
        			"UNION\n" + 
        			"select * from products\n" + 
        			"where (title like CONCAT('%',(select SUBSTRING_INDEX((select product_search_input from params where session_id=666),' ', 1)),'%') OR SKU like CONCAT('%',(select SUBSTRING_INDEX((select product_search_input from params where session_id=666),' ', 1)),'%'))\n" + 
        			"AND\n" + 
        			"(title like \n" + 
        			"CONCAT('%',\n" + 
        			"((select MID((select product_search_input from params where session_id=666),\n" + 
        			"(select LENGTH(SUBSTRING_INDEX((select product_search_input from params where session_id=666), ' ', 1)) + 2),\n" + 
        			"(select LENGTH(SUBSTRING_INDEX((select product_search_input from params where session_id=666), ' ', 2)) - (select LENGTH(SUBSTRING_INDEX((select product_search_input from params where session_id=666), ' ', 1)) + 1))\n" + 
        			"))),\n" + 
        			"'%')\n" + 
        			"OR SKU like \n" + 
        			"CONCAT('%',\n" + 
        			"((select MID((select product_search_input from params where session_id=666),\n" + 
        			"(select LENGTH(SUBSTRING_INDEX((select product_search_input from params where session_id=666), ' ', 1)) + 2),\n" + 
        			"(select LENGTH(SUBSTRING_INDEX((select product_search_input from params where session_id=666), ' ', 2)) - (select LENGTH(SUBSTRING_INDEX((select product_search_input from params where session_id=666), ' ', 1)) + 1))\n" + 
        			"))),\n" + 
        			"'%'))\n" + 
        			"\n" + 
        			"AND\n" + 
        			"(title like \n" + 
        			"CONCAT('%',\n" + 
        			"((select MID((select product_search_input from params where session_id=666),\n" + 
        			"(select LENGTH(SUBSTRING_INDEX((select product_search_input from params where session_id=666), ' ', 2)) + 2),\n" + 
        			"(select LENGTH(SUBSTRING_INDEX((select product_search_input from params where session_id=666), ' ', 3)) - (select LENGTH(SUBSTRING_INDEX((select product_search_input from params where session_id=666), ' ', 2)) + 1))\n" + 
        			"))),\n" + 
        			"'%')\n" + 
        			"OR SKU like \n" + 
        			"CONCAT('%',\n" + 
        			"((select MID((select product_search_input from params where session_id=666),\n" + 
        			"(select LENGTH(SUBSTRING_INDEX((select product_search_input from params where session_id=666), ' ', 2)) + 2),\n" + 
        			"(select LENGTH(SUBSTRING_INDEX((select product_search_input from params where session_id=666), ' ', 3)) - (select LENGTH(SUBSTRING_INDEX((select product_search_input from params where session_id=666), ' ', 2)) + 1))\n" + 
        			"))),\n" + 
        			"'%'))\n" + 
        			"\n" + 
        			"order by SKU asc"
        			);
        	while (rs.next()) {

        	    // create a new Actor object
        	    Product returnedProduct = new Product();

        	    // 09/11/2020 - here's where I'm leaving off ... I think next I need to
        	    // create a new "productSearch" object & repository
        	    
        	    // get the values from each column of the current row and add them to the new Actor
        	    returnedProduct.setProduct_id(rs.getLong("product_id"));
        	    returnedProduct.setTitle(rs.getString("title"));
        	    returnedProduct.setSku(rs.getString("sku"));
            	returnedProduct.setUpc(rs.getString("upc"));
            	returnedProduct.setShortcode(rs.getString("shortcode"));
            	returnedProduct.setPrice(rs.getDouble("price"));
            	returnedProduct.setCost(rs.getDouble("cost"));
            	returnedProduct.setUnit_type(rs.getString("unit_type"));
            	returnedProduct.setSurcharge_bool(rs.getString("surcharge_bool"));
            	returnedProduct.setSurcharge_unique(rs.getString("surcharge_unique"));
            	returnedProduct.setSurcharge(rs.getDouble("surcharge"));
            	returnedProduct.setPrompt_price(rs.getString("prompt_price"));
            	returnedProduct.setPrompt_quantity(rs.getString("prompt_quantity"));
            	returnedProduct.setClerk_message(rs.getString("clerk_message"));
            	returnedProduct.setTrack_stock(rs.getString("track_stock"));
            	returnedProduct.setStock_level(rs.getDouble("stock_level"));
            	returnedProduct.setCategory(rs.getString("category"));
            	returnedProduct.setSubcategory(rs.getString("subcategory"));
            	returnedProduct.setDepartment(rs.getString("department"));
            	returnedProduct.setBrand(rs.getString("brand"));
            	returnedProduct.setOut_of_stock(rs.getString("out_of_stock"));

        	    // add the new actor to the actors list
        		searchProducts.add(returnedProduct);
        	}
        } catch (SQLException e) {
        	e.printStackTrace();
        }
//        model.addAttribute("orderDetails", orderDetails);
        return searchProducts;
    }

//    @PostMapping()
//    public CustomerSearch searchThis(@RequestBody CustomerSearch inputQuery) {
//      return inputQuery;
//    }

}