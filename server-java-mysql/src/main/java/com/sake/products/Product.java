package com.sake.products;

// import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long product_id;
  private String title;
  private String sku;
  private String upc;
  private String shortcode;
  private double price;
  private double cost;
  private String unit_type;
  private String surcharge_bool;
  private String surcharge_unique;
  private double surcharge;
  private String prompt_price;
  private String prompt_quantity;
  private String clerk_message;
  private String track_stock;
  private double stock_level;
  private String category;
  private String subcategory;
  private String department;
  private String brand;
  private String out_of_stock;
  private String vendor_sku;
  
public String getVendor_sku() {
	return vendor_sku;
}
public void setVendor_sku(String vendor_sku) {
	this.vendor_sku = vendor_sku;
}
public Long getProduct_id() {
	return product_id;
}
public void setProduct_id(Long product_id) {
	this.product_id = product_id;
}
public String getTitle() {
	return title;
}
public void setTitle(String title) {
	this.title = title;
}
public String getSku() {
	return sku;
}
public void setSku(String sku) {
	this.sku = sku;
}
public String getUpc() {
	return upc;
}
public void setUpc(String upc) {
	this.upc = upc;
}
public String getShortcode() {
	return shortcode;
}
public void setShortcode(String shortcode) {
	this.shortcode = shortcode;
}
public double getPrice() {
	return price;
}
public void setPrice(double price) {
	this.price = price;
}
public double getCost() {
	return cost;
}
public void setCost(double cost) {
	this.cost = cost;
}
public String getUnit_type() {
	return unit_type;
}
public void setUnit_type(String unit_type) {
	boolean isEmpty = unit_type.trim().isEmpty();
	if(isEmpty) {
		this.unit_type = "each";
	} else {
		this.unit_type = unit_type;	
	}
}
public String getSurcharge_bool() {
	return surcharge_bool;
}
public void setSurcharge_bool(String surcharge_bool) {
	this.surcharge_bool = surcharge_bool;
}
public String getSurcharge_unique() {
	return surcharge_unique;
}
public void setSurcharge_unique(String surcharge_unique) {
	this.surcharge_unique = surcharge_unique;
}
public double getSurcharge() {
	return surcharge;
}
public void setSurcharge(double surcharge) {
	this.surcharge = surcharge;
}
public String getPrompt_price() {
	return prompt_price;
}
public void setPrompt_price(String prompt_price) {
	this.prompt_price = prompt_price;
}
public String getPrompt_quantity() {
	return prompt_quantity;
}
public void setPrompt_quantity(String prompt_quantity) {
	this.prompt_quantity = prompt_quantity;
}
public String getClerk_message() {
	return clerk_message;
}
public void setClerk_message(String clerk_message) {
	this.clerk_message = clerk_message;
}
public String getTrack_stock() {
	return track_stock;
}
public void setTrack_stock(String track_stock) {
	this.track_stock = track_stock;
}
public double getStock_level() {
	return stock_level;
}
public void setStock_level(double stock_level) {
	this.stock_level = stock_level;
}
public String getCategory() {
	return category;
}
public void setCategory(String category) {
	boolean isEmpty = category.trim().isEmpty();
	if(isEmpty) {
		this.category = "misc";
	} else {
		this.category = category;	
	}
}
public String getSubcategory() {
	return subcategory;
}
public void setSubcategory(String subcategory) {
	this.subcategory = subcategory;
}
public String getDepartment() {
	return department;
}
public void setDepartment(String department) {
	this.department = department;
}
public String getBrand() {
	return brand;
}
public void setBrand(String brand) {
	this.brand = brand;
}
public String getOut_of_stock() {
	return out_of_stock;
}
public void setOut_of_stock(String out_of_stock) {
	this.out_of_stock = out_of_stock;
}

  

  
//@Column(columnDefinition = "double default 0.00")
  
//  @Column(columnDefinition = "boolean default false")
//  private boolean complete;
  
}