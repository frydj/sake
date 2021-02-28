package com.greenbooks.reports.totals;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "reportTotals")
public class ReportTotals {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long rowId;
  private String cash;
  private String credit;
  private String total;
  
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