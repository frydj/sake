package com.greenbooks.orders;

import javax.persistence.Column;
// import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "orderid", updatable = false, nullable = false)
  private Long orderid;
  private Long customerid;
  private String serviceDate;
  private String service;
  private double cu;
  private double pw;
  private double r;
  private double lr;
  private double misc;
  private double mowTotal;
  private double extrasTotal;
  private double total;
  private String paymentType;
  private String notes;
  
public Long getCustomerid() {
	return customerid;
}
public void setCustomerid(Long customerid) {
	this.customerid = customerid;
}
  
public Long getOrderid() {
	return orderid;
}
public void setOrderid(Long orderid) {
	this.orderid = orderid;
}
public String getServiceDate() {
	return serviceDate;
}
public void setServiceDate(String serviceDate) {
	this.serviceDate = serviceDate;
}
public String getService() {
	return service;
}
public void setService(String service) {
	this.service = service;
}
public double getCu() {
	return cu;
}
public void setCu(double cu) {
	this.cu = cu;
}
public double getPw() {
	return pw;
}
public void setPw(double pw) {
	this.pw = pw;
}
public double getR() {
	return r;
}
public void setR(double r) {
	this.r = r;
}
public double getLr() {
	return lr;
}
public void setLr(double lr) {
	this.lr = lr;
}
public double getMisc() {
	return misc;
}
public void setMisc(double misc) {
	this.misc = misc;
}
public double getMowTotal() {
	return mowTotal;
}
public void setMowTotal(double mowTotal) {
	this.mowTotal = mowTotal;
}
public double getExtrasTotal() {
	return extrasTotal;
}
public void setExtrasTotal(double extrasTotal) {
	this.extrasTotal = extrasTotal;
}
public double getTotal() {
	return total;
}
public void setTotal(double total) {
	this.total = total;
}
public String getPaymentType() {
	return paymentType;
}
public void setPaymentType(String paymentType) {
	this.paymentType = paymentType;
}
public String getNotes() {
	return notes;
}
public void setNotes(String notes) {
	this.notes = notes;
}
  
//  @Column(columnDefinition = "boolean default false")
//  private boolean complete;
  
}