package com.sake.typeAhead;
import com.sake.inparms.Inparm;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TypeAheadRepository extends JpaRepository<TypeAhead, Long> {

	Optional <List<TypeAhead>> findBySessionId(Long sessionId);
	
//	String select = parameters.select;
		
	@Query(
			value = "select :id as Id, :session as sessionId, :secondary as secondary, :primary as returnedData from :table where :args :addargs order by :order ;",
			//value = "select product_id as Id, \"666\" as session_id, price as secondary, title as returned_data  from products where title like \"%iphone%\" and title like \"%12%\" order by title asc;\r\n",
			nativeQuery = true
	)
	List<TypeAhead> showMe(
			@Param("id") String id,
			@Param("session") String session,
			@Param("primary") String primary,
			@Param("secondary") String secondary,
			@Param("table") String table,
			@Param("args") String args,
			@Param("addArgs") String addArgs,
			@Param("order") String order
			);
	
	/*
	@Query(value = "SELECT * FROM Users u WHERE u.status = :status and u.name = :name", 
  	nativeQuery = true)
	User findUserByStatusAndNameNamedParamsNative(
	@Param("status") Integer status, @Param("name") String name);
	*/
	
}