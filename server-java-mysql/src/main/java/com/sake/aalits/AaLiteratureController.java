package com.sake.aalits;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/aaliterature")
public class AaLiteratureController {

  @Autowired
  AaLiteratureRepository aaLiteratureRepository;

  @GetMapping()
  public List<AaLiterature> getAaLiteratures() {
    return aaLiteratureRepository.findAll();
  }
  
  @GetMapping("/{id}")
  public Optional<AaLiterature> getAaLiterature(@PathVariable Long id) {
 return aaLiteratureRepository.findById(id);
 }
 
@PostMapping()
 public AaLiterature addAaLiterature(@RequestBody AaLiterature aaliterature) {
 return aaLiteratureRepository.save(aaliterature);
 }

@CrossOrigin
@DeleteMapping("/{id}")
 public void deleteAaLiterature(@PathVariable Long id) {
 aaLiteratureRepository.deleteById(id);
 }

@CrossOrigin
@PutMapping("/{id}")
 public AaLiterature updateProject(@PathVariable Long id, @RequestBody AaLiterature aaliterature) {
 AaLiterature foundAaLiterature = aaLiteratureRepository.findById(id).orElse(null);
 if (foundAaLiterature != null) {
 
foundAaLiterature.setSortOrder(aaliterature.getSortOrder());
        foundAaLiterature.setTier(aaliterature.getTier());
        foundAaLiterature.setMainDesc(aaliterature.getMainDesc());
        foundAaLiterature.setSecondaryDesc(aaliterature.getSecondaryDesc());
        foundAaLiterature.setSku(aaliterature.getSku());
        foundAaLiterature.setUpc(aaliterature.getUpc());
        foundAaLiterature.setPrice(aaliterature.getPrice());
        foundAaLiterature.setCost(aaliterature.getCost());
        foundAaLiterature.setTags(aaliterature.getTags());
        foundAaLiterature.setStockLevel(aaliterature.getStockLevel());
 
 aaLiteratureRepository.save(foundAaLiterature);
 return foundAaLiterature;
 }
 return null;
 }
}