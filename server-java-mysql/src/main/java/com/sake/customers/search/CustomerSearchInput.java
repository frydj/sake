package com.sake.customers.search;

// import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "customersearchinput")
public class CustomerSearchInput {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String search;
  
  
public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public String getSearch() {
	return search;
}
public void setSearch(String search) {
	this.search = search;
}
  
//  @Column(columnDefinition = "boolean default false")
//  private boolean complete;
  
}