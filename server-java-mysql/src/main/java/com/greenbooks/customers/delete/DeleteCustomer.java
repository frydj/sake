package com.greenbooks.customers.delete;

// import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "deleteCustomer")
public class DeleteCustomer {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long deleteCustomerid;
  private Long customerid;

public Long getCustomerid() {
	return customerid;
}

public void setCustomerid(Long customerid) {
	this.customerid = customerid;
}

public Long getDeleteCustomerid() {
	return deleteCustomerid;
}

public void setDeleteCustomerid(Long deleteCustomerid) {
	this.deleteCustomerid = deleteCustomerid;
} 
  
}