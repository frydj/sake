package com.sake.aalits;

// import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sake.functions.GridFormat;

@Entity
@Table(name = "aa_literature")
public class AaLiterature {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;
        private Long sortOrder;
        private Long tier;
        private String mainDesc;
        private String secondaryDesc;
        private String sku;
        private Long upc;
        private String price;
        private String cost;
        private String tags;
        private Long stockLevel;

        public  Long  getId() {
                return id;
        }
        public void setId(Long id) {
                this.id = id;
        }
        public  Long  getSortOrder() {
                return sortOrder;
        }
        public void setSortOrder(Long sortOrder) {
                this.sortOrder = sortOrder;
        }
        public  Long  getTier() {
                return tier;
        }
        public void setTier(Long tier) {
                this.tier = tier;
        }
        public  String  getMainDesc() {
                return mainDesc;
        }
        public void setMainDesc(String mainDesc) {
                this.mainDesc = mainDesc;
        }
        public  String  getSecondaryDesc() {
                return secondaryDesc;
        }
        public void setSecondaryDesc(String secondaryDesc) {
                this.secondaryDesc = secondaryDesc;
        }
        public  String  getSku() {
                return sku;
        }
        public void setSku(String sku) {
                this.sku = sku;
        }
        public  Long  getUpc() {
                return upc;
        }
        public void setUpc(Long upc) {
                this.upc = upc;
        }
        public  String  getPrice() {
                return price;
        }
        public void setPrice(String price) {
            	this.price = GridFormat.formatCurrency((price));
        }
        public  String  getCost() {
                return cost;
        }
        public void setCost(String cost) {
              this.cost = GridFormat.formatCurrency((cost));
        }
        public  String  getTags() {
                return tags;
        }
        public void setTags(String tags) {
                this.tags = tags;
        }
        public  Long  getStockLevel() {
                return stockLevel;
        }
        public void setStockLevel(Long stockLevel) {
                this.stockLevel = stockLevel;
        }

}