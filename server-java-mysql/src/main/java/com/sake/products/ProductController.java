package com.sake.products;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
public class ProductController {

  @Autowired
  ProductRepository productRepository;

  @GetMapping()
  public List<Product> getProducts() {
    return productRepository.findAll();
  }

  @GetMapping("/{productid}")
  public Optional<Product> getProduct(@PathVariable Long productid) {
    return productRepository.findById(productid);
  }
  
@PostMapping()
  public Product addProduct(@RequestBody Product product) {
    return productRepository.save(product);
  }

@CrossOrigin
@DeleteMapping("/{productid}")
  public void deleteProduct(@PathVariable Long productid) {
	productRepository.deleteById(productid);
  }

@CrossOrigin
@PutMapping("/{productid}")
  public Product updateProduct(@PathVariable Long productid, @RequestBody Product product) {
    Product foundProduct = productRepository.findById(productid).orElse(null);
    if (foundProduct != null) {

    	foundProduct.setTitle(product.getTitle());
    	foundProduct.setSku(product.getSku());
    	foundProduct.setUpc(product.getUpc());
    	foundProduct.setShortcode(product.getShortcode());
    	foundProduct.setPrice(product.getPrice());
    	foundProduct.setCost(product.getCost());
    	foundProduct.setUnit_type(product.getUnit_type());
    	foundProduct.setSurcharge_bool(product.getSurcharge_bool());
    	foundProduct.setSurcharge_unique(product.getSurcharge_unique());
    	foundProduct.setSurcharge(product.getSurcharge());
    	foundProduct.setPrompt_price(product.getPrompt_price());
    	foundProduct.setPrompt_quantity(product.getPrompt_quantity());
    	foundProduct.setClerk_message(product.getClerk_message());
    	foundProduct.setTrack_stock(product.getTrack_stock());
    	foundProduct.setStock_level(product.getStock_level());
    	foundProduct.setCategory(product.getCategory());
    	foundProduct.setSubcategory(product.getSubcategory());
    	foundProduct.setDepartment(product.getDepartment());
    	foundProduct.setBrand(product.getBrand());
    	foundProduct.setOut_of_stock(product.getOut_of_stock());
    	foundProduct.setVendor_sku(product.getVendor_sku());
    	
    	productRepository.save(foundProduct);
      return foundProduct;
    }
    return null;
  }

}