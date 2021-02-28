package com.greenbooks.administrators;

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
@RequestMapping("/administrator")
public class AdministratorController {

  @Autowired
  AdministratorRepository administratorRepository;

  @GetMapping()
  public List<Administrator> getAdministrators() {
    return administratorRepository.findAll();
  }
  
  @GetMapping("/{administratorid}")
  public Optional<Administrator> getAdministrator(@PathVariable Long administratorid) {
    return administratorRepository.findById(administratorid);
  }
  
@PostMapping()
  public Administrator addAdministrator(@RequestBody Administrator administrator) {
    return administratorRepository.save(administrator);
  }

@CrossOrigin
@DeleteMapping("/{administratorid}")
  public void deleteAdministrator(@PathVariable Long administratorid) {
    administratorRepository.deleteById(administratorid);
  }

@CrossOrigin
@PutMapping("/{administratorid}")
  public Administrator updateProject(@PathVariable Long administratorid, @RequestBody Administrator administrator) {
    Administrator foundAdministrator = administratorRepository.findById(administratorid).orElse(null);
    if (foundAdministrator != null) {
    	
    	foundAdministrator.setUsername(administrator.getUsername());
    	foundAdministrator.setPassword(administrator.getPassword());

    	
      administratorRepository.save(foundAdministrator);
      return foundAdministrator;
    }
    return null;
  }
}