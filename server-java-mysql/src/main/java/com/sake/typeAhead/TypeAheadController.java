package com.sake.typeAhead;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
// import java.util.Optional;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sake.inparms.Inparm;

@Component
@RestController
@RequestMapping("/typeahead")
public class TypeAheadController {
	@Autowired
	TypeAheadRepository typeAheadRepository;
	@GetMapping()
	public List<TypeAhead> fetchTheData(Inparm parameters) {
		// System.out.println(fuckYou.findAll());
		
		// @Param
		// String select = "%" + parameters.select + "%";
		String id = parameters.id;
		String session = parameters.session;
		String primary = parameters.primary;
		String secondary = parameters.secondary;
		String table = parameters.table;
		String args = parameters.args;
		String addArgs = parameters.addArgs;
		String order = parameters.order;
		
		/*System.out.println("... QUERY WAS SOMETHING LIKE " 
		+ parameters.id + ";\r\n "
		+ parameters.session + ";\r\n "
		+ parameters.primary + ";\r\n "
		+ parameters.secondary + ";\r\n "
		+ parameters.table + ";\r\n "
		+ parameters.args + ";\r\n "
		+ parameters.addArgs + ";\r\n "
		+ parameters.order + ";\r\n "
		+"\r\n"
		+"\r\n");
		*/
		
		System.out.println(
			"select " + parameters.id + " as Id, " 
			+ parameters.session + " as session_id, " 
			+ parameters.secondary + " as secondary, "
			+ parameters.primary + " as returned_data "
			+ " from " + parameters.table
			+ " where " + parameters.args
			+ " " + parameters.addArgs
			+ " order by " + parameters.order + ";"
			);
		
		
		return typeAheadRepository.showMe(
				id,
				session,
				primary,
				secondary,
				table,
				args,
				addArgs,
				order
		);
	}

	/*
	public String hello2(Inparm poarameters)
	{
	    //implement the setter and getter of the Params class.
	    return "Hello " + poarameters.select 
	    		+ " " + poarameters.table 
	    		+ " " + poarameters.args
	    		+ " " + poarameters.order;
	}
	*/
	
	@PostMapping()
	public TypeAhead addTypeAhead(@RequestBody TypeAhead typeahead) {
		return typeAheadRepository.save(typeahead);
	}

	@CrossOrigin
	@DeleteMapping("/{sessionId}")
	public void deleteTypeAhead(@PathVariable Long sessionId) {
		typeAheadRepository.deleteById(sessionId);
	}

	@CrossOrigin
	@PutMapping("/{sessionId}")
	public TypeAhead updateProject(@PathVariable Long sessionId, @RequestBody TypeAhead typeahead) {
		TypeAhead foundTypeAhead = typeAheadRepository.findById(sessionId).orElse(null);
		if (foundTypeAhead != null) {

			foundTypeAhead.setReturnedData(typeahead.getReturnedData());

			typeAheadRepository.save(foundTypeAhead);
			return foundTypeAhead;
		}
		return null;
	}
}