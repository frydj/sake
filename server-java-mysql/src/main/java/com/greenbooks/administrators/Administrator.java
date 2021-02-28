package com.greenbooks.administrators;

// import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "administrator")
public class Administrator {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long admin_id;
  private String username;
  private String email;
  private String password;
public Long getAdmin_id() {
	return admin_id;
}
public void setAdmin_id(Long admin_id) {
	this.admin_id = admin_id;
}
public String getUsername() {
	return username;
}
public void setUsername(String username) {
	this.username = username;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
   
}