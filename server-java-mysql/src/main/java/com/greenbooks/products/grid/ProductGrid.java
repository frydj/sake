package com.greenbooks.products.grid;

// import javax.persistence.Column;
import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.greenbooks.functions.GridFormat;

@Entity
@Table(name = "vproduct")
public class ProductGrid {

	@Id
	private long product_id;
	private String title;
	private String sku;
	private String price;
	private String unit_type;
	private String surcharge;
	private String cost;
	private String category;
	private String subcategory;
	private String stock;
	
	// Product ID
	public long getProduct_id() {
		return product_id;
	}
	public void setProduct_id(long product_id) {
		this.product_id = product_id;
	}
	
	// Title
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	// SKU
	public String getSku() {
		return sku;
	}
	public void setSku(String sku) {
		this.sku = sku;
	}
	
	// Price
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = GridFormat.formatCurrency((price));
	}
	
	// Unit Type
	public String getUnit_type() {
		return unit_type;
	}
	public void setUnit_type(String unit_type) {
		this.unit_type = unit_type;
	}
	
	// Surcharge
	public String getSurcharge() {
		return surcharge;
	}
	public void setSurcharge(String surcharge) {
		this.surcharge = GridFormat.formatCurrency(surcharge);
	}
	
	// Cost
	public String getCost() {
		return cost;
	}
	public void setCost(double cost) {
		this.cost = GridFormat.formatCurrency(Double.toString(cost));
	}
	
	// Category
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	
	// Subcategory
	public String getSubcategory() {
		return subcategory;
	}
	public void setSubcategory(String subcategory) {
		this.subcategory = subcategory;
	}
	
	// Stock
	public String getStock() {
		return stock;
	}
	public void setStock(String stock) {
		this.stock = stock;
	}
	
}