package com.sake.reports.totalspercustomer;

// import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "reportTotalsPerCustomer")
public class ReportTotalsPerCustomer {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long customerid;
  private String customerName;
  private String cash;
  private String credit;
  private String total;
  
public Long getCustomerid() {
	return customerid;
}
public void setCustomerid(Long customerid) {
	this.customerid = customerid;
}
public String getCustomerName() {
	return customerName;
}
public void setCustomerName(String customerName) {
	this.customerName = customerName;
}
public String getCash() {
	return cash;
}
public void setCash(String cash) {
	this.cash = cash;
}
public String getCredit() {
	return credit;
}
public void setCredit(String credit) {
	this.credit = credit;
}
public String getTotal() {
	return total;
}
public void setTotal(String total) {
	this.total = total;
}
  
}