package com.sake.functions;
//import java.util.ArrayList;
//import java.util.List;
import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
//import com.example.sake.models.CustomerSearchRepository;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

@Controller
@RequestMapping({ "/login" })
public class Login {
    @GetMapping()
    public @ResponseBody boolean validLogin() {
        // List<CustomerSearch> customerSearch = new ArrayList<CustomerSearch>();
    	boolean isValid = false;
        // Code to query the database and
        // add actors to the List will go here
        Connection con;
        try {
        	con = DriverManager.getConnection("jdbc:mysql://localhost:3306/sake", "root", "Hamstringrunner003!");
        	Statement stmt = con.createStatement();
        	ResultSet rs = stmt.executeQuery("SELECT EXISTS(\n" + 
        			"SELECT * FROM administrator WHERE username = (\n" + 
        			"select user from params where session_id='666'\n" + 
        			") AND password=(\n" + 
        			"select password from params where session_id='666')\n" + 
        			") as isValid;"
        			);
        	while (rs.next()) {
        		isValid = rs.getBoolean("isValid");
        	}
        } catch (SQLException e) {
        	e.printStackTrace();
        }
//        model.addAttribute("orderDetails", orderDetails);
        return isValid;
    }

//    @PostMapping()
//    public CustomerSearch searchThis(@RequestBody CustomerSearch inputQuery) {
//      return inputQuery;
//    }

}