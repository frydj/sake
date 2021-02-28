package com.greenbooks.reports.totalsbydate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "reportTotalsByDate")
public class ReportTotalsByDate {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long rowId;
  private String serviceDate;
  private String cash;
  private String credit;
  private String total;
  
public String getServiceDate() {
	return serviceDate;
}
public void setServiceDate(String serviceDate) {
	this.serviceDate = serviceDate;
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