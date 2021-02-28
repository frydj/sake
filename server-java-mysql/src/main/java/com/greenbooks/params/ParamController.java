package com.greenbooks.params;
import org.springframework.beans.factory.annotation.Autowired;

//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.sql.Statement;
//import java.util.ArrayList;
//import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.greenbooks.customers.Customer;
import com.greenbooks.params.Param;



@RestController
@RequestMapping({ "/params" })
public class ParamController {
    
	@Autowired
	ParamsRepository paramsRepository;
	
	@GetMapping()
	public List<Param> getParams() {
	  return paramsRepository.findAll();
	}
	
	@GetMapping("/{session_id}")
	public Optional<Param> getParam(@PathVariable Long session_id) {
	  return paramsRepository.findById(session_id);
	}
	
    @PostMapping()
    public Param param(@RequestBody Param param) {
      return paramsRepository.save(param);
    }
    
    @CrossOrigin
    @PutMapping("/{session_id}")
      public Param updateParam(@PathVariable Long session_id, @RequestBody Param param) {
        Param foundParam = paramsRepository.findById(session_id).orElse(null);
        if (foundParam != null) {

        	// foundParam.setSession_id(param.getSession_id());
//        	foundParam.setUser(param.getUser());
//        	foundParam.setPassword(param.getPassword());
//        	if (param.getLogged_in() != null) {
//        		foundParam.setLogged_in(param.getLogged_in());	
//        	}        	
//        	foundParam.setCustomerSearchInput(param.getCustomerSearchInput());
//        	foundParam.setProductSearchInput(param.getProductSearchInput());
//        	foundParam.setProductsGridFilter(param.getProductsGridFilter());
//        	foundParam.setProductsGridSort(param.getProductsGridSort());
//        	foundParam.setReportDateFrom(param.getReportDateFrom());
//        	foundParam.setReportDateTo(param.getReportDateTo());
//        	foundParam.setPosView(param.getPosView());
        	
        	if (param.getUser() != null) {
        		foundParam.setUser(param.getUser());
        		}
        		if (param.getPassword() != null) {
        		foundParam.setPassword(param.getPassword());
        		}
        		if (param.getLogged_in() != null) {
        		foundParam.setLogged_in(param.getLogged_in());	
        		}
        		if (param.getCustomerSearchInput() != null) {
        		foundParam.setCustomerSearchInput(param.getCustomerSearchInput());
        		}
        		if (param.getProductSearchInput() != null) {
        		foundParam.setProductSearchInput(param.getProductSearchInput());
        		}
        		if (param.getProductsGridFilter() != null) {
        		foundParam.setProductsGridFilter(param.getProductsGridFilter());
        		}
        		if (param.getProductsGridSort() != null) {
        		foundParam.setProductsGridSort(param.getProductsGridSort());
        		}
        		if (param.getReportDateFrom() != null) {
        		foundParam.setReportDateFrom(param.getReportDateFrom());
        		}
        		if (param.getReportDateTo() != null) {
        		foundParam.setReportDateTo(param.getReportDateTo());
        		}
        		if (param.getPosView() == null || param.getPosView() == "initial") {
        		foundParam.setPosView("returnedProduct row");
        		}
        		if (param.getPosView() != null) {
        		foundParam.setPosView(param.getPosView());
        		}
        		if (param.getCustomersGridSort() != null) {
        		foundParam.setCustomersGridSort(param.getCustomersGridSort());
        		}
        		if (param.getCustomersGridFilter() != null) {
        		foundParam.setCustomersGridFilter(param.getCustomersGridFilter());
        		}
        	
        	paramsRepository.save(foundParam);
          return foundParam;
        }
        return null;
      }
    
}