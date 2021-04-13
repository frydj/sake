package com.sake.params;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "params")
public class Param {

	Long session_id;
	String user;
	String password;
	String logged_in;
	String customerSearchInput;
	String productSearchInput;
	String productsGridFilter;
	String productsGridSort;
	String customersGridFilter;
	String customersGridSort;
	String reportDateFrom;
	String reportDateTo;
	String posView;
	String typeAheadInput;
	String typeAheadSelect;
	String typeAheadTable;
	String typeAheadArgs;
	String typeAheadOrder;
		
	public String getTypeAheadOrder() {
		return typeAheadOrder;
	}
	public void setTypeAheadOrder(String typeAheadOrder) {
		this.typeAheadOrder = typeAheadOrder;
	}
	public String getTypeAheadArgs() {
		return typeAheadArgs;
	}
	public void setTypeAheadArgs(String typeAheadArgs) {
		this.typeAheadArgs = typeAheadArgs;
	}
	public String getTypeAheadSelect() {
		return typeAheadSelect;
	}
	public void setTypeAheadSelect(String typeAheadSelect) {
		this.typeAheadSelect = typeAheadSelect;
	}
	public String getTypeAheadInput() {
		return typeAheadInput;
	}
	public void setTypeAheadInput(String typeAheadInput) {
		this.typeAheadInput = typeAheadInput;
	}
	public String getTypeAheadTable() {
		return typeAheadTable;
	}
	public void setTypeAheadTable(String typeAheadTable) {
		this.typeAheadTable = typeAheadTable;
	}
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long getSession_id() {
		return session_id;
	}
	public void setSession_id(Long session_id) {
		this.session_id = session_id;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getCustomerSearchInput() {
		return customerSearchInput;
	}
	public void setCustomerSearchInput(String customerSearchInput) {
		this.customerSearchInput = customerSearchInput;
	}
	public String getProductsGridFilter() {
		return productsGridFilter;
	}
	public void setProductsGridFilter(String productsGridFilter) {
		this.productsGridFilter = productsGridFilter;
	}
	public String getProductsGridSort() {
		return productsGridSort;
	}
	public void setProductsGridSort(String productsGridSort) {
		this.productsGridSort = productsGridSort;
	}
	public String getReportDateFrom() {
		return reportDateFrom;
	}
	public void setReportDateFrom(String reportDateFrom) {
		this.reportDateFrom = reportDateFrom;
	}
	public String getReportDateTo() {
		return reportDateTo;
	}
	public void setReportDateTo(String reportDateTo) {
		this.reportDateTo = reportDateTo;
	}
	public String getLogged_in() {
		return logged_in;
	}
	public void setLogged_in(String logged_in) {
		this.logged_in = logged_in;
	}
	public String getProductSearchInput() {
		return productSearchInput;
	}
	public void setProductSearchInput(String productSearchInput) {
		this.productSearchInput = productSearchInput;
	}
	public String getPosView() {
		return posView;
	}
	public void setPosView(String posView) {
		this.posView = posView;
	}

	public String getCustomersGridFilter() {
		return customersGridFilter;
	}
	public void setCustomersGridFilter(String customersGridFilter) {
		if(customersGridFilter == null) {
			this.customersGridFilter = " ";
		} else {
			this.customersGridFilter = customersGridFilter;
		}	
	}
	public String getCustomersGridSort() {
		return customersGridSort;
	}
	public void setCustomersGridSort(String customersGridSort) {
		if(customersGridSort == null) {
			this.customersGridSort = " ORDER BY custID DESC ";
		} else {
			this.customersGridSort = customersGridSort;
		}	
	}
	
}
