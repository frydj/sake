package com.greenbooks.customers.search;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "customersearch")
public class CustomerSearch {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "customerid", updatable = false, nullable = false)
  private Long customerid;
  private Long customersearchid;
  private String returnedQuery;

public Long getCustomersearchid() {
	return customersearchid;
}
public void setCustomersearchid(Long customersearchid) {
	this.customersearchid = customersearchid;
}
public Long getCustomerid() {
	return customerid;
}
public void setCustomerid(Long customerid) {
	this.customerid = customerid;
}
public String getReturnedQuery() {
	return returnedQuery;
}
public void setReturnedQuery(String returnedQuery) {
	this.returnedQuery = returnedQuery;
}
  

//  @Column(columnDefinition = "boolean default false")
//  private boolean complete;
  
}