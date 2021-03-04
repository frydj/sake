package com.greenbooks.products.grid;
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
@RequestMapping({ "/vproduct" })
public class ProductGridController {

	  @Autowired
	  ProductGridRepository productGridRepository;
	
	@GetMapping("/{product_id}")
	public Optional<ProductGrid> getProductGrid(@PathVariable Long product_id) {
		return productGridRepository.findById(product_id);
	}
	
	@GetMapping()
    public @ResponseBody List<ProductGrid> getProductGrid() throws IOException {
        List<ProductGrid> productGridDetails = new ArrayList<ProductGrid>();
        
        // get WHERE & ORDER BY statements from grid inputs
        
      //   Document doc = Jsoup.connect("http://localhost:3000/products/").get();
        // Element conditions = doc.select("input[name='product_id'].value").first();
        
        
//        for (Element headline : newsHeadlines) {
//          log("%s\n\t%s", 
//            headline.attr("title"), headline.absUrl("href"));
//        }
        
        // Code to query the database and
        Connection con;
        try {
        	con = DriverManager.getConnection("jdbc:mysql://localhost:3306/sake", "root", "Hamstringrunner003!");
        	Statement stmt = con.createStatement();
        	ResultSet rs = stmt.executeQuery("select product_id, title, upper(sku) as sku,\n" + 
        			"        			\n" + 
        			"                    CASE \n" + 
        			"						when price = 0 && surcharge_bool = 'true' THEN 'flat rate only'\n" + 
        			"                        else price\n" + 
        			"					END as 'price',\n" + 
        			"                    CASE \n" + 
        			"						when price = 0 && surcharge_bool = 'true' THEN ''\n" + 
        			"                        else lower(unit_type)\n" + 
        			"					END as 'unit_type',                    \n" + 
        			"                    CASE\n" + 
        			"        				when surcharge_bool = 'false' THEN 'none'\n" + 
        			"        			    when surcharge_unique = 'true' THEN 'unique to customer'\n" + 
        			"        			    ELSE surcharge\n" + 
        			"        			END as 'surcharge',\n" + 
        			"        			cost, category, subcategory,\n" + 
        			"        			CASE\n" + 
        			"        				WHEN track_stock = 'false' THEN 'unlimited'\n" + 
        			"        				WHEN out_of_stock = 'true' THEN 'out of stock'\n" + 
        			"        			    ELSE stock_level\n" + 
        			"        			END as 'stock'\n" + 
        			"        			from products\n" + 
        			"        			\n" 
        // 			"        			WHERE product_id=" + "188" + "; "
        			// "        			ORDER BY product_id desc"
        			);
        	while (rs.next()) {

        	    // create a new object
        	    ProductGrid newProductGrid = new ProductGrid();

        	    newProductGrid.setProduct_id(rs.getLong("product_id"));
        	    newProductGrid.setTitle(rs.getString("title"));
        	    newProductGrid.setSku(rs.getString("sku"));
        	    newProductGrid.setPrice(rs.getString("price"));
        	    newProductGrid.setUnit_type(rs.getString("unit_type"));
        	    newProductGrid.setSurcharge(rs.getString("surcharge"));
        	    newProductGrid.setCost(rs.getDouble("cost"));
        	    newProductGrid.setCategory(rs.getString("category"));
        	    newProductGrid.setSubcategory(rs.getString("subcategory"));
        	    newProductGrid.setStock(rs.getString("stock"));
        	    
        	    productGridRepository.save(newProductGrid);
        	    productGridDetails.add(newProductGrid);
        	}
        } catch (SQLException e) {
        	e.printStackTrace();
        }
//        model.addAttribute("orderDetails", orderDetails);
        return productGridDetails;
    }
}